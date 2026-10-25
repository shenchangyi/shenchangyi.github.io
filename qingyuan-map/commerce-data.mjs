// All merchants, prices, inventory and products below are explicitly DEMO data.
// The real street POI is QY-030. These display pins are illustrative offsets, not verified shop entrances.
export const shops=[
 {id:'DEMO-FOOD',name:'畲乡小食铺',shortName:'畲乡小食',kind:'bowl',type:'food',bd09:[115.0541432546875,27.0631278703125],tagline:'一笼热米点，一份青原风味',cover:'assets/shops/rice.webp',externalUrl:null,diyUrl:null},
 {id:'DEMO-GIFT',name:'青原山物',shortName:'青原山物',kind:'bag',type:'gift',bd09:[115.0553649490625,27.063610426464844],tagline:'把山水，带回日常',cover:'assets/shops/bag.webp',externalUrl:null,diyUrl:'diy.html'},
 {id:'DEMO-TEA',name:'山间茶事',shortName:'山间茶事',kind:'cup',type:'gift',bd09:[115.0565866434375,27.063932130566407],tagline:'沿山而行，坐下喝茶',cover:'assets/shops/tea.webp',externalUrl:null,diyUrl:null}
];
export const products=[
 {id:'rice',shop:'DEMO-FOOD',name:'畲乡风味米点',category:'热食',description:'以东固米果文化为灵感的概念米点，外观与配方待商家提供。',image:'rice',price:1200,variants:[{id:'small',name:'小笼 · 3 枚',extra:0},{id:'large',name:'分享笼 · 5 枚',extra:600}]},
 {id:'cake',shop:'DEMO-FOOD',name:'七层糕',category:'糕点',description:'青原东固地方小吃题材；此处为 AI 商品示意图。',image:'cake',price:1000,variants:[{id:'four',name:'4 块装',extra:0},{id:'eight',name:'8 块分享装',extra:800}]},
 {id:'sweet',shop:'DEMO-FOOD',name:'番薯干',category:'零嘴',description:'以东固地方农产为灵感的伴手零嘴。',image:'sweet',price:1600,variants:[{id:'one',name:'单袋 · 150g',extra:0},{id:'two',name:'双袋装',extra:1400}]},
 {id:'bag',shop:'DEMO-GIFT',name:'山水随行帆布袋',category:'山水文创',description:'本项目设计概念商品，可在 DIY 工坊试选图案、墨色和题字。',image:'bag',price:6800,variants:[{id:'natural',name:'本白 · 山水',extra:0},{id:'crane',name:'本白 · 鹤影',extra:0}]},
 {id:'cards',shop:'DEMO-GIFT',name:'青原山水明信片',category:'山水文创',description:'三幅山水留作旅途纪念，概念图案非已在售商品。',image:'cards',price:1800,variants:[{id:'three',name:'3 张套装',extra:0},{id:'six',name:'6 张套装',extra:1200}]},
 {id:'tea',shop:'DEMO-TEA',name:'山间清茶礼罐',category:'茶礼',description:'以青原区茶叶农产为灵感的包装概念，产地、等级与实际供货待商家确认。',image:'tea',price:4800,variants:[{id:'one',name:'单罐 · 50g',extra:0},{id:'pair',name:'双罐礼装',extra:4000}]}
];
export const money=cents=>(cents/100).toFixed(cents%100?2:0);
export function findProduct(id){return products.find(p=>p.id===id);}
export function unitPrice(id,variant){const p=findProduct(id),v=p?.variants.find(v=>v.id===variant);return p&&v?p.price+v.extra:null;}
export function cartTotal(cart){return cart.reduce((n,row)=>{const price=unitPrice(row.id,row.variant);return price!==null&&Number.isInteger(row.quantity)&&row.quantity>=1&&row.quantity<=99?n+price*row.quantity:n;},0);}
export function safeMerchantURL(value){if(!value)return null;try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}}
export const localCultureSources=[
 {title:'青原区东固二月二庙会活动，2022-02-22',url:'https://jxja.jxnews.com.cn/system/2022/02/22/019543698.shtml'},
 {title:'青原区东固绿色发展，2023-08-05',url:'https://jxja.jxnews.com.cn/system/2023/08/05/020175552.shtml'}
];

