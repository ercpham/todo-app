!function(e){var t={};function n(d){if(t[d])return t[d].exports;var o=t[d]={i:d,l:!1,exports:{}};return e[d].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,d){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(n.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(d,o,function(t){return e[t]}.bind(null,o));return d},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const d=e=>{let t;return{name:e,list:t,addList:function(e){t=e},getList:function(){return t},addItem:function(e){t.addItem(e)}}},o=(e,t="")=>{let n=[];return{name:e,description:t,items:n,addItem:function(e){n.push(e)},getItem:function(e){n.forEach(t=>{if(t.name==e)return t})},listContents:function(){let e="";return n.forEach(t=>{e+=t.name+" "}),e}}};let l;function i(e){l=e}function c(e){let t=document.getElementById("lists"),n=document.createElement("div");n.setAttribute("id","listwrap");let d=e.getList(),o=document.createElement("ul");d.items.forEach(e=>{let t=document.createElement("li");t.textContent=e.name,o.appendChild(t)}),n.appendChild(o),t.prepend(n)}function r(e){let t=document.getElementById("projects"),n=document.createElement("div");n.classList.add("projectTab");let d=document.createElement("h2");d.textContent=e.name,n.appendChild(d),n.addEventListener("click",()=>{document.getElementById("listwrap").remove(),c(e),i(e),a(document.getElementById("listwrap"),e.getList())}),t.prepend(n)}function a(e,t){for(;e.firstChild;)e.removeChild(e.lastChild);let n=document.createElement("ul");t.items.forEach(e=>{let t=document.createElement("li");t.textContent=e.name,e.complete?(t.style.textDecoration="line-through",n.appendChild(t)):n.prepend(t),t.addEventListener("click",()=>{!function(e,t){let n=["Description: ","Due Date: ","Priority: "],d=0;if(null==e.querySelector("p")){for(let o in t)if(Object.prototype.hasOwnProperty.call(t,o)&&"name"!==o&&"complete"!=o){let l=document.createElement("p");l.textContent=`${n[d++]}${t[o]}`,e.appendChild(l)}}else{e.querySelectorAll("p").forEach(e=>{e.remove()})}}(t,e)}),t.addEventListener("contextmenu",n=>{n.preventDefault(),function(e,t){t.complete?(t.complete=!1,e.style.textDecoration="none"):(t.complete=!0,e.style.textDecoration="line-through")}(t,e)},!1)}),e.appendChild(n)}function u(){document.querySelector(".form").remove()}let m=d("Default Project"),s=d("New Project"),p=o("List 1","The first list in the project"),f=o("List 2","The second list in the project");function E(e){!function(){let e=document.getElementById("content"),t=document.createElement("div");t.classList.add("form");let n=document.createElement("h2");n.textContent="New List Item",t.appendChild(n);let d=document.createElement("div");d.classList.add("close"),d.textContent="X",d.addEventListener("click",u),t.appendChild(d),["Name","Description","Due Date","Priority"].forEach(e=>{let n=document.createElement("div");n.classList.add("fieldWrap");let d=document.createElement("label"),o=document.createElement("input");d.textContent=e+": ",o.setAttribute("type","text"),o.setAttribute("id","item"+e.replace(/\s+/g,"").toLowerCase()),n.appendChild(d),n.appendChild(o),t.appendChild(n)}),e.appendChild(t)}();let t=document.querySelector(".form"),n=document.createElement("button");n.classList.add("formSubmit"),n.textContent="Submit",n.addEventListener("click",()=>{!function(e){e.addItem(((e,t="",n="",d=0,o=!1)=>({name:e,description:t,duedate:n,priority:d,complete:o}))(document.getElementById("itemname").value,document.getElementById("itemdescription").value,document.getElementById("itemduedate").value,document.getElementById("itempriority").value)),a(document.getElementById("listwrap"),e.getList())}(e)}),t.appendChild(n)}function h(){!function(){let e=document.getElementById("content"),t=document.createElement("div");t.classList.add("form");let n=document.createElement("h2");n.textContent="New Project",t.appendChild(n);let d=document.createElement("div");d.classList.add("close"),d.textContent="X",d.addEventListener("click",u),t.appendChild(d),["Name","Description"].forEach(e=>{let n=document.createElement("div");n.classList.add("fieldWrap");let d=document.createElement("label"),o=document.createElement("input");d.textContent=e+": ",o.setAttribute("type","text"),o.setAttribute("id","project"+e.replace(/\s+/g,"").toLowerCase()),n.appendChild(d),n.appendChild(o),t.appendChild(n)}),e.appendChild(t)}();let e=document.querySelector(".form"),t=document.createElement("button");t.classList.add("formSubmit"),t.textContent="Submit",t.addEventListener("click",()=>{let e=d(document.getElementById("projectname").value);e.addList(o("List")),r(e)}),e.appendChild(t)}let y=document.getElementById("lists"),C=document.createElement("button");C.textContent="Add new list item",C.addEventListener("click",()=>{E(l)}),y.appendChild(C),m.addList(p),r(m),c(m),i(m),s.addList(f),document.getElementById("newProject").addEventListener("click",()=>{h()})}]);