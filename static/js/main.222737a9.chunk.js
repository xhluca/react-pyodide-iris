(this["webpackJsonpreact-pyodide-iris"]=this["webpackJsonpreact-pyodide-iris"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),i=n.n(c),r=n(4),s=n.n(r),u=(n(10),n(2)),d=n.p+"static/media/logo.6ce24c58.svg",o=(n(11),n.p+"static/media/train.d7b1dbfa.py"),l=n.p+"static/media/predict.f128f1d3.py",j=function(e){return Number.parseFloat(e).toFixed(2)},p=function(e,t){return fetch(e).then((function(e){return e.text()})).then(t)},b=function(e){var t=Object(c.useState)(j(e.value)),n=Object(u.a)(t,2),i=n[0],r=n[1];return Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{className:"App-slider-desc",children:[e.name,": ",e.value," cm"]}),Object(a.jsx)("div",{className:"App-slider",children:Object(a.jsx)("input",{type:"range",step:.05,min:e.min,max:e.max,value:i,onChange:function(e){return r(e.target.value)},onMouseUp:function(t){return e.setter(j(t.target.value))}})})]})};var m=function(){var e=Object(c.useRef)(!1),t=Object(c.useState)(6),n=Object(u.a)(t,2),i=n[0],r=n[1],s=Object(c.useState)(3.25),j=Object(u.a)(s,2),m=j[0],O=j[1],f=Object(c.useState)(4),h=Object(u.a)(f,2),g=h[0],v=h[1],x=Object(c.useState)(1.25),w=Object(u.a)(x,2),y=w[0],S=w[1],P=Object(c.useState)("(loading...)"),F=Object(u.a)(P,2),N=F[0],A=F[1];return Object(c.useEffect)((function(){window.languagePluginLoader.then((function(){if(!1===e.current)return window.pyodide.loadPackage(["numpy","pandas","scikit-learn"])})).then((function(){var t=window.pyodide;!1===e.current&&(e.current=!0,p(o,(function(e){A("(training...)"),t.runPython(e)}))),p(l,(function(e){A("(predicting...)"),window.data={sep_len:i,sep_wid:m,pet_len:g,pet_wid:y};var n=t.runPython(e);A(n)}))}))}),[i,m,g,y]),Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)("div",{className:"App-content",children:[Object(a.jsx)("img",{src:d,className:"App-logo",alt:"logo"}),Object(a.jsxs)("div",{children:[Object(a.jsx)(b,{name:"Sepal Length",min:4,max:8,value:i,setter:r}),Object(a.jsx)(b,{name:"Sepal Width",min:2,max:4.5,value:m,setter:O}),Object(a.jsx)(b,{name:"Petal Length",min:1,max:7,value:g,setter:v}),Object(a.jsx)(b,{name:"Petal Width",min:0,max:2.5,value:y,setter:S})]}),Object(a.jsxs)("div",{children:["Predicted label: ",N]})]})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};s.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root")),O()}},[[12,1,2]]]);
//# sourceMappingURL=main.222737a9.chunk.js.map