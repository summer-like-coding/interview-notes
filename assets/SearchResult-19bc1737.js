import{e as D,u as B,d as M,g as T,j as x,l as U,n as G,t as J,r as C,a as b,m as K,w as A,h as t,R as P,p as N,q as X,v as Y,x as Z,y as _,z as ee,S as te,s as se,A as ae,B as le,C as re,D as ue,E as oe,F as ne}from"./app-f2fbd596.js";const ce=()=>{const l=new Worker(`/interview-notes/${D.worker}`,{}),o=[];return l.addEventListener("message",({data:a})=>{const{resolve:p}=o.shift();p(a)}),{search:(a,p,d)=>new Promise((u,h)=>{l.postMessage({query:a,locale:p,options:d}),o.push({resolve:u,reject:h})}),terminate:()=>{l.terminate(),o.forEach(({reject:a})=>a(new Error("Worker has been terminated.")))}}},ie="search-pro-result-history",v=B(ie,[]),ve=()=>{const{resultHistoryCount:l}=D,o=l>0;return{enabled:o,resultHistory:v,addResultHistory:a=>{o&&(v.value.length<l?v.value=[a,...v.value]:v.value=[a,...v.value.slice(0,l-1)])},removeResultHistory:a=>{v.value=[...v.value.slice(0,a),...v.value.slice(a+1)]}}},pe=l=>{const o=te(),a=x(),{search:p,terminate:d}=ce(),u=C(!1),h=se([]),R=oe(y=>{u.value=!0,y?p(y,a.value,o).then(g=>{h.value=g,u.value=!1}):(h.value=[],u.value=!1)},D.delay);return A([l,a],()=>R(l.value),{immediate:!0}),{searching:u,results:h,terminate:d}};var de=M({name:"SearchResult",props:{query:{type:String,required:!0}},emits:["close","updateQuery"],setup(l,{emit:o}){const a=ae(),p=T(),d=x(),u=U(G),{addQueryHistory:h}=le(),{enabled:R,resultHistory:y,addResultHistory:g,removeResultHistory:F}=ve(),w=J(l,"query"),{results:m,searching:Q}=pe(w),c=C(0),r=C(0),S=b(()=>y.value.length>0),$=b(()=>m.value.length>0),k=b(()=>m.value[c.value]||null),H=e=>{const[s,n]=e.split("#");return p.resolve({name:s,hash:`#${n}`}).href},I=()=>{c.value=c.value>0?c.value-1:m.value.length-1,r.value=k.value.contents.length-1},O=()=>{c.value=c.value<m.value.length-1?c.value+1:0,r.value=0},V=()=>{r.value<k.value.contents.length-1?r.value=r.value+1:O()},W=()=>{r.value>0?r.value=r.value-1:I()},E=e=>e.map(s=>ne(s)?s:t(s[0],s[1])),L=e=>{if(e.type==="custom"){const s=re[e.index]||"$content",[n,f=""]=ue(s)?s[d.value].split("$content"):s.split("$content");return E([n,...e.display,f])}return E(e.display)},q=()=>{c.value=0,r.value=0,o("updateQuery",""),o("close")};return K("keydown",e=>{if($.value){if(e.key==="ArrowUp")W();else if(e.key==="ArrowDown")V();else if(e.key==="Enter"){const s=k.value.contents[r.value],n=H(s.id);a.value.path!==n&&(h(l.query),g(s),p.push(n),q())}}}),A([c,r],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["search-pro-result",{empty:w.value?!$.value:!S.value}],id:"search-pro-results"},w.value===""?S.value?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},u.value.history),y.value.map((e,s)=>t(P,{to:H(e.id),class:["search-pro-result-item",{active:r.value===s}],onClick:()=>{q()}},()=>[t(N,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[e.type==="content"&&e.header?t("div",{class:"content-header"},e.header):null,t("div",L(e))]),t("button",{class:"search-pro-close-icon",onClick:n=>{n.preventDefault(),n.stopPropagation(),F(s)}},t(X))]))])):R?u.value.emptyHistory:u.value.emptyResult:Q.value?t(Y,{hint:u.value.searching}):$.value?t("ul",{class:"search-pro-result-list"},m.value.map(({title:e,contents:s},n)=>{const f=c.value===n;return t("li",{class:["search-pro-result-list-item",{active:f}]},[t("div",{class:"search-pro-result-title"},e||"Documentation"),s.map((i,z)=>{const j=f&&r.value===z;return t(P,{to:H(i.id),class:["search-pro-result-item",{active:j,"aria-selected":j}],onClick:()=>{h(l.query),g(i),q()}},()=>[i.type==="content"?null:t(i.type==="title"?Z:i.type==="heading"?_:ee,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[i.type==="content"&&i.header?t("div",{class:"content-header"},i.header):null,t("div",L(i))])])})])})):u.value.emptyResult)}});export{de as default};