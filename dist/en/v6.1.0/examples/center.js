(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{251:function(e,t,n){"use strict";n.r(t);var o=n(3),a=n(2),r=n(30),i=n(23),c=n(5),s=n(10),d=n(9),w=n(11),l=n(22),g=n(18),u=n(48),m=new s.a({url:"data/geojson/switzerland.geojson",format:new r.a}),f=new w.c({fill:new l.a({color:"rgba(255, 255, 255, 0.6)"}),stroke:new g.a({color:"#319FD3",width:1}),image:new u.a({radius:5,fill:new l.a({color:"rgba(255, 255, 255, 0.6)"}),stroke:new g.a({color:"#319FD3",width:1})})}),p=new i.a({source:m,style:f}),v=new a.a({center:[0,0],zoom:1}),y=new o.a({layers:[new c.a({source:new d.b}),p],target:"map",view:v});document.getElementById("zoomtoswitzerland").addEventListener("click",function(){var e=m.getFeatures()[0].getGeometry();v.fit(e,{padding:[170,50,30,150]})},!1),document.getElementById("zoomtolausanne").addEventListener("click",function(){var e=m.getFeatures()[1].getGeometry();v.fit(e,{padding:[170,50,30,150],minResolution:50})},!1),document.getElementById("centerlausanne").addEventListener("click",function(){var e=m.getFeatures()[1].getGeometry(),t=y.getSize();v.centerOn(e.getCoordinates(),t,[570,500])},!1)}},[[251,0]]]);
//# sourceMappingURL=center.js.map