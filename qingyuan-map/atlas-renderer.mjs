// Draw at the device's physical pixel size. No CSS-scaled bitmap backing layer.
export class AtlasRenderer {
 constructor(viewport,{changed=()=>{}}={}){
  this.viewport=viewport;this.changed=changed;this.images=new Map();this.queue=[];this.active=0;this.destroyed=false;
  this.canvas=document.createElement('canvas');this.canvas.id='atlas-canvas';this.canvas.setAttribute('aria-hidden','true');viewport.prepend(this.canvas);
  this.ctx=this.canvas.getContext('2d',{alpha:false});this.sources={full:'assets/atlas/ink-overview.webp',local:'assets/aerial-ink-v2.png',satellite:'assets/atlas/satellite.jpg',aerial:'assets/aerial-original.jpg'};
 }
 get(src){
  let item=this.images.get(src);if(item)return item;
  item={image:null,status:'queued',src};this.images.set(src,item);this.queue.push(item);this.pump();return item;
 }
 pump(){while(this.active<4&&this.queue.length){const item=this.queue.shift();this.active++;const image=new Image();image.decoding='async';
  image.onload=()=>{item.image=image;item.status='ready';this.active--;this.changed();this.pump();};
  image.onerror=()=>{item.status='error';this.active--;this.changed();this.pump();};image.src=item.src;
 }}
 paintImage(src,rect){const item=this.get(src);if(item.image)this.ctx.drawImage(item.image,...rect);return item.status;}
 render({layer,view,width,height,compare,manifest}){
  const w=this.viewport.clientWidth,h=this.viewport.clientHeight,dpr=Math.min(window.devicePixelRatio||1,3);
  const bw=Math.round(w*dpr),bh=Math.round(h*dpr);
  if(this.canvas.width!==bw||this.canvas.height!==bh){this.canvas.width=bw;this.canvas.height=bh;}
  this.canvas.style.width=w+'px';this.canvas.style.height=h+'px';this.canvas.dataset.dpr=String(dpr);
  const ctx=this.ctx;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.fillStyle='#e5dfc9';ctx.fillRect(0,0,w,h);
  const {x,y,scale}=view,rect=[x,y,width*scale,height*scale];
  this.paintImage(this.sources[layer],rect);
  let required=0,ready=0,failed=0;
  if(layer==='full'&&manifest){
   this.paintImage(manifest.medium,rect);
   // Load native data whenever medium pixels would be enlarged on this device.
   if(scale*dpr>manifest.width/width/2*.9){
    const visible=manifest.tiles.filter(t=>x+(t.x+t.width)*width*scale>0&&y+(t.y+t.height)*height*scale>0&&x+t.x*width*scale<w&&y+t.y*height*scale<h);
    visible.sort((a,b)=>Math.abs(x+(a.x+a.width/2)*width*scale-w/2)+Math.abs(y+(a.y+a.height/2)*height*scale-h/2)-Math.abs(x+(b.x+b.width/2)*width*scale-w/2)-Math.abs(y+(b.y+b.height/2)*height*scale-h/2));
    for(const t of visible){const status=this.paintImage(t.src,[x+t.x*width*scale,y+t.y*height*scale,t.width*width*scale,t.height*height*scale]);required++;if(status==='ready')ready++;if(status==='error')failed++;}
   }
  }
  if(compare>0){ctx.save();ctx.beginPath();ctx.rect(x,y,width*scale*compare/100,height*scale);ctx.clip();this.paintImage(layer==='full'?this.sources.satellite:this.sources.aerial,rect);ctx.restore();}
  this.canvas.dataset.requiredTiles=required;this.canvas.dataset.readyTiles=ready;this.canvas.dataset.failedTiles=failed;
  const status=document.querySelector('#image-status');if(status)status.textContent=failed?'部分细节未载入 · 点此重试':required>ready?'高清细节加载中…':scale>=.94?'原画细节已载入 · 可看模型近览':'';
 }
 retry(){for(const [src,item]of this.images)if(item.status==='error')this.images.delete(src);this.changed();}
}
