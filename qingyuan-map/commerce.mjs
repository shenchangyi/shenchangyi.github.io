import {shops,products,money,findProduct,unitPrice,cartTotal,safeMerchantURL} from './commerce-data.mjs';
export const shopPins=shops.map(s=>({...s,category:'commerce',demo:true,inferred:true}));
export function createCommerce({openSheet,closeSheet,toast,icon,esc,flyToMarket}){
 let cart=[],currentShop=shops[0].id,chosen=null,variant=null,quantity=1,foodCategory='全部';
 const image=p=>`assets/shops/${p.image}.webp`;
 const demo='<p class="commerce-demo">示例商店 · 演示价格 · AI 示意图 · 暂未营业</p>';
 const totalCount=()=>cart.reduce((n,p)=>n+p.quantity,0);
 const cartBar=()=>`<div class="shop-cartbar"><button data-action="shop-cart" class="cart-summary">${icon('bag')}<span>购物袋 ${totalCount()} 件<strong>¥${money(cartTotal(cart))}</strong></span></button><button class="primary" data-action="shop-checkout" ${!cart.length?'disabled':''}>预览订单</button></div>`;
 function market(){
  foodCategory='全部';openSheet('逛一逛青原里',`<div class="market-intro"><h3>吃一口风味，带一件山物。</h3><p>这里为品牌入驻体验区，三家店铺均为示例，地图位置仅作商业区内示意。</p></div><button class="market-map-link" data-action="market-map">${icon('map')}放大地图，看小店招牌${icon('arrow')}</button><div class="merchant-list">${shops.map(s=>`<button class="merchant-row" data-action="shop" data-id="${s.id}"><img src="${s.cover}" alt="${esc(s.name)}商品概念图"><span><strong>${esc(s.name)}</strong><small>${s.type==='food'?'地方小食':'特色好物'} · 示例店</small><em>${esc(s.tagline)}</em></span>${icon('arrow')}</button>`).join('')}</div><p class="notice">未来可为每家店配置品牌介绍、真实商品、价格、店铺链接与 DIY 小程序入口。</p>`,'market',{expanded:true});
 }
 function shop(id){
  const s=shops.find(s=>s.id===id);if(!s)return;currentShop=id;const list=products.filter(p=>p.shop===id&&(foodCategory==='全部'||p.category===foodCategory||s.type!=='food'));
  const external=safeMerchantURL(s.externalUrl);
  openSheet(s.name,`<div class="shop-header"><img src="${s.cover}" alt="${esc(s.name)}概念商品"><div><h3>${esc(s.tagline)}</h3><p>青原里商业区 · 店址待核验</p></div></div>${demo}<div class="shop-links"><button data-action="market">${icon('back')}返回街区</button>${s.diyUrl?`<a href="${s.diyUrl}">${icon('brush')}打开 DIY 工坊</a>`:''}${external?`<a href="${esc(external)}" target="_blank" rel="noopener noreferrer">访问品牌店铺 ↗</a>`:''}</div>${s.type==='food'?`<div class="food-menu"><nav aria-label="菜单分类">${['全部','热食','糕点','零嘴'].map(c=>`<button data-action="food-category" data-value="${c}" aria-pressed="${foodCategory===c}">${c}</button>`).join('')}</nav><div>${list.map(p=>`<article class="food-item"><button class="product-photo" data-action="product" data-id="${p.id}" aria-label="查看${p.name}"><img src="${image(p)}" alt="${p.name} AI 概念示意图"></button><div><h3>${p.name}</h3><p>${p.variants[0].name}</p><strong class="price">¥${money(p.price)}<small>演示价</small></strong><button class="pick-spec" data-action="product" data-id="${p.id}">选规格</button></div></article>`).join('')}</div></div>`:`<div class="goods-grid">${list.map(p=>`<button class="goods-card" data-action="product" data-id="${p.id}"><img src="${image(p)}" alt="${p.name} AI 概念示意图"><h3>${p.name}</h3><strong class="price">¥${money(p.price)}<small>演示价</small></strong></button>`).join('')}</div>`}${cartBar()}`,'shop',{expanded:true});
 }
 function product(id,{preserve=false}={}){
  const scrollPosition=document.querySelector("#sheet-content").scrollTop;const p=findProduct(id);if(!p)return;if(!preserve){chosen=id;variant=p.variants[0].id;quantity=1;}const s=shops.find(s=>s.id===p.shop);
  openSheet(p.name,`<div class="product-view"><button class="back-shop" data-action="shop" data-id="${p.shop}">${icon('back')}${s.name}</button><img class="product-hero" src="${image(p)}" alt="${p.name} AI 示意图"><div class="product-heading"><strong class="price">¥${money(unitPrice(id,variant))}</strong><span>演示价 / 未开售</span></div><h3>${p.name}</h3><p class="product-description">${p.description}</p><fieldset class="variant-options"><legend>${s.type==='food'?'选择份量':'选择款式'}</legend>${p.variants.map(v=>`<button data-action="product-variant" data-value="${v.id}" aria-pressed="${variant===v.id}">${v.name} · ¥${money(p.price+v.extra)}</button>`).join('')}</fieldset><div class="quantity-row"><span>数量</span><div><button data-action="product-minus" aria-label="减少数量" ${quantity<=1?'disabled':''}>−</button><output aria-live="polite">${quantity}</output><button data-action="product-plus" aria-label="增加数量" ${quantity>=99?'disabled':''}>＋</button></div></div>${id==='bag'?`<a class="diy-entry" href="diy.html">${icon('brush')}亲手设计图案与题字${icon('arrow')}</a>`:''}<p class="commerce-demo">商品、价格与图片均为体验示意，不产生真实订单。</p><div class="product-actions"><button class="secondary" data-action="product-add">加入购物袋</button><button class="primary" data-action="product-preview">预览订单</button></div></div>`,'product',{expanded:true,focus:!preserve});if(preserve)document.querySelector('#sheet-content').scrollTop=scrollPosition;
 }
 function add(){const p=findProduct(chosen);if(!p)return;const row=cart.find(r=>r.id===chosen&&r.variant===variant);if(row){row.quantity=Math.min(99,row.quantity+quantity);}else cart.push({id:chosen,variant,quantity});}
 function basket(checkout=false){
  openSheet(checkout?'订单预览 · 演示':'我的购物袋',`${cart.length?`<p class="commerce-demo">体验流程不收款、不提交订单，也不会收集手机号或收货地址。</p><div class="cart-rows">${cart.map((r,i)=>{const p=findProduct(r.id),v=p.variants.find(v=>v.id===r.variant);return `<article class="cart-row"><img src="${image(p)}" alt=""><div><small>${shops.find(s=>s.id===p.shop).name} · 示例店</small><strong>${p.name}</strong><p>${v.name} × ${r.quantity}</p><b>¥${money(unitPrice(r.id,r.variant)*r.quantity)}</b></div>${!checkout?`<button data-action="cart-remove" data-value="${i}" aria-label="移除${p.name}">${icon('close')}</button>`:''}</article>`;}).join('')}</div><div class="order-total"><span>商品合计</span><strong>¥${money(cartTotal(cart))}</strong></div><p class="notice">运费、自提、售后与库存：正式接入商家后配置，当前未计算。</p><button class="primary wide" data-action="${checkout?'demo-finish':'shop-checkout'}">${checkout?'完成体验':'预览订单'}</button>`:`<div class="empty-state">${icon('bag')}<strong>还没有选好山中好物</strong><p>先去小店看看，感兴趣的再放进购物袋。</p><button class="primary" data-action="market">逛小店</button></div>`}`,'cart',{expanded:true});
 }
 function handle(action,id,value){
  switch(action){
   case'shop':foodCategory='全部';shop(id);return true;
   case'market':market();return true;
   case'market-map':closeSheet();flyToMarket();toast('虚线图标为示例店铺，点击可浏览商品。');return true;
   case'food-category':foodCategory=value;shop(currentShop);return true;
   case'product':product(id);return true;
   case'product-variant':if(findProduct(chosen)?.variants.some(v=>v.id===value)){variant=value;product(chosen,{preserve:true});}return true;
   case'product-minus':quantity=Math.max(1,quantity-1);product(chosen,{preserve:true});return true;
   case'product-plus':quantity=Math.min(99,quantity+1);product(chosen,{preserve:true});return true;
   case'product-add':add();shop(findProduct(chosen).shop);toast('已加入演示购物袋');return true;
   case'product-preview':add();basket(true);return true;
   case'shop-cart':basket();return true;
   case'shop-checkout':basket(true);return true;
   case'cart-remove':if(Number.isInteger(Number(value)))cart.splice(Number(value),1);basket();return true;
   case'demo-finish':toast('体验完成，没有生成真实订单。');market();return true;
  }return false;
 }
 return {market,shop,handle};
}

