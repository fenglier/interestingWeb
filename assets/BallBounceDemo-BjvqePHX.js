import{r as s,j as t}from"./index-BOwtVn3-.js";const h="_container_prkps_1",f="_ball_prkps_9",a={container:h,ball:f},j=()=>{const e=s.useRef(null),n=s.useRef(null);return s.useEffect(()=>{if(!e.current||!n.current)return;const c=e.current,d=n.current;let l=0,r=2;const u=c.getBoundingClientRect().width,o=()=>{l+=r;const x=d.clientWidth-u;(l<=0||l>=x)&&(r=-r),c.style.transform=`translate(${l}px,-50%)`,requestAnimationFrame(o)};o()},[]),t.jsx("div",{className:a.container,ref:n,children:t.jsx("div",{className:a.ball,ref:e})})};function i(e){const n={blockquote:"blockquote",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(n.h1,{children:"小球左右来回弹跳"}),`
`,t.jsx(n.p,{children:"clientWidth 是一个 DOM 元素的属性，它返回的是：dom 元素可视内容区域的宽度，不包括边框（border）、滚动条（scrollbar）、外边距（margin），但包括内边距（padding）"}),`
`,t.jsxs(n.blockquote,{children:[`
`,t.jsx(n.p,{children:"css中translateX和 left的区别"}),`
`,t.jsxs(n.ol,{children:[`
`,t.jsx(n.li,{children:"left 是定位属性，会改变元素的布局位置；"}),`
`,t.jsx(n.li,{children:"translateX 是变换属性，不影响布局，只是“视觉上的移动”。"}),`
`]}),`
`]}),`
`,t.jsx(n.h2,{children:"🎬 效果展示"}),`
`,t.jsx(j,{})]})}function p(e={}){const{wrapper:n}=e.components||{};return n?t.jsx(n,{...e,children:t.jsx(i,{...e})}):i(e)}export{p as default};
