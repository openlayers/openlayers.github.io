"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2486],{71777:function(e,t,n){var o=n(41564),l=n(87240),s=n(49208),i=n(12185),m=n(23986),d=n(28e3),u=n(29810),g=n(21133),a=n(38276),c=n(44689),r=n(88292),y=n(59194);let f=!1;const p={points:{text:document.getElementById("points-text"),align:document.getElementById("points-align"),baseline:document.getElementById("points-baseline"),rotation:document.getElementById("points-rotation"),font:document.getElementById("points-font"),weight:document.getElementById("points-weight"),size:document.getElementById("points-size"),height:document.getElementById("points-height"),offsetX:document.getElementById("points-offset-x"),offsetY:document.getElementById("points-offset-y"),color:document.getElementById("points-color"),outline:document.getElementById("points-outline"),outlineWidth:document.getElementById("points-outline-width"),maxreso:document.getElementById("points-maxreso")},lines:{text:document.getElementById("lines-text"),align:document.getElementById("lines-align"),baseline:document.getElementById("lines-baseline"),rotation:document.getElementById("lines-rotation"),font:document.getElementById("lines-font"),weight:document.getElementById("lines-weight"),placement:document.getElementById("lines-placement"),maxangle:document.getElementById("lines-maxangle"),overflow:document.getElementById("lines-overflow"),size:document.getElementById("lines-size"),height:document.getElementById("lines-height"),offsetX:document.getElementById("lines-offset-x"),offsetY:document.getElementById("lines-offset-y"),color:document.getElementById("lines-color"),outline:document.getElementById("lines-outline"),outlineWidth:document.getElementById("lines-outline-width"),maxreso:document.getElementById("lines-maxreso")},polygons:{text:document.getElementById("polygons-text"),align:document.getElementById("polygons-align"),baseline:document.getElementById("polygons-baseline"),rotation:document.getElementById("polygons-rotation"),font:document.getElementById("polygons-font"),weight:document.getElementById("polygons-weight"),placement:document.getElementById("polygons-placement"),maxangle:document.getElementById("polygons-maxangle"),overflow:document.getElementById("polygons-overflow"),size:document.getElementById("polygons-size"),height:document.getElementById("polygons-height"),offsetX:document.getElementById("polygons-offset-x"),offsetY:document.getElementById("polygons-offset-y"),color:document.getElementById("polygons-color"),outline:document.getElementById("polygons-outline"),outlineWidth:document.getElementById("polygons-outline-width"),maxreso:document.getElementById("polygons-maxreso")}},E=function(e,t,n){const o=n.text.value,l=n.maxreso.value;let s=e.get("name");var i,m;return t>l||"hide"==o?s="":"shorten"==o?(m=12,s=(i=s).length>m?i.slice(0,m-1)+"…":i.slice()):"wrap"!=o||n.placement&&"line"==n.placement.value||(s=b(s,16,"\n")),s},I=function(e,t,n){const o=n.align.value,l=n.baseline.value,s=n.size.value,i=n.height.value,m=parseInt(n.offsetX.value,10),d=parseInt(n.offsetY.value,10),u=n.weight.value,g=n.placement?n.placement.value:void 0,r=n.maxangle?parseFloat(n.maxangle.value):void 0,p=n.overflow?"true"==n.overflow.value:void 0,I=parseFloat(n.rotation.value);if("'Open Sans'"==n.font.value&&!f){const e=document.createElement("link");e.href="https://fonts.googleapis.com/css?family=Open+Sans",e.rel="stylesheet",document.head.appendChild(e),f=!0}const B=u+" "+s+"/"+i+" "+n.font.value,w=n.color.value,h=n.outline.value,v=parseInt(n.outlineWidth.value,10);return new y.A({textAlign:""==o?void 0:o,textBaseline:l,font:B,text:E(e,t,n),fill:new a.A({color:w}),stroke:new c.A({color:h,width:v}),offsetX:m,offsetY:d,placement:g,maxAngle:r,overflow:p,rotation:I})};function B(e,t){return new r.Ay({stroke:new c.A({color:"blue",width:1}),fill:new a.A({color:"rgba(0, 0, 255, 0.1)"}),text:I(e,t,p.polygons)})}const w=new m.A({source:new u.A({url:"data/geojson/polygon-samples.geojson",format:new s.A}),style:B});function h(e,t){return new r.Ay({stroke:new c.A({color:"green",width:2}),text:I(e,t,p.lines)})}const v=new m.A({source:new u.A({url:"data/geojson/line-samples.geojson",format:new s.A}),style:h});function x(e,t){return new r.Ay({image:new g.A({radius:10,fill:new a.A({color:"rgba(255, 0, 0, 0.1)"}),stroke:new c.A({color:"red",width:1})}),text:I(e,t,p.points)})}const A=new m.A({source:new u.A({url:"data/geojson/point-samples.geojson",format:new s.A}),style:x});new o.A({layers:[new i.A({source:new d.A}),w,v,A],target:"map",view:new l.Ay({center:[-8161939,6095025],zoom:8})});function b(e,t,n){if(e.length>t){let o=t;for(;o>0&&" "!=e[o]&&"-"!=e[o];)o--;if(o>0){let l;l="-"==e.substring(o,o+1)?e.substring(0,o+1):e.substring(0,o);return l+n+b(e.substring(o+1),t,n)}}return e}document.getElementById("refresh-points").addEventListener("click",(function(){A.setStyle(x)})),document.getElementById("refresh-lines").addEventListener("click",(function(){v.setStyle(h)})),document.getElementById("refresh-polygons").addEventListener("click",(function(){w.setStyle(B)}))}},function(e){var t;t=71777,e(e.s=t)}]);
//# sourceMappingURL=vector-labels.js.map