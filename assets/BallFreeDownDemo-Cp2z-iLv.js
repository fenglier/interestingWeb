import{r as l,j as e}from"./index-DictU1ML.js";const w="_container_1ityu_1",M="_ball_1ityu_9",_="_ground_1ityu_16",h={container:w,ball:M,ground:_},C=()=>{let t=!1,n,s=0,c=0,b=.5,j=.7,x=200;const u=l.useRef(null),r=l.useRef(null),a=l.useRef(null),d=()=>{if(!r.current)return;function o(){c+=b,s+=c,!(s>=x&&(s=x,c=-c*j,Math.abs(c)<1))&&(r.current&&(r.current.style.top=s+"px"),requestAnimationFrame(o))}o()};l.useEffect(()=>{d()},[]);const y=o=>{if(o.button===0){if(!r.current)return;t=!0,c=0;const i=r.current.getBoundingClientRect();n=o.clientY-i.top-i.height/2,r.current.style.cursor="grabbing",window.addEventListener("mousemove",f),window.addEventListener("mouseup",g)}},f=o=>{var i;if(t){if(!r.current||!u.current||!a.current)return;const m=r.current.getBoundingClientRect(),p=u.current.getBoundingClientRect(),v=(i=a.current)==null?void 0:i.getBoundingClientRect();o.clientY-(m.height/2+n)<p.top?(s=0,t=!1):o.clientY+(m.height/2-n)>v.top?t=!1:s=o.clientY-p.top-n-m.height/2,r.current.style.top=`${s}px`}},g=o=>{if(o.button===0){if(!r.current)return;t=!1,r.current.style.cursor="grab",c=0,window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",g),d()}};return e.jsx(e.Fragment,{children:e.jsxs("div",{ref:u,className:h.container,id:"container",children:[e.jsx("div",{ref:r,id:"ball",onMouseMove:f,onMouseUp:g,onMouseDown:y,className:h.ball,onClick:d}),e.jsx("div",{id:"ground",ref:a,className:h.ground})]})})};function R(t){const n={blockquote:"blockquote",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"小球自由落体"}),`
`,e.jsx(n.p,{children:"为什么“useRef 获取 DOM 引用（不要每次都 document.getElementById）”"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:`避免跨组件、全局副作用污染\r
document.getElementById 是全局查找，如果你的页面上有多个同 ID 的元素（或多个组件都叫 ball），你很可能操作到了错误的元素。`}),`
`,e.jsx(n.li,{children:`useRef 更高效，也更符合 React 思想\r
useRef 是 React 提供的方式，用于在组件中获取并持久保存某个 DOM 元素的引用，而不是每次都重新查找。`}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"🎬 效果展示"}),`
`,e.jsx(C,{})]})}function B(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(R,{...t})}):R(t)}export{B as default};
