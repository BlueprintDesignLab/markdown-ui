import"../chunks/DsnmJJEf.js";import{d as te,p as ae,s as U,a as se,o as re,f as p,c as s,b as n,t as b,g as c,h as ne,i as a,j as o,k as r,l as g,m as B,n as ie,v as oe,w as le}from"../chunks/B0_GDqvu.js";import{i as k}from"../chunks/D95gXjRn.js";import{e as ve,i as de}from"../chunks/ChtMoJzX.js";import{B as ce,m as me,M as ue}from"../chunks/DTcOpzHi.js";function pe(S,w){o(w,[],!0)}function ge(S,w,y,i){w(),o(y,""),o(i,[],!0)}var we=p('<span class="status-indicator streaming svelte-154rnyw"></span> ',1),_e=p('<span class="status-indicator complete svelte-154rnyw"></span> ',1),fe=p('<span class="status-indicator idle svelte-154rnyw"></span> Ready to stream',1),he=p('<div class="empty-state svelte-154rnyw"><p class="svelte-154rnyw">Click "Start Stream" to begin the streaming demo...</p></div>'),ye=p('<p class="no-events svelte-154rnyw">No widget events yet. Interact with widgets during streaming!</p>'),be=p('<div class="event-item svelte-154rnyw"><div class="event-header svelte-154rnyw"><span class="event-id svelte-154rnyw"> </span> <span class="event-time svelte-154rnyw"> </span></div> <div class="event-value svelte-154rnyw"> </div></div>'),ke=p('<div class="streaming-container svelte-154rnyw"><div class="streaming-controls svelte-154rnyw"><button class="start-btn svelte-154rnyw"> </button> <button class="stop-btn svelte-154rnyw">Stop Stream</button> <button class="reset-btn svelte-154rnyw">Reset</button> <div class="streaming-status svelte-154rnyw"><!></div></div> <div class="demo-container svelte-154rnyw"><main class="demo-content svelte-154rnyw"><!></main> <aside class="demo-events svelte-154rnyw"><div class="events-header svelte-154rnyw"><h3 class="svelte-154rnyw">Stream Events</h3> <button class="clear-btn svelte-154rnyw">Clear</button></div> <div class="events-list svelte-154rnyw"><!> <!></div></aside></div></div>');function Ce(S,w){ae(w,!0);const y=new ce;y.use(me);let i=U(""),l=U(!1),m=U(se([]));const R=`# Streaming Markdown UI Demo
Welcome to the streaming demonstration! This page simulates how markdown content would be received from an LLM in real-time, with the UI updating as new content arrives.


Watch as interactive widgets are rendered as soon as their complete markup arrives:

### Selectors

\`\`\`markdown-ui-widget
{ "type": "select", "id": "streaming-env", "label": "Environment", "choices": ["development", "staging", "production"], "default": "development" }
\`\`\`

### Buttons

\`\`\`markdown-ui-widget
{ "type": "buttonGroup", "id": "mode", "label": "Test Mode", "choices": ["Quick", "Full", "Stress"], "default": "Quick" }
\`\`\`

### And more...

### Normal Code Blocks with Syntax Highlighting

Your other markdown works as expected.

\`\`\`javascript
// This code appears gradually as the stream progresses
function simulateStreaming(content, delay = 50) {
  let index = 0;
  return index
}
\`\`\`

## Streaming Behavior

- **Progressive Rendering**: UI elements render as soon as complete
- **Markdown Parsing**: Real-time markdown parsing and rendering
- **Event Handling**: Widget events work after streaming is complete

**Stream completed!** 🎉`;function F(e){const t=new Date().toLocaleTimeString();o(m,[{timestamp:t,...e},...a(m)].slice(0,50),!0)}async function W(){if(!a(l)){o(i,""),o(m,[],!0),o(l,!0);for(let e=0;e<R.length;e++){o(i,R.slice(0,e+1),!0);const t=Math.random()*3+1;if(await new Promise(v=>setTimeout(v,t)),!a(l))break}o(l,!1)}}function D(){o(l,!1)}re(()=>{W()});var x=ke(),M=s(x),_=s(M);_.__click=W;var G=s(_,!0);r(_);var E=n(_,2);E.__click=D;var L=n(E,2);L.__click=[ge,D,i,m];var N=n(L,2),J=s(N);{var O=e=>{var t=we(),v=n(B(t));b(()=>g(v,` Streaming... (${a(i).length??""} characters)`)),c(e,t)},Y=e=>{var t=ie(),v=B(t);{var f=d=>{var u=_e(),T=n(B(u));b(()=>g(T,` Stream complete (${a(i).length??""} characters)`)),c(d,u)},h=d=>{var u=fe();le(),c(d,u)};k(v,d=>{a(i)?d(f):d(h,!1)},!0)}c(e,t)};k(J,e=>{a(l)?e(O):e(Y,!1)})}r(N),r(M);var P=n(M,2),I=s(P),q=s(I);{var z=e=>{{let t=oe(()=>y.parse(a(i)));ue(e,{get html(){return a(t)},onwidgetevent:F})}},K=e=>{var t=he();c(e,t)};k(q,e=>{a(i)?e(z):e(K,!1)})}r(I);var j=n(I,2),C=s(j),V=n(s(C),2);V.__click=[pe,m],r(C);var H=n(C,2),Q=s(H);{var X=e=>{var t=ye();c(e,t)};k(Q,e=>{a(m).length===0&&e(X)})}var Z=n(Q,2);ve(Z,17,()=>a(m),de,(e,t)=>{var v=be(),f=s(v),h=s(f),d=s(h);r(h);var u=n(h,2),T=s(u,!0);r(u),r(f);var A=n(f,2),$=s(A,!0);r(A),r(v),b(ee=>{g(d,`ID: ${a(t).id??""}`),g(T,a(t).timestamp),g($,ee)},[()=>JSON.stringify(a(t).value,null,2)]),c(e,v)}),r(H),r(j),r(P),r(x),b(()=>{_.disabled=a(l),g(G,a(l)?"Streaming...":"Start Stream"),E.disabled=!a(l)}),c(S,x),ne()}te(["click"]);export{Ce as component};
