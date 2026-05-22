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

  let currentCat='all';

  window.filter=function(cat,btn){
    currentCat=cat;
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('on'));
    if(btn) btn.classList.add('on');
    applyFilters((document.querySelector('.search-input')?.value)||'');
  };

  window.search=function(val){ applyFilters(val||''); };

  window.applyFilters=function(searchVal){
    const q=String(searchVal).toLowerCase().trim();
    const cards=document.querySelectorAll('.post-card,.fp-side-card');
    let visible=0;
    cards.forEach(c=>{
      const catMatch=currentCat==='all'||c.dataset.cat===currentCat;
      const titleMatch=!q||(c.dataset.title||'').toLowerCase().includes(q);
      const show=catMatch&&titleMatch;
      c.classList.toggle('hidden',!show);
      if(show) visible++;
    });
    const fp=document.querySelector('.fp-card');
    if(fp){
      const catMatch=currentCat==='all'||fp.dataset.cat===currentCat;
      const titleMatch=!q||(fp.dataset.title||'').toLowerCase().includes(q);
      const row=document.getElementById('featuredRow');
      if(row) row.style.display=(catMatch&&titleMatch)?'grid':'none';
    }
    const nr=document.getElementById('noResults');
    if(nr) nr.classList.toggle('show',visible===0);
  };

  window.submitSidebar=function(event){
    if(event && typeof event.preventDefault==='function') event.preventDefault();
    const email=document.getElementById('sidebarEmail');
    if(!email || !email.value.trim()){
      alert('Please enter your email.');
      return;
    }
    const form=document.querySelector('.sc-email-form');
    if(form) form.innerHTML='<div style="font-family:var(--M);font-size:11px;color:var(--gold);padding:10px 0;">✓ On its way to your inbox.</div>';
  };
})();
