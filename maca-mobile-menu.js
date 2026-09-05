(function(){
  'use strict';
  var header=document.querySelector('.site-header');
  if(!header)return;
  var button=header.querySelector('.menu');
  var nav=header.querySelector('nav');
  if(!button||!nav)return;

  button.setAttribute('aria-expanded','false');
  button.setAttribute('aria-controls','maca-mobile-nav');
  nav.id=nav.id||'maca-mobile-nav';

  function closeMenu(){nav.classList.remove('open');button.setAttribute('aria-expanded','false');}
  function toggleMenu(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));}
  button.addEventListener('click',toggleMenu);
  nav.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!header.contains(e.target))closeMenu();});

  if(!nav.querySelector('[data-maca-search]')){
    var search=document.createElement('a');
    search.href=location.pathname.endsWith('/fiches.html')?'#questions':'fiches.html#questions';
    search.textContent='Recherche';
    search.setAttribute('data-maca-search','');
    nav.insertBefore(search,nav.firstChild);
  }
  if(!nav.querySelector('[data-maca-all]')){
    var all=document.createElement('a');
    all.href='fiches.html';all.textContent='Toutes les fiches';all.setAttribute('data-maca-all','');
    var first=nav.querySelector('[data-maca-search]');
    first.insertAdjacentElement('afterend',all);
  }

  var installed=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  if(installed)return;
  var isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  var isSafari=isiOS&&/safari/i.test(navigator.userAgent)&&!/crios|fxios|edgios|opios/i.test(navigator.userAgent);
  var deferredPrompt=null;
  var installItem=null;

  function removeInstall(){if(installItem){installItem.remove();installItem=null;}}
  function showInstall(mode){
    if(installItem)return;
    installItem=document.createElement('button');
    installItem.type='button';
    installItem.className='maca-install-entry';
    installItem.innerHTML='<span aria-hidden="true">▣</span><span>Installer MACA sur ce téléphone</span>';
    nav.appendChild(installItem);
    installItem.addEventListener('click',async function(){
      if(mode==='native'&&deferredPrompt){
        deferredPrompt.prompt();
        try{await deferredPrompt.userChoice;}catch(e){}
        deferredPrompt=null;removeInstall();closeMenu();
      }else if(mode==='ios'){
        var old=nav.querySelector('.maca-ios-install-help');if(old){old.remove();return;}
        var help=document.createElement('div');help.className='maca-ios-install-help';help.textContent='Pour installer MACA : Partager → Sur l’écran d’accueil';
        installItem.insertAdjacentElement('afterend',help);
      }
    });
  }
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;showInstall('native');});
  window.addEventListener('appinstalled',function(){deferredPrompt=null;removeInstall();closeMenu();});
  if(isSafari)showInstall('ios');
})();
