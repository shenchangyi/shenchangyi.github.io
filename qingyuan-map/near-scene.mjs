import * as THREE from './vendor/three/three.module.js';
import {OrbitControls} from './vendor/three/addons/controls/OrbitControls.js';
import {buildScene,point3,ribbon,bdToPlan} from './scene-geometry.mjs';
const host=document.querySelector('#scene'),status=document.querySelector('#loading'),$=s=>document.querySelector(s);
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});}catch{status.innerHTML='此设备暂不支持立体渲染。<a href="preview.html">返回手绘地图</a>';}
if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor('#e9e2cd');host.prepend(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','立体山水场景，单指平移，双指缩放；选择转动可环绕观察');
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.01,150),controls=new OrbitControls(camera,renderer.domElement);
 controls.enableDamping=true;controls.dampingFactor=.12;controls.minDistance=.48;controls.maxDistance=60;controls.maxPolarAngle=Math.PI*.45;controls.minPolarAngle=.001;controls.screenSpacePanning=false;
 controls.mouseButtons.LEFT=THREE.MOUSE.PAN;controls.touches.ONE=THREE.TOUCH.PAN;controls.touches.TWO=THREE.TOUCH.DOLLY_ROTATE;
 scene.add(new THREE.HemisphereLight(0xffffff,0x9ca694,1.7));const sun=new THREE.DirectionalLight(0xffffff,1.35);sun.position.set(-4,8,3);scene.add(sun);
 let model,tilted=true,satellite=false,route=null,routeData=[],time=0,frame=0,active=true;const clock=new THREE.Clock();
 const spots={plaza:{name:'圆形广场',p:[1009,524]},temple:{name:'净居寺屋群',p:[1048,595]},market:{name:'青原里',p:[895.28,594.97]},lake:{name:'东侧水库',p:[1343,713]}};
 const labels=Object.entries(spots).map(([id,p])=>{const el=document.createElement('button');el.textContent=p.name;el.className='map-label';el.setAttribute('aria-label','近看'+p.name);el.onclick=()=>focus(id);$('#labels').append(el);return {el,p:point3(p.p,.15)};});
 const satellitePlane=new THREE.Mesh(new THREE.PlaneGeometry(38.4,20.48),new THREE.MeshBasicMaterial({color:0xffffff}));satellitePlane.rotation.x=-Math.PI/2;satellitePlane.position.y=.003;satellitePlane.visible=false;scene.add(satellitePlane);let satTexture;
 function showSatellite(on){satellite=on;$('#satellite').setAttribute('aria-pressed',String(on));$('#satellite').textContent=on?'回到立体':'卫星对照';satellitePlane.visible=on;if(model)model.root.visible=!on;$('#labels').hidden=on;if(on&&!satTexture){satTexture=new THREE.TextureLoader().load('assets/atlas/satellite.jpg',()=>{satTexture.colorSpace=THREE.SRGBColorSpace;satellitePlane.material.map=satTexture;satellitePlane.material.needsUpdate=true;},undefined,()=>{status.textContent='卫星影像载入失败，可返回立体场景。';});}if(on)setView(camera.position.distanceTo(controls.target),controls.target.clone(),false);}
 function setView(d=6,p=point3([1016,558]),tilt=tilted){tilted=tilt;controls.target.copy(p);camera.position.copy(p).add(new THREE.Vector3(0,d*(tilt?.76:1),d*(tilt?.65:.001)));controls.update();$('#top').setAttribute('aria-pressed',String(!tilted));$('#tilt').setAttribute('aria-pressed',String(tilted));}
 function focus(id){if(satellite)showSatellite(false);setView(id==='lake'?3.6:1.9,point3(spots[id].p),true);}
 function zoom(f){const delta=camera.position.clone().sub(controls.target);delta.setLength(THREE.MathUtils.clamp(delta.length()*f,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(delta);controls.update();}
 $('#zoom-in').onclick=()=>zoom(.72);$('#zoom-out').onclick=()=>zoom(1/.72);$('#reset').onclick=()=>setView(30,point3([1100,520]));
 $('#top').onclick=()=>setView(camera.position.distanceTo(controls.target),controls.target.clone(),false);$('#tilt').onclick=()=>{if(satellite)showSatellite(false);setView(camera.position.distanceTo(controls.target),controls.target.clone(),true);};
 $('#satellite').onclick=()=>showSatellite(!satellite);$('#rotate').onclick=()=>{const rotate=controls.touches.ONE===THREE.TOUCH.PAN;controls.touches.ONE=rotate?THREE.TOUCH.ROTATE:THREE.TOUCH.PAN;controls.mouseButtons.LEFT=rotate?THREE.MOUSE.ROTATE:THREE.MOUSE.PAN;$('#rotate').setAttribute('aria-pressed',String(rotate));$('#rotate').textContent=rotate?'单指转动':'单指平移';};
 for(const b of document.querySelectorAll('[data-focus]'))b.onclick=()=>focus(b.dataset.focus);
 $('#help').onclick=()=>$('#info').showModal();$('#close-info').onclick=()=>$('#info').close();
 function showRoute(id){if(route){scene.remove(route);route.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});}route=new THREE.Group();const r=routeData.find(r=>r.id===id);if(r){for(const s of r.steps){const p=s.path.map(bdToPlan);const halo=new THREE.MeshBasicMaterial({color:0xfff8e9,depthTest:false}),red=new THREE.MeshBasicMaterial({color:0xa34f38,depthTest:false});const a=ribbon(p,.047,halo,.04),b=ribbon(p,.025,red,.045);a.renderOrder=20;b.renderOrder=21;route.add(a,b);}}scene.add(route);host.dataset.route=id;}
 $('#route-choice').onchange=e=>showRoute(e.target.value);
 Promise.all([fetch('data/scene-plan.json').then(r=>{if(!r.ok)throw Error();return r.json();}),fetch('data/walking-reference.json').then(r=>{if(!r.ok)throw Error();return r.json();})]).then(([plan,refs])=>{model=buildScene(plan);scene.add(model.root);model.root.visible=!satellite;host.dataset.ready='true';host.dataset.objects=JSON.stringify(model.stats);routeData=refs.routes;for(const r of routeData){const o=document.createElement('option');o.value=r.id;o.textContent=r.name;$('#route-choice').append(o);}const params=new URLSearchParams(location.search);const id=params.get('route')||'entrance-academy';if(routeData.some(r=>r.id===id)){$('#route-choice').value=id;showRoute(id);}status.textContent='';}).catch(()=>{status.innerHTML='场景资料未完整载入。<a href="near.html">重新加载</a> 或 <a href="preview.html">返回画卷</a>';});
 const params=new URLSearchParams(location.search);const px=Number(params.get('x')),py=Number(params.get('y'));setView(5.7,params.has('x')&&px>=0&&px<=2048&&py>=0&&py<=1093?point3([px,py]):point3([1014,554]));
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(host);
 function draw(){frame=0;if(!active)return;const dt=Math.min(clock.getDelta(),.05);time+=dt;controls.update();
  const dist=camera.position.distanceTo(controls.target);if(model){model.setDetail(dist<14);model.animate(matchMedia('(prefers-reduced-motion: reduce)').matches?0:time);}
  const w=host.clientWidth,h=host.clientHeight;for(const {el,p}of labels){const v=p.clone().project(camera);el.hidden=v.z>1||v.x<-1||v.x>1||v.y<-1||v.y>1;el.style.left=(v.x*.5+.5)*w+'px';el.style.top=(-v.y*.5+.5)*h+'px';}
  renderer.render(scene,camera);host.dataset.triangles=renderer.info.render.triangles;host.dataset.drawCalls=renderer.info.render.calls;host.dataset.distance=dist.toFixed(3);$('#detail').textContent=satellite?'卫星影像对照 · 同一平面坐标':dist<2.5?'近看屋檐、树冠与地砖 · 几何细节':'单指平移 · 双指缩放 · 可切换俯看 / 斜看';
  $('#zoom-in').disabled=dist<=controls.minDistance*1.01;$('#zoom-out').disabled=dist>=controls.maxDistance*.99;frame=requestAnimationFrame(draw);
 }document.addEventListener('visibilitychange',()=>{active=!document.hidden;if(active&&!frame)draw();});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();active=false;status.innerHTML='图形显示中断，请<a href="near.html">重新加载</a>。';});renderer.domElement.addEventListener('keydown',e=>{if(e.key==='+')zoom(.72);if(e.key==='-')zoom(1/.72);});
 resize();draw();
}
