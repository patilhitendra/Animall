import{c as l,b as x,j as e,N as c,m as o}from"./index-EeILKP9S.js";/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],p=l("bell",m);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]],y=l("circle-plus",u);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],b=l("house",f);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],v=l("list-checks",j);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],N=l("shopping-cart",g),k=[{key:"buy",to:"/buy",icon:N,labelKey:"nav_buy"},{key:"sell",to:"/sell",icon:y,labelKey:"nav_sell"},{key:"home",to:"/",icon:b,labelKey:"nav_home",center:!0},{key:"my_listings",to:"/my-listings",icon:v,labelKey:"nav_my_listings"},{key:"alerts",to:"/alerts",icon:p,labelKey:"nav_alerts",disabled:!0}];function w(){const{tr:a}=x();return e.jsx("nav",{role:"navigation","aria-label":a("nav_home"),className:"fixed bottom-0 left-0 right-0 z-40 glass border-t border-surface-200 shadow-glass safe-bottom",children:e.jsx("ul",{className:"flex items-end justify-around px-1 pt-1 pb-1",children:k.map(({key:n,to:i,icon:r,labelKey:t,center:d,disabled:h})=>h?e.jsx("li",{className:"flex-1",children:e.jsxs("div",{"aria-disabled":"true",className:"flex flex-col items-center py-2 px-1 text-surface-300",children:[e.jsx(r,{size:22}),e.jsx("span",{className:"text-[10px] mt-0.5 font-semibold",children:a(t)})]})},n):d?e.jsx("li",{className:"flex-1 flex justify-center",children:e.jsx(c,{to:i,end:!0,"aria-label":a(t),className:({isActive:s})=>`relative flex flex-col items-center -mt-5 ${s?"text-primary-700":"text-surface-500"}`,children:({isActive:s})=>e.jsxs(e.Fragment,{children:[e.jsx(o.div,{whileTap:{scale:.92},animate:s?{y:[-1,1,-1]}:{},transition:{repeat:s?1/0:0,duration:2.2},className:`w-14 h-14 rounded-full flex items-center justify-center
                                    bg-gradient-to-br from-brand-500 to-brand-600
                                    shadow-lg shadow-brand-500/40 border-4 border-surface-0`,children:e.jsx(r,{size:26,className:"text-white"})}),e.jsx("span",{className:"text-[10px] mt-1 font-bold",children:a(t)})]})})},n):e.jsx("li",{className:"flex-1",children:e.jsx(c,{to:i,"aria-label":a(t),className:({isActive:s})=>`relative flex flex-col items-center py-2 px-1 transition-colors min-h-touch justify-center
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-xl
                  ${s?"text-primary-700":"text-surface-500 hover:text-surface-700"}`,children:({isActive:s})=>e.jsxs(e.Fragment,{children:[s&&e.jsx(o.span,{layoutId:"nav-active",className:"absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-brand-500",transition:{type:"spring",stiffness:320,damping:26}}),e.jsx(r,{size:22}),e.jsx("span",{className:"text-[10px] mt-0.5 font-semibold",children:a(t)})]})})},n))})})}export{w as B};
