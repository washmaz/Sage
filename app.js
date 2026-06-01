// nav scroll state
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));

// mobile menu
const burger=document.getElementById('burger'),links=document.getElementById('navlinks');
burger.addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// reveal on scroll
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// faq accordion
document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{
  const item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-a').style.maxHeight=null});
  if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}
}));

// testimonial carousel
(function(){
  const track=document.getElementById('track'); if(!track) return;
  const slides=[...track.children], dots=document.getElementById('dots');
  let i=0, timer;
  slides.forEach((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Go to testimonial '+(n+1));b.onclick=()=>{i=n;render();reset();};dots.appendChild(b);});
  function render(){track.style.transform='translateX(-'+(i*100)+'%)';[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===i));}
  function next(){i=(i+1)%slides.length;render();}
  function prev(){i=(i-1+slides.length)%slides.length;render();}
  function reset(){clearInterval(timer);timer=setInterval(next,6000);}
  document.getElementById('cNext').onclick=()=>{next();reset();};
  document.getElementById('cPrev').onclick=()=>{prev();reset();};
  render();reset();
})();
