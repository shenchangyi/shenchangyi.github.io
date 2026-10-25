const platform='百度 Place API，2026-10-24；平台检索坐标，未现场确认入口。';
const officialMap='青原文旅公众号导览图（腾讯地图底图，2026-10-24 截图）。坐标按底图相对位置推断到 BD-09，不是测绘值，也不是百度检索点。';
export const guide={title:'青原山',subtitle:'山水入画，随心慢游',version:'2026-10-23',description:'在青绿山林与古寺书院之间，读一幅青原山水。你可以点选画中的地标，听一段介绍，或从景点列表开始了解这片景区。',notice:'当前为导览体验版。画稿位置仍在校核，请以现场路牌和景区指引为准。'};
export const pois=[
 {id:'QY-017',name:'净居寺',category:'scenic',kind:'temple',tag:'古寺寻幽',icon:'assets/guide/jingjusi.png',image:'assets/guide/jingjusi.png',imageKind:'手绘山门图标',anchor:{x:.4452,y:.5481},localAnchor:{x:.78,y:.75},bd09:[115.061718,27.060768],description:'净居寺是青原山的主要人文景点。山门有层叠的灰瓦屋面、中央拱门与两侧圆窗，红墙掩映在山林之间。',source:'用户景区介绍长截图（页面标注 2025-11-08），山门图标依据其中照片重绘。',positionNote:'画中标记对应影像屋顶（115.059844, 27.063150）。导航仍用平台检索点（115.061718, 27.060768），两者约相差 323 米。平台另有西门点，距屋顶约 74 米，未改作导航点。到访前请核对实际入口。',audioText:'这里是青原山净居寺。层叠的灰瓦、两侧圆窗与红墙，构成山门鲜明的轮廓。参观时，请留意景区和寺院的现场指引。此段为依据现有图文整理的系统朗读试用稿。'},
 {id:'QY-V01',name:'圆形广场',category:'scenic',kind:'plaza',tag:'航拍地物',anchor:{x:.4032,y:.4648},localAnchor:{x:.765,y:.45},description:'在航拍中可以辨认出环形铺装与周边的草地、道路。这里暂以“圆形广场”作为地物称谓，正式名称仍待景区核对。',source:'用户提供的航拍图；既有全域配准控制点 CP01。',positionNote:'影像判读位置。正式名称、游览入口和开放情况待核实。',audioText:'画面中的圆形广场，可以与原始航拍里的环形铺装相互对照。正式名称与开放情况仍待核实。'},
 {id:'QY-V02',name:'田块与环路',category:'scenic',kind:'leaf',tag:'田园风景',anchor:{x:.285,y:.613},localAnchor:{x:.51,y:.64},description:'这一片田块与外围道路延续了航拍中的空间关系，是认识谷地布局的参照。标记用于查看地貌，不代表已开放的游览项目。',source:'用户航拍图与已接受的局部手绘样张。',positionNote:'图像地物参照，不作为导航目的地。'},
 {id:'QY-005',name:'阳明书院',aliases:['书院','青原山阳明堂'],category:'scenic',kind:'temple',tag:'书院文脉',icon:'assets/guide/academy.png',image:'assets/guide/academy-photo.jpg',imageKind:'实景参考照片',bd09:[115.05969,27.066021],description:'阳明书院是现有景区图文与活动资讯中出现的人文地点。参考照片呈现了白墙灰瓦、三开门的入口和层层院落。公众号导览图在 X742 一带另标“青原山阳明堂”，是否为同一处入口，现场再核。',source:'文旅青原 2026-09-19 资讯；新华网来源图文 2025-06-18，图片由青原区阳明书院陈列馆提供（经新浪转载）。坐标为百度 Place API 2026-10-24 检索点，地址为吉青公路青原山风景名胜区。',sourceURL:'https://finance.sina.com.cn/wm/2025-06-18/doc-infamzss8495428.shtml',positionNote:'平台检索点，未现场核对入口。已按坐标投到全域画卷，位置待周四现场确认。接驳线另有同名点，相距约 66 米。',audioText:'阳明书院，是了解青原山书院文化的一处人文地点。现有照片中，白墙与灰瓦围合出层层院落。这里的导览位置还在核对，请到访时以景区指引为准。'},
 {id:'QY-008',name:'青原山风景名胜区动物园',aliases:['青原山动物园','吉安市动物园'],category:'scenic',kind:'leaf',tag:'亲子游览',bd09:[115.058205,27.072299],description:'公众号导览图在景区北侧同时标了“吉安市动物园”和“青原山风景名胜区动物园”，两枚图钉一北一南，中间隔着水面。当前坐标对应后者。两者是否为同一运营入口，仍需现场确认。',source:platform+' 名称对照青原文旅公众号导览图 2026-10-24。',positionNote:'平台位置，对应公众号图上偏南的那枚动物园图钉。开放时间和票务以现场为准。'},
 {id:'QY-001',name:'北入口',category:'service',kind:'gate',tag:'进入景区',bd09:[115.059749,27.073207],description:'百度地图检索到的青原山风景区北入口。到达时请确认实际开放的出入口。',source:platform,positionNote:'平台检索点，未现场核对。'},
 {id:'QY-002',name:'游客中心',category:'service',kind:'service',tag:'游客服务',bd09:[115.049928,27.060593],description:'可以在游客中心咨询游览方向和服务设施。当前名称与位置来自平台检索，服务项目及开放时间尚待确认。',source:platform,positionNote:'平台检索点，未现场核对。'},
 {id:'QY-003',name:'西门停车场',category:'parking',kind:'parking',tag:'停车服务',bd09:[115.048688,27.061098],description:'平台检索记录中的西门地上停车场。车位、收费标准与当前可用情况请以现场公示为准。',source:platform,positionNote:'平台检索点，未现场核对。'},
 {id:'QY-018',name:'青原山庄',category:'scenic',kind:'temple',tag:'线路站点',bd09:[115.0562,27.0644],inferred:true,description:'一日游第 2 站。公众号图上，它在景区中部道路西侧，北为动物园，南为阳明书院一带。百度检索没有景区范围内的同名点。',source:officialMap,positionNote:'按公众号导览图相对位置推断，误差可能到一两百米。不作为导航终点，周四现场再定入口。'},
 {id:'QY-019',name:'旦遇亭',category:'scenic',kind:'tower',tag:'路旁亭台',bd09:[115.0606,27.0626],inferred:true,description:'公众号图上，旦遇亭在青原山庄东侧、净居寺西北的道路旁。百度没有检索到这个名称。',source:officialMap,positionNote:'按公众号导览图相对位置推断。建筑本体和入口未核对。'},
 {id:'QY-011',name:'七祖塔',category:'scenic',kind:'tower',tag:'人文地标',bd09:[115.0619,27.0614],inferred:true,description:'公众号图上，七祖塔在净居寺北侧、人工瀑布西侧。百度检索 0 条，不能用区外同名点代替。',source:officialMap,positionNote:'按公众号导览图相对位置推断，落在净居寺平台点附近。塔的实际位置周四再核。'},
 {id:'QY-006',name:'青原山人工瀑布',aliases:['人工瀑布'],category:'scenic',kind:'water',tag:'山水景观',bd09:[115.061652,27.062487],description:'百度地图上的名称是“青原山人工瀑布”，地址写在青原山登山步道。不是新干县龙门瀑布。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。入口和开放情况未现场核对。'},
 {id:'QY-020',name:'青原山阳明堂',aliases:['阳明堂'],category:'scenic',kind:'temple',tag:'名称待核',bd09:[115.056166,27.064291],description:'百度地图标注在安隐阁西北侧约 150 米。与阳明书院平台点不是同一个坐标，暂不合并。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。是否与阳明书院为同一参观入口，现场再核。'},
 {id:'QY-021',name:'秘境阳明谷',category:'scenic',kind:'leaf',tag:'谷地景点',bd09:[115.056332,27.064513],description:'百度地图标注在青原山景区内，紧邻青原山庄和阳明堂。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。未现场核对入口。'},
 {id:'QY-022',name:'青原山九叠泉',aliases:['九叠泉'],category:'scenic',kind:'water',tag:'泉瀑',bd09:[115.06247,27.060579],description:'百度地址写在吉青公路 17 号净居寺内东侧。与净居寺平台点很近，不代表泉眼已现场定位。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-023',name:'青原塔院',category:'scenic',kind:'tower',tag:'塔院',bd09:[115.061795,27.060243],description:'百度地址写在青原山登山步道。与七祖塔不是同一个名称，暂不合并。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-024',name:'行思禅院',category:'scenic',kind:'temple',tag:'禅院',bd09:[115.063703,27.059287],description:'百度地址写在青原山登山步道，在净居寺建筑群东侧。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-025',name:'青原山瞭望塔',category:'scenic',kind:'tower',tag:'观景',bd09:[115.067252,27.065481],description:'百度地址写在吉青公路、742 县一带，位于景区东侧山路。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。是否在当前画卷主游览范围内，现场再核。'},
 {id:'QY-026',name:'青原山休闲小站',category:'service',kind:'service',tag:'休息点',bd09:[115.059901,27.065021],description:'百度地图标注在青原山登山步道，阳明书院南侧。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-027',name:'青原山风景区公益电影放映点',aliases:['公益电影放映点'],category:'service',kind:'service',tag:'活动点',bd09:[115.056571,27.063806],description:'百度地址写在浒岗行政村，位于景区中部道路旁。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。不代表当前有放映。'},
 {id:'QY-028',name:'星火(青原山)拓展训练基地',aliases:['星火拓展'],category:'scenic',kind:'leaf',tag:'拓展',bd09:[115.058876,27.063998],description:'百度地址写在青原山游客健走步道。截图里的全称带括号，按这个名称收录。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-029',name:'袋走青原',category:'service',kind:'service',tag:'文创',bd09:[115.054323,27.062989],description:'百度地址写在河东街道青原山风景区，青原里商业街北侧。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-030',name:'青原里商业街',category:'service',kind:'service',tag:'商业',bd09:[115.054658,27.063199],description:'百度地址写在青原山游客健走步道。不是青原城区的青原步行街。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-031',name:'北纬27°禅茶院',aliases:['北纬27禅茶院'],category:'scenic',kind:'temple',tag:'茶院',bd09:[115.056554,27.062985],description:'百度地址写在青原山游客健走步道、青原山风景区。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-032',name:'别墅庄园',category:'service',kind:'service',tag:'住宿线索',bd09:[115.048987,27.060963],description:'百度地址写在青斋段附近，紧邻西门停车场。是否对游客开放，以现场为准。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-033',name:'吉安市林科所',category:'service',kind:'service',tag:'机构',bd09:[115.051537,27.06013],description:'百度地址写在青原山游客健走步道、青原山风景区，游客中心东侧。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-034',name:'青原山自然博物馆商品部',aliases:['自然博物馆商品部'],category:'service',kind:'service',tag:'文创',bd09:[115.053112,27.059414],description:'百度地址写在青原山游客健走步道。只收录商品部这个点，不把井冈山自然博物馆算进来。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-035',name:'秘境青原里疗愈度假酒店',category:'service',kind:'service',tag:'住宿',bd09:[115.056833,27.064216],description:'百度地址写在青原山风景区青原山庄内。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。营业情况未核对。'},
 {id:'QY-036',name:'秘境温泉度假酒店',category:'service',kind:'service',tag:'住宿',bd09:[115.05545,27.063582],description:'百度全称是“秘境温泉度假酒店(青原山风景名胜区店)”，地址写在青原山庄内。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。营业情况未核对。'},
 {id:'QY-037',name:'法喜咖谷溪野营地',aliases:['法喜伽谷溪野营地'],category:'scenic',kind:'leaf',tag:'营地',bd09:[115.062215,27.060439],description:'截图写作“法喜伽谷溪野营地”。百度建议接口返回的名称是“法喜咖谷溪野营地”，地址在青原山登山步道。按百度名称收录，别名保留截图写法。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。用字以平台为准。'},
 {id:'QY-038',name:'江西青原弘济慈善基金会',category:'service',kind:'service',tag:'机构',bd09:[115.06362,27.058985],description:'百度地址写在净居禅寺行思禅院。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。'},
 {id:'QY-039',name:'安隐阁',aliases:['安隐庵'],category:'scenic',kind:'temple',tag:'名称待核',bd09:[115.056742,27.062856],description:'截图上的橙标写作“安隐庵”。百度同位置检索到的是“安隐阁”，地址在青原山游客健走步道。两名暂记在同一点，周四再核牌匾。',source:platform,positionNote:'百度地点建议坐标，2026-10-24。截图名称与平台名称不一致。'}
];
export const curatedRoutes=[{id:'day-tour',name:'青原山一日游',subtitle:'按公众号导览图上的编号看四个点',source:'青原文旅公众号导览图，2026-10-24。编号 1 景区、2 青原山庄、3 阳明书院、4 动物园。',verified:false,stops:[{name:'青原山风景名胜区',poiId:null},{name:'青原山庄',poiId:'QY-018'},{name:'阳明书院',poiId:'QY-005'},{name:'青原山风景名胜区动物园',poiId:'QY-008'}],description:'顺序跟公众号图上的红圈编号一致。蓝线是示意，不是已核实的步行轨迹。第 2 站坐标是相对位置推断，不能当导航终点。'}];
export const events=[
 {id:'mid-autumn',name:'中秋游园会',start:'2026-09-26T18:30:00+08:00',end:'2026-09-26T21:30:00+08:00',place:'青原山景区',description:'文旅青原双节活动资讯中的往期节目。'},
 {id:'national-day',name:'国庆嘉年华',start:'2026-10-01T00:00:00+08:00',end:'2026-10-07T23:59:59+08:00',place:'青原山景区',description:'保留往期活动资料；不代表当前仍有演出。'},
 {id:'academy-game',name:'射箭答题活动',start:'2026-09-25T10:30:00+08:00',end:'2026-09-25T23:59:59+08:00',endEstimated:true,place:'阳明书院',description:'原资讯只给出开始时间；结束日按同日归档，不作为准确演出时段。'}
];
export const panoramaAssets=[]; // Add only real, authorized HTTPS panorama URLs with poiId, title and source.

// Public preview excludes local-review reference photographs.
for(const p of pois){if(p.imageKind==='实景参考照片'){delete p.image;delete p.imageKind;}}
