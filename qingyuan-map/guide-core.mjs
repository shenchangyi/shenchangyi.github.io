export const GEO = { west:115.0244992, south:27.0482008, east:115.093489, north:27.0811433, width:3840, height:2048, crop:[0,0,3840,2048] };
export function projectBD(lng,lat){
  if(!Number.isFinite(lng)||!Number.isFinite(lat)) return null;
  const [x0,y0,x1,y1]=GEO.crop;
  return {x:((lng-GEO.west)/(GEO.east-GEO.west)*GEO.width-x0)/(x1-x0), y:((GEO.north-lat)/(GEO.north-GEO.south)*GEO.height-y0)/(y1-y0)};
}
export function withinCanvas(p){ return !!p && p.x>=0 && p.x<=1 && p.y>=0 && p.y<=1; }
export function safeURL(value){ try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;} }
export function classifyEvent(event,date=new Date()){
 const now=date.getTime(), start=Date.parse(event.start),end=Date.parse(event.end);
 if(!Number.isFinite(start)||!Number.isFinite(end)||end<start) return 'unknown';
 return now>end?'past':now<start?'upcoming':'active';
}
export function filterPOIs(pois,query='',category='all',favorites=null){
 const text=query.trim().toLocaleLowerCase();
 return pois.filter(p=>(category==='all'||p.category===category||(category==='facilities'&&p.category!=='scenic'))&&(!favorites||favorites.includes(p.id))&&(!text||[p.name,...(p.aliases||[])].join(' ').toLocaleLowerCase().includes(text)));
}
export function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
export function fitView(width,height,imageWidth,imageHeight){const scale=Math.min(width/imageWidth,height/imageHeight);return {scale,x:(width-imageWidth*scale)/2,y:(height-imageHeight*scale)/2};}
export function boundedView(view,width,height,imageWidth,imageHeight){
 const w=imageWidth*view.scale,h=imageHeight*view.scale;
 return {...view,x:w<=width?(width-w)/2:clamp(view.x,width-w,0),y:h<=height?(height-h)/2:clamp(view.y,height-h,0)};
}
export function zoomView(view,factor,anchor,min,max){const scale=clamp(view.scale*factor,min,max),ratio=scale/view.scale;return {scale,x:anchor.x-(anchor.x-view.x)*ratio,y:anchor.y-(anchor.y-view.y)*ratio};}
// Choose enough scale for the requested focus to survive the image-edge clamp.
export function focusedView(view,width,height,imageWidth,imageHeight,point,target,max=3.5){
 const px=point.x*imageWidth,py=point.y*imageHeight;
 const required=Math.max(target.x/Math.max(px,1),(width-target.x)/Math.max(imageWidth-px,1),target.y/Math.max(py,1),(height-target.y)/Math.max(imageHeight-py,1));
 const scale=Math.min(max,Math.max(view.scale,Math.max(width/imageWidth,height/imageHeight)*1.32,required));
 return boundedView({scale,x:target.x-px*scale,y:target.y-py*scale},width,height,imageWidth,imageHeight);
}
export function formatDistance(meters){return Number.isFinite(meters)&&meters>=0?(meters>=1000?`${(meters/1000).toFixed(1)} 公里`:`${Math.round(meters)} 米`):'距离待核实';}
export function navigationURL(poi){
 const u=new URL('https://api.map.baidu.com/marker');
 if(!poi?.bd09||poi.inferred)return null;
 u.search=new URLSearchParams({location:`${poi.bd09[1]},${poi.bd09[0]}`,title:poi.name,content:'青原山景区平台检索点，请核对实际入口',coord_type:'bd09ll',output:'html',src:'webapp.qingyuan.guide'});
 return u.href;
}
export function validateRoute(route){
 return !!route && Number.isFinite(route.distance)&&route.distance>=0&&Number.isFinite(route.duration)&&route.duration>=0&&Array.isArray(route.steps)&&route.steps.length>0&&route.steps.every(s=>Array.isArray(s.path)&&s.path.length>=2&&s.path.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>=115.02&&p[0]<=115.10&&p[1]>=27.02&&p[1]<=27.11));
}
