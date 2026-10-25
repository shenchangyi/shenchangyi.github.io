const paths={
search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
temple:'<path d="M3 9c3 0 5-2 9-6 4 4 6 6 9 6H3Zm1 4h16M6 13v7m6-7v7m6-7v7M3 21h18M5 9v4m14-4v4"/>',
service:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-4a7 7 0 0 1 14 0v4M12 13v8m-6-4 6 3 6-3"/>',
route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h8a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h8"/>',
mountain:'<path d="m2 20 7-12 5 8 3-5 5 9H2ZM6 13l3 1 2-2"/><circle cx="17" cy="5" r="2"/>',
pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
weather:'<path d="M6 7V4m-3 6H1m12-3 2-2M9 3V1M5 16a5 5 0 0 1 0-10 5 5 0 0 1 5 4M7 21a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 0 9H7Z"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 11h18m-14 5h3m4 0h3"/>',
clear:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M8 12h8"/>',
locate:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
layers:'<path d="m2 7 10-5 10 5-10 5L2 7Zm0 5 10 5 10-5M2 17l10 5 10-5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',back:'<path d="m15 5-7 7 7 7"/>',
play:'<path d="m8 4 12 8-12 8V4Z"/>',pause:'<path d="M8 4v16m8-16v16"/>',headphones:'<path d="M4 13V9a8 8 0 0 1 16 0v4M4 12H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Z"/>',photo:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 18 6-6 4 4 4-5 4 5"/>',heart:'<path d="M20 5a5 5 0 0 0-8 2 5 5 0 0 0-8-2c-5 5 8 15 8 15S25 10 20 5Z"/>',
parking:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 18V7h4a3 3 0 0 1 0 6H9"/>',leaf:'<path d="M5 19C-1 5 11 2 21 3c1 11-5 19-16 16Zm0 0L16 8M3 22l2-3"/>',plaza:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5m9 4h-5m-4 9v-5m-9-4h5"/>',gate:'<path d="M3 7h18M5 4h14M6 7v14m12-14v14M4 21h4m8 0h4M6 12h12M9 7V4m6 3V4"/>',tower:'<path d="m12 2 5 5H7l5-5Zm-5 5v4m10-4v4M5 12h14M7 12v5m10-5v5M4 18h16M8 18v4m8-4v4M6 22h12"/>',water:'<path d="M3 6c4-4 5 4 9 0s5 4 9 0M3 12c4-4 5 4 9 0s5 4 9 0M3 18c4-4 5 4 9 0s5 4 9 0"/>',toilet:'<circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><path d="M3 15V9h6v6M5 15v7m3-7v7m7-7 3-7 3 7h-6Zm2 0v7m3-7v7"/>',list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',check:'<path d="m4 12 5 5L20 6"/>'};
Object.assign(paths,{
 book:'<path d="M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2V4Zm9 2v15M6 8l3 1m6 0 3-1M6 12l3 1m6 0 3-1"/>',
 paw:'<ellipse cx="5" cy="8" rx="2" ry="3"/><ellipse cx="11" cy="5" rx="2" ry="3"/><ellipse cx="17" cy="7" rx="2" ry="3"/><ellipse cx="21" cy="12" rx="1.5" ry="2.5"/><path d="M5 18c0-3 3-7 6-7s7 5 7 7c0 4-4 1-6 1s-7 3-7-1Z"/>',
 waterfall:'<path d="M4 4h13v10m-7-10v12m4-12v14M3 20c3-3 4 3 7 0s4 3 7 0 3 1 4 0M4 8h3m-3 4h3"/>',
 pavilion:'<path d="M3 9c4-1 7-4 9-7 2 3 5 6 9 7H3Zm1 4h16M6 13v8m12-8v8M3 21h18M7 9v4m10-4v4"/>',
 cup:'<path d="M4 10h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-6Zm13 1h2a3 3 0 0 1 0 6h-2M7 6V3m5 3V2m5 4V3"/>',
 hotel:'<path d="M3 21V5h12v16M7 5V2h4v3m4 6h6v10M7 9h1m3 0h1m-5 4h1m3 0h1M8 21v-4h3v4m7-6h1M2 21h20"/>',
 shop:'<path d="M3 9 5 3h14l2 6c0 4-4 4-5 1-2 3-6 3-8 0-1 3-5 3-5-1Zm2 4v8h14v-8M9 21v-6h6v6"/>',
 tent:'<path d="m2 21 10-17 10 17H2Zm10-17v17m0-12-6 12M9 2l3 2 3-2"/>',
 film:'<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 4v16m10-16v16M3 9h4m10 0h4M3 15h4m10 0h4m-11-6 5 3-5 3Z"/>',
 bowl:'<path d="M3 12h18a9 9 0 0 1-18 0Zm4 9h10M7 8V3m5 5V2m5 6V3"/>',
 bag:'<path d="M4 7h16l1 14H3L4 7Zm4 2V6a4 4 0 0 1 8 0v3"/>',
 brush:'<path d="m14 4 5-2 3 3-8 9-4-4 4-6Zm-4 6-3 3m7 1-3 3M7 13c-5 0-1 7-5 8 7 2 11-1 9-4"/>'
});


export function mountIcons(){const el=document.createElementNS('http://www.w3.org/2000/svg','svg');el.setAttribute('class','icon-defs');el.setAttribute('aria-hidden','true');el.innerHTML='<defs>'+Object.entries(paths).map(([name,p])=>`<symbol id="i-${name}" viewBox="0 0 24 24">${p}</symbol>`).join('')+'</defs>';document.body.prepend(el);document.querySelectorAll('button svg,nav svg').forEach(s=>s.setAttribute('aria-hidden','true'));}
export function icon(name,cls=''){return `<svg class="${cls}" aria-hidden="true"><use href="#i-${paths[name]?name:'pin'}"/></svg>`;}
