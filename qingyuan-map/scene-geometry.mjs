import * as THREE from './vendor/three/three.module.js';

// One shared image-to-world transform: x east, z south, y illustrative height.
export const PLAN_SCALE=.01875;
export function point3(p,y=0){return new THREE.Vector3((p[0]-1024)*PLAN_SCALE,y,(p[1]-2048*2048/3840/2)*PLAN_SCALE);}
export function bdToPlan(c){return [(c[0]-115.0244992)/(115.093489-115.0244992)*2048,(27.0811433-c[1])/(27.0811433-27.0482008)*(2048*2048/3840)];}
const C={paper:0xe9e2cd,ground:0xd5d4b7,forest:0xb3bb97,ink:0x405747,road:0xe9dec3,stone:0xc5c2a6,water:0x82a69a,roof:0x697b70,wall:0xe6ddc3,wood:0x776b4c,red:0xa34f38};
function ink(color,{pattern=0,flat=true}={}){
 const material=new THREE.MeshLambertMaterial({color,flatShading:flat});
 // Analytical paper/roof strokes stay detailed at close range: no enlarged bitmap.
 material.onBeforeCompile=s=>{
  s.vertexShader='varying vec3 vInkLocal;\n'+s.vertexShader;
  s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvInkLocal = position;');
  s.fragmentShader='varying vec3 vInkLocal;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float grain = fract(sin(dot(floor(vInkLocal.xz*900.0),vec2(12.9898,78.233)))*43758.5453);
   diffuseColor.rgb *= 0.965+0.07*grain;
   ${pattern===1?'float tile = abs(sin(vInkLocal.x*550.0)); float line = 1.0-smoothstep(.04,.16,tile); diffuseColor.rgb *= 1.0-.14*line;':''}
  `);
 };material.customProgramCacheKey=()=>`ink-${pattern}`;return material;
}
function shape(points){const s=new THREE.Shape();points.forEach((p,i)=>{const q=point3(p);i?s.lineTo(q.x,-q.z):s.moveTo(q.x,-q.z);});s.closePath();return s;}
function surface(points,material,height=0,depth=0){
 const geometry=depth?new THREE.ExtrudeGeometry(shape(points),{depth,bevelEnabled:false,steps:1}):new THREE.ShapeGeometry(shape(points));
 geometry.rotateX(-Math.PI/2);const mesh=new THREE.Mesh(geometry,material);mesh.position.y=height;mesh.receiveShadow=true;return mesh;
}
export function ribbon(points,width,material,height=.012){
 const verts=[],idx=[];const pts=points.map(p=>point3(p,height));
 for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],d=b.clone().sub(a).normalize(),n=new THREE.Vector3(-d.z,0,d.x).multiplyScalar(width*.5);for(const sign of [-1,1]){const p=pts[i].clone().addScaledVector(n,sign);verts.push(p.x,p.y,p.z);}if(i){const j=i*2;idx.push(j-2,j,j-1,j,j+1,j-1);}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setIndex(idx);geo.computeVertexNormals();const m=new THREE.Mesh(geo,material);m.material.side=THREE.DoubleSide;m.receiveShadow=true;return m;
}
function outlined(mesh,group,color=C.ink){group.add(mesh);const lines=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,27),new THREE.LineBasicMaterial({color,transparent:true,opacity:.53}));lines.position.copy(mesh.position);lines.rotation.copy(mesh.rotation);group.add(lines);return mesh;}
function box(w,h,d,mat,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;return m;}
function roofGeometry(w,d,rise){
 // Continuous curved roof slopes with raised corners, all real vertices.
 const vertices=[],faces=[];
 for(const side of [-1,1]){const start=vertices.length/3;for(let v=0;v<=5;v++)for(let u=0;u<=12;u++){
  const t=v/5,s=u/12*2-1,x=s*w*(.5-.18*t),z=side*d*.5*(1-t);
  const y=rise*Math.pow(t,1.55)+rise*.14*Math.pow(Math.abs(s),6)*Math.pow(1-t,3)+rise*.09*Math.pow(1-t,8);
  vertices.push(x,y,z);
 }for(let v=0;v<5;v++)for(let u=0;u<12;u++){const a=start+v*13+u;if(side===1)faces.push(a,a+1,a+13,a+1,a+14,a+13);else faces.push(a,a+13,a+1,a+1,a+13,a+14);}}
 for(const side of [-1,1]){const start=vertices.length/3;for(let v=0;v<=5;v++){const t=v/5,y=rise*Math.pow(t,1.55)+rise*.14*Math.pow(1-t,3)+rise*.09*Math.pow(1-t,8);vertices.push(side*w*(.5-.18*t),y,-d*.5*(1-t),side*w*(.5-.18*t),y,d*.5*(1-t));}for(let v=0;v<5;v++){const a=start+v*2;if(side===-1)faces.push(a,a+1,a+2,a+1,a+3,a+2);else faces.push(a,a+2,a+1,a+1,a+2,a+3);}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(faces);g.computeVertexNormals();return g;
}
export function buildScene(plan){
 const root=new THREE.Group(),details=new THREE.Group(),woods=new THREE.Group(),waterMaterials=[];
 root.name='Qingyuan image-aligned 3D illustration';root.add(details,woods);
 const mats={};for(const[k,v]of Object.entries(C))mats[k]=ink(v);mats.roof=ink(C.roof,{pattern:1});
 const ground=box(38.4,.045,20.48,mats.paper,0,-.027,0);ground.name='reference-plane-no-DEM';root.add(ground);
 for(const p of plan.forests)root.add(surface(p,mats.forest,.001));
 for(const p of plan.fields){root.add(surface(p,ink(0xa6b18d),.004));root.add(ribbon([...p,p[0]],.017,mats.road,.009));}
 for(const [i,p]of plan.waters.entries()){
  const bank=surface(p,mats.stone,.003,.01);bank.name=`water-bank-${i}`;root.add(bank);
  const water=ink(C.water,{flat:false});water.onBeforeCompile=s=>{
   s.uniforms.inkTime={value:0};water.userData.shader=s;s.vertexShader='varying vec3 vWater;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWater=position;');
   s.fragmentShader='varying vec3 vWater; uniform float inkTime;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
    float wave=sin(vWater.x*62.0+vWater.z*11.0+sin(vWater.z*22.0)+inkTime*.5);
    float ripple=smoothstep(.93,.999,wave);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.68,.77,.67),ripple*.18);`);
  };waterMaterials.push(water);const m=surface(p,water,.016);m.name=`water-surface-${i}`;root.add(m);root.add(ribbon([...p,p[0]],.018,mats.ink,.018));
 }
 for(const r of plan.roads){const w=r.width*PLAN_SCALE;const edges=ribbon(r.points,w+.022,mats.ink,.018);edges.name=r.id;root.add(edges,ribbon(r.points,w,mats.road,.020));}
 // Geometry for paving: radial rings with separate stone slabs and physical gaps.
 const pc=point3(plan.plaza.center);const pr=plan.plaza.radius*PLAN_SCALE;
 const plaza=new THREE.Mesh(new THREE.CylinderGeometry(pr,pr,.025,64),mats.road);plaza.position.copy(pc).y=.022;root.add(plaza);
 const stones=[];
 for(let ring=1;ring<=12;ring++){const radius=pr*(ring-.5)/12,n=Math.max(10,Math.floor(ring*9));for(let i=0;i<n;i++){const a=(i+(ring%2)*.5)*Math.PI*2/n;stones.push({p:[pc.x+Math.cos(a)*radius,.036,pc.z+Math.sin(a)*radius],s:[Math.PI*2*radius/n*.93,.002,pr/12*.92],a:-a-Math.PI/2});}}
 const pavers=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),mats.stone,stones.length),dummy=new THREE.Object3D();
 stones.forEach((s,i)=>{dummy.position.set(...s.p);dummy.scale.set(...s.s);dummy.rotation.set(0,s.a,0);dummy.updateMatrix();pavers.setMatrixAt(i,dummy.matrix);pavers.setColorAt(i,new THREE.Color(i%4===0?0xded6bd:0xc9c7ad));});pavers.instanceMatrix.needsUpdate=true;pavers.castShadow=false;pavers.name='individual-plaza-pavers';details.add(pavers);
 for(const b of plan.buildings){
  const group=new THREE.Group();group.name=b.id;group.userData={...b,category:'building',heightStatus:'illustrative'};group.position.copy(point3(b.center));group.rotation.y=-b.angle*Math.PI/180;
  const [w,d]=b.size.map(v=>v*PLAN_SCALE),h=b.height*PLAN_SCALE*.9;
  outlined(box(w+.025,.027,d+.025,mats.stone,0,.028,0),group);
  outlined(box(w,h,d,mats.wall,0,h/2+.045,0),group);
  if(b.kind!=='flat'){
   const roof=new THREE.Mesh(roofGeometry(w*1.17,d*1.23,h*.43),b.kind==='temple'?ink(0xb09a62,{pattern:1}):mats.roof);roof.position.y=h+.063;roof.name='curved-roof';roof.castShadow=true;outlined(roof,group);
   group.add(box(w*.66,.014,.013,mats.ink,0,h*1.43+.063,0));
   // Eave rafters remain separate geometry, visible in close views.
   const rafters=new THREE.Group();for(let i=-4;i<=4;i++){rafters.add(box(w*.018,.012,d*1.22,mats.wood,i*w/9,h+.031,0));}group.add(rafters);
  }else group.add(box(w*1.02,.022,d*1.02,mats.roof,0,h+.05,0));
  const cols=Math.max(2,Math.min(6,Math.floor(w/.07)));
  for(let i=0;i<cols;i++){const x=-w*.38+w*.76*i/(cols-1);group.add(box(.012,h*.58,.008,mats.wood,x,h*.49+.05,d/2+.006));}
  // A few entrance steps. Count and facade style are not surveyed architecture.
  for(let i=0;i<3;i++)group.add(box(w*.34,.012,d*.16,mats.stone,0,.012*(3-i),d*.56+i*.018));
  root.add(group);
 }
 // Instanced trees: branched trunks + clustered crowns, not painted billboards.
 const count=plan.trees.length,crownGeo=new THREE.IcosahedronGeometry(1,1),crownLow=new THREE.IcosahedronGeometry(1,0),crownMeshes=[];
 const trunkGeo=new THREE.CylinderGeometry(.055,.10,1,5),branchGeo=new THREE.CylinderGeometry(.025,.04,1,4),pineGeo=new THREE.ConeGeometry(1,1.4,7,1);
 const leafMats=[ink(0x899b76),ink(0xa4ae87),ink(0x70876e)],pineMat=ink(0x607b66),bins=new Map(),outlineMat=new THREE.MeshBasicMaterial({color:0x4b6050,side:THREE.BackSide});
 for(const t of plan.trees){const key=`${Math.floor(t[0]/110)}-${Math.floor(t[1]/110)}`;if(!bins.has(key))bins.set(key,[]);bins.get(key).push(t);}
 for(const [key,trees]of bins){
 const trunk=new THREE.InstancedMesh(trunkGeo,mats.wood,trees.length),canopies=[];trunk.name=`tree-trunks-${key}`;woods.add(trunk);
 for(let j=0;j<3;j++){const crown=new THREE.InstancedMesh(crownGeo,leafMats[j],trees.length);crown.name=`tree-crown-${j}-${key}`;canopies.push(crown);crownMeshes.push(crown);woods.add(crown);}
 const pine=new THREE.InstancedMesh(pineGeo,pineMat,trees.filter(t=>t[4]===0).length);pine.name=`pine-crowns-${key}`;woods.add(pine);let pi=0;
 const branches=new THREE.InstancedMesh(branchGeo,mats.wood,trees.length);branches.name=`tree-branches-${key}`;details.add(branches);
 trees.forEach((t,i)=>{
  const p=point3(t),h=t[2]*PLAN_SCALE,r=t[3]*PLAN_SCALE;
  dummy.position.set(p.x,h*.38,p.z);dummy.scale.set(h,h*.75,h);dummy.rotation.set(0,t[5]*6,0);dummy.updateMatrix();trunk.setMatrixAt(i,dummy.matrix);
  for(let j=0;j<3;j++){dummy.position.set(p.x+Math.sin(j*2.1+t[5]*6)*r*.42,h*(.58+j*.14),p.z+Math.cos(j*2.1+t[5]*6)*r*.42);dummy.scale.set(r*(1-j*.16),r*.72,r*(.91-j*.14));dummy.rotation.set(t[5],j,0);dummy.updateMatrix();canopies[j].setMatrixAt(i,dummy.matrix);canopies[j].setColorAt(i,new THREE.Color().setHSL(.19+t[5]*.05,.13+t[5]*.10,.48+t[5]*.16));}
  dummy.position.set(p.x+r*.2,h*.55,p.z);dummy.scale.set(h,h*.42,h);dummy.rotation.set(0,0,-.55);dummy.updateMatrix();branches.setMatrixAt(i,dummy.matrix);
  if(t[4]===0){dummy.position.set(p.x,h*.93,p.z);dummy.scale.set(r*.75,h*.53,r*.75);dummy.rotation.set(0,t[5]*6,0);dummy.updateMatrix();pine.setMatrixAt(pi++,dummy.matrix);}
 });
 for(const m of [trunk,...canopies,pine,branches]){m.instanceMatrix.needsUpdate=true;m.castShadow=true;m.receiveShadow=true;m.computeBoundingSphere();}
 // Fine ink silhouettes, enabled only at close zoom.
 for(const crown of canopies){const outline=new THREE.InstancedMesh(crownGeo,outlineMat,trees.length);const matrix=new THREE.Matrix4(),pos=new THREE.Vector3(),rot=new THREE.Quaternion(),scale=new THREE.Vector3();for(let i=0;i<trees.length;i++){crown.getMatrixAt(i,matrix);matrix.decompose(pos,rot,scale);scale.multiplyScalar(1.018);matrix.compose(pos,rot,scale);outline.setMatrixAt(i,matrix);}outline.instanceMatrix.needsUpdate=true;outline.computeBoundingSphere();details.add(outline);}
 }
 const birdGroup=new THREE.Group();root.add(birdGroup);const birds=[];
 const whiteBird=new THREE.MeshBasicMaterial({color:0xfaf5e7,side:THREE.DoubleSide}),blackBird=new THREE.MeshBasicMaterial({color:0x344338,side:THREE.DoubleSide});
 for(let i=0;i<5;i++){
  const b=new THREE.Group(),body=new THREE.Mesh(new THREE.SphereGeometry(.01,7,5),whiteBird);body.scale.set(.8,.65,2.1);b.add(body);const wings=[];
  for(const side of [-1,1]){const wing=new THREE.Group();const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,-.008,side*.025,.006,-.012,side*.066,.002,.004,side*.079,0,.024,side*.046,-.002,.017,side*.015,0,.012],3));geo.setIndex([0,1,5,1,2,5,2,4,5,2,3,4]);geo.computeVertexNormals();wing.add(new THREE.Mesh(geo,whiteBird));const tip=new THREE.BufferGeometry();tip.setAttribute('position',new THREE.Float32BufferAttribute([side*.058,.003,.002,side*.079,.001,.024,side*.046,-.001,.017],3));tip.computeVertexNormals();wing.add(new THREE.Mesh(tip,blackBird));b.add(wing);wings.push(wing);}
  const neck=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,-.012),new THREE.Vector3(0,.006,-.038),new THREE.Vector3(0,.006,-.058)]),5,.003,4,false),whiteBird);b.add(neck);const head=new THREE.Mesh(new THREE.SphereGeometry(.005,6,4),whiteBird);head.position.set(0,.006,-.059);b.add(head);b.add(box(.002,.002,.015,mats.red,0,.006,-.07));for(const side of [-1,1])b.add(box(.001,.001,.033,blackBird,side*.004,-.002,.033));birdGroup.add(b);birds.push({b,wings,seed:i*1.8});
 }
 root.userData.stats={buildings:plan.buildings.length,trees:count,waters:plan.waters.length,roads:plan.roads.length,pavers:stones.length};
 return {root,details,birdGroup,stats:root.userData.stats,setDetail(high){details.visible=high;for(const m of crownMeshes)m.geometry=high?crownGeo:crownLow;},animate(t){for(const m of waterMaterials)if(m.userData.shader)m.userData.shader.uniforms.inkTime.value=t;birds.forEach(({b,wings,seed})=>{b.position.set(Math.sin(t*.045+seed)*2,.48+Math.sin(seed)*.06,Math.cos(t*.045+seed)*1.6);b.rotation.y=t*.045+seed;wings.forEach((w,j)=>w.rotation.z=(j?1:-1)*Math.sin(t*5+seed)*.55);});}};
}
