/* ── CURSOR ── */
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;

if(cur && curR){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;
    my=e.clientY;
    cur.style.left=mx+'px';
    cur.style.top=my+'px';
  });

  (function loop(){
    rx+=(mx-rx)*.1;
    ry+=(my-ry)*.1;
    curR.style.left=rx+'px';
    curR.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
}

/* ── NAV STUCK ── */
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('mainNav');
  if(nav){
    nav.classList.toggle('stuck',scrollY>60);
  }
});

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in');
}),{threshold:.07,rootMargin:'0px 0px -20px 0px'});

document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* ── HERO ENTRANCE ── */
document.addEventListener('DOMContentLoaded',()=>{
  ['.hero-kicker','.hero-hl','.hero-tagline','.hero-pain-bar','.hero-actions','.hero-meta'].forEach((s,i)=>{
    const el=document.querySelector(s);
    if(!el)return;
    el.style.cssText=`opacity:0;transform:translateY(20px);transition:opacity .8s ease ${i*.13}s,transform .8s ease ${i*.13}s`;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      el.style.opacity='1';
      el.style.transform='translateY(0)';
    }));
  });

  document.querySelectorAll('.sc-cat-fill').forEach(fill=>{
    const pct=fill.getAttribute('data-pct');
    setTimeout(()=>{
      fill.style.width=pct+'%';
    },300);
  });
});

/* Blog template interactions */
(function(){
  const blogMain=document.querySelector('.blog-main');
  if(!blogMain) return;

  let activeCategory='all';

  window.filter=function(category,button){
    activeCategory=(category||'all').toLowerCase();
    document.querySelectorAll('.filter-btn').forEach(btn=>btn.classList.remove('is-active'));
    if(button) button.classList.add('is-active');
    const value=(document.getElementById('blogSearch')?.value||'').trim().toLowerCase();
    applyFilters(value);
  }

  window.search=function(value){
    applyFilters((value||'').trim().toLowerCase());
  }

  window.applyFilters=function(value){
    document.querySelectorAll('#postGrid .post-card').forEach(card=>{
      const cat=(card.dataset.category||'').toLowerCase();
      const text=((card.dataset.title||'')+' '+(card.dataset.description||'')).toLowerCase();
      const catOk=activeCategory==='all' || cat===activeCategory;
      const textOk=!value || text.includes(value);
      card.style.display=(catOk && textOk)?'block':'none';
    });
  }

  window.submitSidebar=function(event){
    event.preventDefault();
    const email=document.getElementById('sc-email');
    if(!email) return;
    email.value='';
    alert('Thanks — you are on the list.');
  }
})();
