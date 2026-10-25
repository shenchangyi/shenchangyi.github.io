import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const host=document.querySelector('#scene'),status=document.querySelector('#loading');
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});}catch{status.innerHTML='此设备暂不支持模型渲染。<a href="preview.html">返回手绘地图</a>';}
if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor('#e9e2cd');host.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','水墨地物模型，拖动平移，双指缩放');renderer.domElement.tabIndex=0;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.02,200),controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=false;controls.enableRotate=false;controls.enablePan=true;controls.screenSpacePanning=false;controls.minDistance=1.5;controls.maxDistance=70;controls.maxPolarAngle=Math.PI*.4;
 controls.mouseButtons.LEFT=THREE.MOUSE.PAN;controls.mouseButtons.RIGHT=THREE.MOUSE.ROTATE;controls.touches.ONE=THREE.TOUCH.PAN;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
 let ready=false,textureReady=false,textureError=false,modelError=false,linework=false,tilted=false,frame=0,base,inkLines;
 function loadingStatus(){status.textContent=modelError?'模型加载失败，请刷新重试或返回画卷。':textureError?'画卷纹理未载入，可切换轮廓继续查看。':ready&&textureReady?'':'正在展开山水…';}
 function inkMaterial(color){
  const material=new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide});
  // Decorative paper grain, not additional geographic information.
  material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float paperGrain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
   diffuseColor.rgb *= 0.97 + 0.06 * paperGrain;
  `);};
  return material;
 }
 const spots={temple:{name:'寺前水岸',x:.506,y:.579},market:{name:'青原里',x:.438,y:.544},lake:{name:'东侧水库',x:.65,y:.68}};
 const labels=Object.values(spots).map(p=>{const el=document.createElement('span');el.className='map-label';el.innerHTML=p.name;document.querySelector('#labels').append(el);return{el,point:new THREE.Vector3((p.x-.5)*38.4,.08,(p.y-.5)*20.48)};});
 function render(){frame=0;if(document.hidden)return;const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  const dist=camera.position.distanceTo(controls.target);document.querySelector('#zoom-in').disabled=dist<=controls.minDistance*1.01;document.querySelector('#zoom-out').disabled=dist>=controls.maxDistance*.99;
  if(base)base.visible=!linework;
  if(inkLines){inkLines.material.transparent=!linework;inkLines.material.opacity=linework?1:.18;}
  document.querySelector('#detail').textContent=linework?'轮廓模型 · 几何轮廓可放大 · 无实测高程':dist<7?'近览 · 轮廓为几何；原画纹理已到细节上限':'双指缩放 · 单指平移 · 先看已知地物';
  for(const{el,point}of labels){const p=point.clone().project(camera);el.hidden=p.z>1||p.x<-1||p.x>1||p.y<-1||p.y>1;el.style.left=(p.x*.5+.5)*w+'px';el.style.top=(-p.y*.5+.5)*h+'px';}
  renderer.render(scene,camera);host.dataset.ready=String(ready);host.dataset.distance=dist.toFixed(3);host.dataset.triangles=renderer.info.render.triangles;
 }
 function request(){if(!frame)frame=requestAnimationFrame(render);}
 function setView(distance=25,target=new THREE.Vector3(0,0,0)){controls.target.copy(target);camera.position.copy(target).add(new THREE.Vector3(0,distance*(tilted?.83:1),distance*(tilted?.56:.001)));controls.update();request();}
 function zoom(factor){const v=camera.position.clone().sub(controls.target);v.setLength(THREE.MathUtils.clamp(v.length()*factor,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(v);controls.update();request();}
 controls.addEventListener('change',()=>{controls.target.x=THREE.MathUtils.clamp(controls.target.x,-19.2,19.2);controls.target.z=THREE.MathUtils.clamp(controls.target.z,-10.24,10.24);request();});
 document.querySelector('#zoom-in').onclick=()=>zoom(.7);document.querySelector('#zoom-out').onclick=()=>zoom(1/.7);document.querySelector('#reset').onclick=()=>setView(52);
 for(const id of ['top','tilt'])document.getElementById(id).onclick=()=>{tilted=id==='tilt';document.querySelector('#top').setAttribute('aria-pressed',String(!tilted));document.querySelector('#tilt').setAttribute('aria-pressed',String(tilted));setView(camera.position.distanceTo(controls.target),controls.target.clone());};
 for(const id of ['texture','linework'])document.getElementById(id).onclick=()=>{linework=id==='linework';document.querySelector('#texture').setAttribute('aria-pressed',String(!linework));document.querySelector('#linework').setAttribute('aria-pressed',String(linework));request();};
 for(const b of document.querySelectorAll('[data-focus]'))b.onclick=()=>{const p=spots[b.dataset.focus];setView(6,new THREE.Vector3((p.x-.5)*38.4,0,(p.y-.5)*20.48));};
 document.querySelector('#help').onclick=()=>document.querySelector('#info').showModal();document.querySelector('#close-info').onclick=()=>document.querySelector('#info').close();
 new ResizeObserver(request).observe(host);document.addEventListener('visibilitychange',request);
 renderer.domElement.addEventListener('keydown',e=>{if(['+','='].includes(e.key))zoom(.7);if(e.key==='-')zoom(1/.7);});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();status.textContent='图形显示暂时中断，请刷新页面或返回手绘地图。';});
 const texture=new THREE.TextureLoader().load('assets/atlas/ink-native.webp',()=>{textureReady=true;loadingStatus();request();},undefined,()=>{textureError=true;loadingStatus();});texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 base=new THREE.Mesh(new THREE.PlaneGeometry(38.4,20.48),new THREE.MeshBasicMaterial({map:texture,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1}));base.rotation.x=-Math.PI/2;base.position.y=-.012;scene.add(base);
 new GLTFLoader().load('assets/model/qingyuan-foundation.glb',g=>{g.scene.traverse(o=>{if(o.isMesh){const c=o.material.color.clone();o.material.dispose();o.material=inkMaterial(c);if(o.name==='original-ink-contours')inkLines=o;}});scene.add(g.scene);ready=true;loadingStatus();request();},undefined,()=>{modelError=true;loadingStatus();});
 setView(24,new THREE.Vector3(0,0,0));request();
}
