// MACA Santé — legacy UI compatibility layer.
// IMPORTANT: daily homepage editorial content is owned exclusively by maca-daily-editorial.js.
// This file must never inject or overwrite À la une, Vrai/Faux, Chiffre du jour or daily statistics.
(function(){
  // Navigation mobile only.
  const style=document.createElement('style');
  style.textContent=`
  @media(max-width:800px){
    .site-header{height:auto!important;min-height:66px;flex-wrap:wrap;padding:10px 18px 9px!important}
    .site-header nav{display:flex!important;position:static!important;order:3;width:100%;flex-direction:row!important;gap:8px!important;overflow-x:auto;padding:8px 0 0!important;background:transparent!important;border:0!important;box-shadow:none!important;scrollbar-width:none}
    .site-header nav::-webkit-scrollbar{display:none}
    .site-header nav a{font-size:12px!important;padding:8px 12px!important;border:1px solid var(--line)!important;border-radius:999px;background:#fff;white-space:nowrap}
    .menu{display:none!important}
    .intro{padding-top:42px!important}
  }`;
  document.head.appendChild(style);
  const navLinks=document.querySelectorAll('.site-header nav a');
  if(navLinks[0]) navLinks[0].textContent='Recherche';
})();
