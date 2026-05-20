const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;
  my=e.clientY;
  cur.style.left=mx+'px';
  cur.style.top=my+'px';
});

(function a(){
  rx+=(mx-rx)*.1;
  ry+=(my-ry)*.1;
  curR.style.left=rx+'px';
  curR.style.top=ry+'px';
  requestAnimationFrame(a);
})();

document.querySelectorAll('a,button,.layer,.bs,.d-card,.bc,.blog-sm,.tc,.tenet,.ar,.as-step,.f-opt').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.classList.add('h');
    curR.classList.add('h');
  });

  el.addEventListener('mouseleave',()=>{
    cur.classList.remove('h');
    curR.classList.remove('h');
  });
});

window.addEventListener('scroll',()=>{
  document.getElementById('mainnav').classList.toggle('stuck',scrollY>48);
});

const ro=new IntersectionObserver(es=>
  es.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('in');
  }),
{
  threshold:.06,
  rootMargin:'0px 0px -20px 0px'
});

document.querySelectorAll('.rv').forEach(r=>ro.observe(r));

document.addEventListener('DOMContentLoaded',()=>{
  ['.hero-kicker','.hero-hl','.hero-statement','.hero-cta-row','.hero-proof'].forEach((s,i)=>{
    const el=document.querySelector(s);
    if(!el)return;

    el.style.cssText=`opacity:0;transform:translateY(20px);transition:opacity .75s ease ${i*.1}s,transform .75s ease ${i*.1}s`;

    requestAnimationFrame(()=>
      requestAnimationFrame(()=>{
        el.style.opacity='1';
        el.style.transform='translateY(0)';
      })
    );
  });
});

/* Assessment form */

let ans={q1:null,q2:null,q3:null,q4:null};

function pick(el,q,v){
  el.closest('.f-opts').querySelectorAll('.f-opt').forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel');
  ans[q]=v;
}

function updateProg(s){
  document.querySelectorAll('.fp-pip').forEach((p,i)=>{
    p.classList.remove('done','cur');

    if(i<s-1)p.classList.add('done');
    else if(i===s-1)p.classList.add('cur');
  });

  document.getElementById('fpLbl').textContent=`Step ${s} of 5`;
}

function go(f,t){
  document.getElementById('s'+f).classList.remove('on');
  document.getElementById('s'+t).classList.add('on');

  updateProg(t);
}

function submitAssess(){

  const email=document.getElementById('rEmail').value.trim();

  if(!email){
    alert('Please enter your email.');
    return;
  }

  const m={a:25,b:15,c:7,d:0};

  const score=Object.values(ans).reduce((t,v)=>t+(v?m[v]||0:0),0);

  const states=[
    'AI-Skeptic Laggard',
    'Velocity Victim',
    'AI-Powered Chaos Scaler',
    'Amplified Stuck Optimizer',
    'Data-Overwhelmed Strategist'
  ];

  const state=
    score>=85?states[4]:
    score>=65?states[3]:
    score>=40?states[2]:
    score>=20?states[1]:
    states[0];

  const insights=[];

  if(!ans.q1||ans.q1==='c'||ans.q1==='d')
    insights.push({
      l:'Gap L1',
      t:'<strong>Firmographic definition is too loose.</strong> Specify revenue range, headcount band, ACV ceiling, and sales motion.'
    });

  if(!ans.q2||ans.q2==='c'||ans.q2==='d')
    insights.push({
      l:'Gap L2',
      t:'<strong>Technographic signals need upgrading.</strong> Track migration velocity and AI adoption patterns — not static tool lists.'
    });

  if(!ans.q3||ans.q3==='c'||ans.q3==='d')
    insights.push({
      l:'Gap L3',
      t:'<strong>Psychographic layer is the primary gap.</strong> You\'re targeting demographics, not buyer states.'
    });

  if(!ans.q4||ans.q4==='c'||ans.q4==='d')
    insights.push({
      l:'Gap L4',
      t:'<strong>Timing is your highest-leverage fix.</strong> Trigger-based outreach changes this immediately.'
    });

  document.querySelectorAll('.fs').forEach(s=>s.classList.remove('on'));

  document.getElementById('fp').style.display='none';
  document.getElementById('fpLbl').style.display='none';

  document.getElementById('rScore').textContent=score+'/100';
  document.getElementById('rState').textContent=state;

  document.getElementById('rItems').innerHTML=
    insights.slice(0,3).map(i=>
      `<div class="res-item"><div class="ri-l">${i.l}</div><div class="ri-t">${i.t}</div></div>`
    ).join('');

  document.getElementById('fResult').classList.add('on');
}

function restartAssess(){

  ans={q1:null,q2:null,q3:null,q4:null};

  document.getElementById('fResult').classList.remove('on');

  document.getElementById('fp').style.display='flex';
  document.getElementById('fpLbl').style.display='block';

  document.querySelectorAll('.f-opt').forEach(o=>o.classList.remove('sel'));

  ['rName','rEmail','rCo'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value='';
  });

  go(0,1);

  updateProg(1);

  document.getElementById('s1').classList.add('on');
}

function submitFinal(){

  const email=document.getElementById('fEmail').value.trim();

  if(!email){
    alert('Please enter your email.');
    return;
  }

  document.getElementById('finalForm').style.display='none';

  document.getElementById('fSuccess').classList.add('on');

}

/* ── SCORE CARD BAR ANIMATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.sc-cat-fill');

  fills.forEach(fill => {
    const pct = fill.getAttribute('data-pct') || '0';
    setTimeout(() => {
      fill.style.width = pct + '%';
    }, 500);
  });
});
