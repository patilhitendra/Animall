import{c as a,z as i}from"./index-EeILKP9S.js";import{c as r,f as d}from"./formatters-7Fn3g0Ru.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],k=a("clock",p);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],x=a("map-pin",y);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],v=a("share-2",h),w=()=>typeof navigator<"u"&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),_=(t,{tr:e}={})=>{const o=r(t);if(!o)return;if(w()){window.location.href=`tel:${o}`;return}const n=d(t),c=async()=>{try{await navigator.clipboard.writeText(o),i.success(e?e("phone_copied"):"Number copied")}catch{}};i(g=>`${n} — ${e?e("tap_to_copy"):"tap to copy"}`,{duration:4e3,icon:"📞",ariaProps:{role:"status","aria-live":"polite"}}),c()},b=(t,e="")=>{const o=r(t).replace("+","");if(!o)return;const n=`https://wa.me/${o}${e?`?text=${encodeURIComponent(e)}`:""}`;window.open(n,"_blank","noopener,noreferrer")},P=async({title:t,text:e,url:o,tr:n})=>{const c=o||window.location.href;if(navigator.share)try{await navigator.share({title:t,text:e,url:c});return}catch{}try{await navigator.clipboard.writeText(c),i.success(n?n("link_copied"):"Link copied")}catch{i(c,{duration:4e3})}},s="animall_wishlist",l=()=>{try{return JSON.parse(localStorage.getItem(s)||"[]")}catch{return[]}},u=t=>{localStorage.setItem(s,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("wishlist:change",{detail:t}))},$=t=>l().includes(t),E=t=>{const e=l(),o=e.indexOf(t);return o>=0?e.splice(o,1):e.push(t),u(e),o<0},M=t=>{const e=o=>t(o.detail);return window.addEventListener("wishlist:change",e),()=>window.removeEventListener("wishlist:change",e)};export{k as C,x as M,v as S,P as a,_ as c,$ as i,b as o,M as s,E as t};
