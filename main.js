!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=(e,t="")=>{let n;return{name:e,description:t,list:n,addList:function(e){n=e},getList:function(){return n},addItem:function(e){n.addItem(e)}}},l=(e,t="")=>{let n=[];return{name:e,description:t,items:n,addItem:function(e){n.push(e)},getItem:function(e){n.forEach(t=>{if(t.name==e)return t})},listContents:function(){let e="";return n.forEach(t=>{e+=t.name+" "}),e},removeItem:function(e){let t=n.indexOf(e);n.splice(t,1)}}};let r=null;function d(e){r=e,document.getElementById("tab_"+e.name).classList.add("selected")}function c(){return r}function i(e){let t=document.getElementById("lists"),n=document.createElement("div");n.setAttribute("id","listwrap");let o=document.createElement("h2");o.textContent=e.name,n.append(o);let l=document.createElement("h3");l.textContent=e.description,n.append(l);let r=e.getList(),d=document.createElement("ul");r.items.forEach(e=>{let t=document.createElement("li");t.textContent=e.name,d.appendChild(t)}),n.appendChild(d),t.prepend(n)}function a(e){let t=document.getElementById("projects"),n=document.createElement("div");n.classList.add("projectTab"),n.setAttribute("id","tab_"+e.name);let o=document.createElement("h2");o.textContent=e.name,n.appendChild(o),n.addEventListener("click",()=>{document.querySelectorAll(".projectTab").forEach(e=>e.classList.remove("selected")),document.getElementById("listwrap").remove(),i(e),d(e),m(document.getElementById("listwrap"),e.getList())}),t.prepend(n)}function m(e,t){e.querySelector("ul").remove();let n=document.createElement("ul");t.items.forEach(e=>{let t=document.createElement("li");t.textContent=e.name,e.complete?(t.style.textDecoration="line-through",n.appendChild(t)):n.prepend(t),t.addEventListener("click",()=>{!function(e,t){let n=["Description: ","Due Date: ","Priority: "],o=0;if(null==e.querySelector("p")){for(let l in t)if(Object.prototype.hasOwnProperty.call(t,l)&&"name"!==l&&"complete"!=l){let r=document.createElement("p");r.textContent=`${n[o++]}${t[l]}`,e.appendChild(r)}let l=document.createElement("button");l.textContent="Remove",l.classList.add("removebutton"),l.addEventListener("click",()=>{r.getList().removeItem(t.name),e.remove()}),e.appendChild(l)}else{e.querySelectorAll("p").forEach(e=>{e.remove()}),e.querySelector("button").remove()}}(t,e)}),t.addEventListener("contextmenu",n=>{n.preventDefault(),function(e,t){t.complete?(t.complete=!1,e.style.textDecoration="none"):(t.complete=!0,e.style.textDecoration="line-through")}(t,e)},!1)}),e.appendChild(n)}function u(e,t){let n=document.getElementById("content"),o=document.createElement("div");o.classList.add("form");let l=document.createElement("h2");l.textContent="New List Item",o.appendChild(l);let r=document.createElement("div");r.classList.add("close"),r.textContent="X",r.addEventListener("click",s),o.appendChild(r),e.forEach(e=>{let n=document.createElement("div");n.classList.add("fieldWrap");let l=document.createElement("label"),r=document.createElement("input");l.textContent=e+": ",r.setAttribute("type","text"),r.setAttribute("id",`${t}${e.replace(/\s+/g,"").toLowerCase()}`),n.appendChild(l),n.appendChild(r),o.appendChild(n)}),n.appendChild(o)}function s(){document.querySelector(".form").remove()}let p=o("Default Project"),f=l("List 1","The first list in the project");function E(e){u(["Name","Description","Due Date","Priority"],"item");let t=document.querySelector(".form"),n=document.createElement("button");n.classList.add("formSubmit"),n.textContent="Submit",n.addEventListener("click",()=>{!function(e){e.addItem(((e,t="",n="",o=0,l=!1)=>({name:e,description:t,duedate:n,priority:o,complete:l}))(document.getElementById("itemname").value,document.getElementById("itemdescription").value,document.getElementById("itemduedate").value,document.getElementById("itempriority").value)),m(document.getElementById("listwrap"),e.getList()),s()}(e)}),t.appendChild(n)}function y(){u(["Name","Description"],"project");let e=document.querySelector(".form"),t=document.createElement("button");t.classList.add("formSubmit"),t.textContent="Submit",t.addEventListener("click",()=>{let e=o(document.getElementById("projectname").value,document.getElementById("projectdescription").value);e.addList(l("List")),a(e),s()}),e.appendChild(t)}p.addList(f);let v=document.getElementById("lists"),h=document.createElement("button");h.textContent="Add new list item",h.addEventListener("click",()=>{null!==c()?document.querySelector(".form")||E(c()):alert("Please select a project to add to.")}),v.appendChild(h);let b=document.createElement("button");b.textContent="Remove project",b.addEventListener("click",()=>{null!==c()?(!function(e){document.getElementById("tab_"+e.name).remove();let t=document.getElementById("listwrap");for(;t.firstChild;)t.removeChild(t.lastChild)}(c()),d(null)):alert("Please select a project before removing.")}),v.appendChild(b),document.getElementById("newProject").addEventListener("click",()=>{document.querySelector(".form")||y()}),a(p),i(p),d(p)}]);