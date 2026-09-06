(function(){
  'use strict';
  if(document.getElementById('maca-home-actions'))return;

  var footer=document.querySelector('footer');
  if(!footer)return;

  var style=document.createElement('style');
  style.textContent='.maca-home-actions{width:min(1060px,calc(100% - 32px));margin:0 auto 28px;padding:18px;border:1px solid #d9dfd3;border-radius:18px;background:#fffdf7;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}.maca-home-action{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:11px 16px;border:1px solid #cfd8cc;border-radius:999px;background:#fff;color:#46513e;text-decoration:none;font:700 14px/1.2 "DM Sans",sans-serif;cursor:pointer}.maca-home-action.primary{background:#46513e;color:#fff;border-color:#46513e}.maca-home-install-help{flex-basis:100%;margin:2px 0 0;text-align:center;color:#66745a;font:500 13px/1.4 "DM Sans",sans-serif}@media(max-width:640px){.maca-home-actions{align-items:stretch}.maca-home-action{width:100%}}';
  document.head.appendChild(style);

  var wrap=document.createElement('section');
  wrap.id='maca-home-actions';
  wrap.className='maca-home-actions';
  wrap.setAttribute('aria-label','Installer MACA et suivre MACA Santé');

  var install=document.createElement('button');
  install.type='button';
  install.className='maca-home-action primary';
  install.textContent='Installer MACA sur ce téléphone';

  var instagram=document.createElement('a');
  instagram.className='maca-home-action';
  instagram.href='https://www.instagram.com/macasante_fr/';
  instagram.target='_blank';
  instagram.rel='noopener';
  instagram.textContent='Suivez-nous sur Instagram';

  wrap.appendChild(install);
  wrap.appendChild(instagram);
  footer.parentNode.insertBefore(wrap,footer);

  var standalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  if(standalone){install.hidden=true;return;}

  var deferredPrompt=null;
  function setHelp(text){
    var old=wrap.querySelector('.maca-home-install-help');
    if(old)old.remove();
    var help=document.createElement('p');
    help.className='maca-home-install-help';
    help.textContent=text;
    wrap.appendChild(help);
  }

  window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault();
    deferredPrompt=e;
  });
  window.addEventListener('appinstalled',function(){
    deferredPrompt=null;
    install.hidden=true;
    var help=wrap.querySelector('.maca-home-install-help');
    if(help)help.remove();
  });

  install.addEventListener('click',async function(){
    if(deferredPrompt){
      deferredPrompt.prompt();
      try{await deferredPrompt.userChoice;}catch(e){}
      deferredPrompt=null;
      return;
    }

    var ua=navigator.userAgent||'';
    var isiOS=/iphone|ipad|ipod/i.test(ua);
    if(isiOS){
      setHelp('Pour installer MACA : Partager → Sur l’écran d’accueil');
    }else{
      setHelp('Pour installer MACA, ouvrez le menu du navigateur puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».');
    }
  });
})();
