
(function(){
  var t=localStorage.getItem('necx-theme');
  if(t){document.documentElement.setAttribute('data-theme',t);}
  else if(window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark');}
})();
function toggleTheme(){
  var el=document.documentElement;
  var n=el.getAttribute('data-theme')==='dark'?'light':'dark';
  el.setAttribute('data-theme',n);localStorage.setItem('necx-theme',n);
}
function toggleNav(){document.body.classList.toggle('nav-open');}
function filterNav(q){
  q=(q||'').toLowerCase();
  document.querySelectorAll('.nav-item').forEach(function(a){
    var hit=a.getAttribute('data-search').indexOf(q)>-1;a.style.display=hit?'':'none';
  });
  document.querySelectorAll('.nav-group').forEach(function(g){
    var any=[].some.call(g.querySelectorAll('.nav-item'),function(a){return a.style.display!=='none';});
    g.style.display=any?'':'none';
  });
}
function filterCards(q){
  q=(q||'').toLowerCase();var shown=0;
  document.querySelectorAll('.card').forEach(function(c){
    var hit=c.getAttribute('data-search').indexOf(q)>-1;c.style.display=hit?'':'none';if(hit)shown++;
  });
  document.querySelectorAll('.cat').forEach(function(cat){
    var any=[].some.call(cat.querySelectorAll('.card'),function(c){return c.style.display!=='none';});
    cat.style.display=any?'':'none';
  });
  var nr=document.getElementById('noresults');if(nr)nr.hidden=shown>0;
}
/* active TOC on scroll */
document.addEventListener('DOMContentLoaded',function(){
  var links=[].slice.call(document.querySelectorAll('.toc-nav a'));
  if(!links.length)return;
  var map={};links.forEach(function(l){var id=l.getAttribute('href').slice(1);var el=document.getElementById(id);if(el)map[id]=l;});
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.remove('active');});
        if(map[e.target.id])map[e.target.id].classList.add('active');
      }
    });
  },{rootMargin:'-70px 0px -75% 0px'});
  Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)obs.observe(el);});
});
