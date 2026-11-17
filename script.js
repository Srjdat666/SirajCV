(function(){
var root=document.documentElement;
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function put(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var els=[].slice.call(document.querySelectorAll('[data-en]'));
els.forEach(function(e){e.setAttribute('data-ar',e.textContent)});
var lb=document.getElementById('lang'),tb=document.getElementById('theme');
function setLang(l){
  root.lang=l;root.dir=l==='en'?'ltr':'rtl';
  els.forEach(function(e){e.textContent=e.getAttribute(l==='en'?'data-en':'data-ar')});
  lb.textContent=l==='en'?'العربية':'English';
  tb.setAttribute('aria-label',l==='en'?'Toggle theme':'تبديل المظهر');
  document.title=l==='en'?'Siraj Awidat | Software Engineer':'سراج أعويدات | مهندس برمجيات';
  put('lang',l);
}
lb.addEventListener('click',function(){setLang(root.lang==='ar'?'en':'ar')});
tb.addEventListener('click',function(){
  var cur=root.getAttribute('data-theme'),dark=cur?cur==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
  var n=dark?'light':'dark';root.setAttribute('data-theme',n);put('theme',n);
});
var t=get('theme');if(t==='dark'||t==='light')root.setAttribute('data-theme',t);
var l=get('lang');if(l==='en')setLang('en');
document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
  var n=document.getElementById(b.getAttribute('data-copy'));
  function sel(){var r=document.createRange();r.selectNodeContents(n);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  function ok(){var o=b.textContent;b.textContent=root.lang==='en'?'Copied':'تم النسخ';setTimeout(function(){b.textContent=b.getAttribute(root.lang==='en'?'data-en':'data-ar')},1400)}
  try{navigator.clipboard.writeText(n.textContent).then(ok,sel)}catch(e){sel()}
})});
if('IntersectionObserver' in window){
  var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(e){rv.observe(e)});
  var links={};document.querySelectorAll('nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  var act=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.toggle('on',k===e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(function(s){act.observe(s)});
}
setTimeout(function(){document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')})},2500);
})();
