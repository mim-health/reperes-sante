/* Shared navigation only; medical content and Assistant behavior stay independent. */
(function(){'use strict';
 const sidebar=document.getElementById('ms-sidebar');if(!sidebar)return;
 const toggle=document.querySelector('.ms-toggle'),close=document.querySelector('.ms-close'),backdrop=document.querySelector('.ms-backdrop');let previous=null;
 const mobile=window.matchMedia('(max-width:760px)');
 function setMenu(open,restore=true){sidebar.dataset.open=String(open);toggle.setAttribute('aria-expanded',String(open));backdrop.hidden=!open;document.body.classList.toggle('ms-menu-open',open);if(open){previous=document.activeElement;close.focus();}else if(restore&&previous){previous.focus();previous=null;}}
 toggle.addEventListener('click',()=>setMenu(sidebar.dataset.open!=='true'));close.addEventListener('click',()=>setMenu(false));backdrop.addEventListener('click',()=>setMenu(false));
 sidebar.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false,false);});
 document.addEventListener('keydown',event=>{if(sidebar.dataset.open!=='true')return;if(event.key==='Escape'){event.preventDefault();setMenu(false);}if(event.key==='Tab'){const nodes=[...sidebar.querySelectorAll('a,button')].filter(n=>n.getClientRects().length),first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
 mobile.addEventListener('change',()=>{if(!mobile.matches)setMenu(false,false);});
 const current=location.pathname.split('/').pop();sidebar.querySelectorAll('.ms-secondary a').forEach(a=>{if(!a.hash&&a.pathname.split('/').pop()===current)a.setAttribute('aria-current','page');});
})();
