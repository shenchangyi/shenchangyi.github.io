const form=document.querySelector('#diy-form'),art=document.querySelector('#printed-art'),text=document.querySelector('#printed-text'),status=document.querySelector('#design-status');
let downloadURL=null;
function update(){
 const d=new FormData(form),color=d.get('color'),pattern=d.get('pattern');
 art.setAttribute('stroke',color);text.setAttribute('fill',color);text.textContent=String(d.get('text')||'').slice(0,8);
 document.querySelector('#landscape-path').style.display=pattern==='mountain'?'':'none';document.querySelector('#crane-path').style.display=pattern==='crane'?'':'none';document.querySelector('#crane-path').removeAttribute('hidden');
 status.textContent='实时预览已更新；可保存新的设计。';document.querySelector('#download-design').hidden=true;
}
form.addEventListener('input',update);
document.querySelector('#reset-design').onclick=()=>{form.reset();update();};
form.addEventListener('submit',e=>{e.preventDefault();if(downloadURL)URL.revokeObjectURL(downloadURL);const svg=document.querySelector('#bag-art').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');downloadURL=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));const link=document.querySelector('#download-design');link.href=downloadURL;link.hidden=false;const d=new FormData(form);try{localStorage.setItem('qingyuan-demo-design',JSON.stringify({pattern:d.get('pattern'),color:d.get('color'),text:d.get('text'),savedAt:new Date().toISOString()}));status.textContent='设计已保存在当前浏览器。可下载 SVG，没有提交生产或订单。';}catch{status.textContent='可下载本次设计；浏览器暂不允许本地保存。';}});
window.addEventListener('pagehide',()=>{if(downloadURL)URL.revokeObjectURL(downloadURL);});
try{const saved=JSON.parse(localStorage.getItem('qingyuan-demo-design')||'null');if(saved&&['mountain','crane'].includes(saved.pattern)&&['#426859','#974b39','#494e49'].includes(saved.color)){form.querySelector('[name=pattern][value="'+saved.pattern+'"]').checked=true;form.querySelector('[name=color][value="'+saved.color+'"]').checked=true;form.querySelector('#custom-text').value=String(saved.text||'').slice(0,8);}}catch{}
update();
