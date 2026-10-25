import * as THREE from './vendor/three/three.module.js';
import {buildScene} from './scene-geometry.mjs';
// Top-down detail uses exactly the same plan transform as the 2D atlas.
export class SceneRenderer{
 constructor(host,{changed=()=>{}}={}){
  this.host=host;this.changed=changed;
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
  this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.setClearColor('#e9e2cd');
  this.canvas=this.renderer.domElement;this.canvas.id='scene-canvas';this.canvas.setAttribute('aria-hidden','true');host.prepend(this.canvas);
  this.canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.error=Error('WebGL context lost');this.model=null;this.changed();});
  this.scene=new THREE.Scene();this.camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,100);this.camera.up.set(0,0,-1);
  this.scene.add(new THREE.HemisphereLight(0xffffff,0x9ca694,1.7));const sun=new THREE.DirectionalLight(0xffffff,1.35);sun.position.set(-3,8,2);this.scene.add(sun);
  this.promise=fetch('data/scene-plan.json').then(r=>{if(!r.ok)throw Error('Scene plan unavailable');return r.json();}).then(plan=>{this.model=buildScene(plan);this.model.birdGroup.visible=false;this.scene.add(this.model.root);this.canvas.dataset.ready='true';this.canvas.dataset.objects=JSON.stringify(this.model.stats);this.changed();}).catch(e=>{this.error=e;this.canvas.dataset.error='true';this.changed();});
 }
 render(view,width,height){
  if(!this.model)return false;
  this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,2.5));this.renderer.setSize(width,height,false);
  this.canvas.style.width=width+'px';this.canvas.style.height=height+'px';
  const cx=(width/2-view.x)/view.scale/100-19.2,cz=(height/2-view.y)/view.scale/100-10.24;
  const halfW=width/(view.scale*200),halfH=height/(view.scale*200);
  Object.assign(this.camera,{left:-halfW,right:halfW,top:halfH,bottom:-halfH});this.camera.position.set(cx,30,cz);this.camera.lookAt(cx,0,cz);this.camera.updateProjectionMatrix();
  this.model.setDetail(view.scale>1.15);this.model.animate(matchMedia('(prefers-reduced-motion: reduce)').matches?0:performance.now()/1000);
  this.renderer.render(this.scene,this.camera);this.canvas.dataset.triangles=this.renderer.info.render.triangles;this.canvas.dataset.scale=view.scale.toFixed(3);return true;
 }
 dispose(){this.renderer.dispose();this.canvas.remove();}
}
