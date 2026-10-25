// Display coordinates never replace platform navigation coordinates.
export const ATLAS={width:3840,height:2048,west:115.0244992,south:27.0482008,east:115.093489,north:27.0811433};
// The final drawing is 3620 x 1930 native pixels. Do not magnify raster pixels
// beyond one CSS pixel. High-DPR devices load native tiles earlier, not invented detail.
export function nativeScaleLimit(layer='full'){return layer==='full'?Math.min(3620/3840,1930/2048):Math.min(1798/2052,875/1000);}
export const displayNames={
 'QY-017':'净居寺','QY-001':'北入口','QY-002':'游客中心','QY-003':'停车场','QY-005':'阳明书院',
 'QY-008':'动物园','QY-018':'青原山庄','QY-006':'人工瀑布','QY-025':'瞭望塔','QY-026':'休闲小站',
 'QY-027':'电影放映点','QY-028':'拓展基地','QY-031':'禅茶院','QY-034':'自然博物馆商店',
 'QY-035':'青原里酒店','QY-036':'温泉酒店','QY-037':'溪野营地','QY-038':'弘济慈善基金会','QY-030':'青原里'
};
export function displayKind(p){
 if(p.demo)return p.kind;
 if(/动物园/.test(p.name))return 'paw';
 if(/书院|阳明堂/.test(p.name))return 'book';
 if(/瀑布|泉/.test(p.name)&&!p.name.includes('酒店'))return 'waterfall';
 if(/禅茶|咖/.test(p.name))return 'cup';
 if(/酒店|山庄|庄园/.test(p.name))return 'hotel';
 if(/商|商品|袋走/.test(p.name))return 'shop';
 if(/营地/.test(p.name))return 'tent';
 if(/放映/.test(p.name))return 'film';
 if(/亭|阁/.test(p.name))return 'pavilion';
 return p.kind;
}
const main=['QY-017','QY-001','QY-002','QY-005','QY-008','QY-030'];
export function importance(p){return p.demo?65:main.includes(p.id)?100-main.indexOf(p.id):p.category==='scenic'?55:25;}
export function detailLevel(scale){return scale<.48?0:scale<.76?1:2;}
export function oldAnchorToBD(a){
 return [115.02913876166953+(350+a.x*620)/1280*(115.09163483705768-115.02913876166953),
 27.080125870988116-(90+a.y*540)/664*(27.080125870988116-27.051106458369528)];
}
export function overlap(a,b,gap=3){return a.x<b.x+b.w+gap&&a.x+a.w+gap>b.x&&a.y<b.y+b.h+gap&&a.y+a.h+gap>b.y;}
export function layoutMarkers(items,{width,height,scale,selected,obstacles=[],filter='all'}){
 const level=detailLevel(scale),placed=[],occupied=[...obstacles];
 const candidates=items.filter(p=>p.x>=22&&p.x<=width-22&&p.y>=32&&p.y<=height-32)
 .sort((a,b)=>(b.id===selected?1000:importance(b))-(a.id===selected?1000:importance(a)));
 for(const p of candidates){
  const priority=importance(p),isSelected=p.id===selected;
  if(!isSelected&&filter==='all'&&(level===0&&priority<90||level===1&&priority<55||level<2&&p.demo))continue;
  const label=displayNames[p.id]||p.shortName||p.name;
  const labelWidth=Math.min(150,label.length*11+14);
  const pin={x:p.x-22,y:p.y-22,w:44,h:44};
  if(!isSelected&&occupied.some(b=>overlap(pin,b,2)))continue;
  let rect=null,side='below';
  for(const pos of ['below','right','left','above']){
   const r=pos==='below'?{x:p.x-labelWidth/2,y:p.y+20,w:labelWidth,h:23}
    :pos==='above'?{x:p.x-labelWidth/2,y:p.y-43,w:labelWidth,h:23}
    :{x:pos==='right'?p.x+21:p.x-21-labelWidth,y:p.y-12,w:labelWidth,h:24};
   if(r.x>=4&&r.x+r.w<=width-4&&r.y>=4&&r.y+r.h<height-4&&!occupied.some(b=>overlap(r,b,3))){rect=r;side=pos;break;}
  }
  // High zoom may show compact icon-only markers; overview retains only readable names.
  if(!rect&&!isSelected&&level<2)continue;
  if(isSelected&&!rect){rect={x:p.x-labelWidth/2,y:p.y+20,w:labelWidth,h:23};side='below';}
  occupied.push(pin);if(rect)occupied.push(rect);
  placed.push({...p,label,side,showLabel:!!rect,pinRect:pin,labelRect:rect});
 }
 return placed;
}

