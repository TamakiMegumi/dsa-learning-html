
/* ---------- C++ 轻量语法高亮（仅处理「块级代码」，行内 code 不动） ---------- */
const CPP_KW = new Set(("template typename class struct using namespace public private protected virtual "
  + "override const constexpr static inline if else for while do switch case default return break continue "
  + "new delete true false nullptr auto void this sizeof typedef explicit friend enum union try catch throw "
  + "noexcept unsigned signed static_cast").split(/\s+/));
const CPP_TYPE = new Set(("int long short char bool float double size_t string vector list map set pair "
  + "queue stack deque array T Node").split(/\s+/));
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function highlightCPP(src){
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#[^\n]*)|(\b0[xX][0-9a-fA-F]+\b|\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?[fFlLuU]*\b)|([A-Za-z_]\w*)|(\s+)|([^\s\w])/g;
  let out="", m;
  while((m = re.exec(src))){
    if(m[1])      out += '<span class="c-com">'+esc(m[1])+'</span>';
    else if(m[2]) out += '<span class="c-str">'+esc(m[2])+'</span>';
    else if(m[3]) out += '<span class="c-pre">'+esc(m[3])+'</span>';
    else if(m[4]) out += '<span class="c-num">'+esc(m[4])+'</span>';
    else if(m[5]){
      const id=m[5]; let i=re.lastIndex; while(i<src.length && (src[i]===' '||src[i]==='\t')) i++;
      let cls="c-var";
      if(CPP_KW.has(id)) cls="c-kw"; else if(CPP_TYPE.has(id)) cls="c-type"; else if(src[i]==='(') cls="c-fn";
      out += '<span class="'+cls+'">'+esc(id)+'</span>';
    }
    else if(m[6]) out += m[6];
    else if(m[7]) out += '<span class="c-pun">'+esc(m[7])+'</span>';
  }
  return out;
}

/* ---------- 动画控制器 Anim（支持代码联动） ---------- */
class Anim{
  constructor(o){
    this.cv=document.getElementById(o.canvas); this.ctx=this.cv.getContext('2d');
    this.steps=o.steps; this.draw=o.draw; this.codeId=o.codeId||null;
    this.i=0; this.timer=null; this.speed=o.speed||600;
    this.descEl=document.getElementById(o.desc);
    this.render();
  }
  render(){
    const s=this.steps[this.i]; if(!s) return;
    this.ctx.clearRect(0,0,this.cv.width,this.cv.height);
    if(this.draw) this.draw(this.ctx,this.i);
    if(this.codeId && s.line) setActiveLine(this.codeId, s.line);  // 仅高亮，不滚动页面
    if(this.descEl) this.descEl.textContent="步骤 "+(this.i+1)+"/"+this.steps.length+"："+s.desc;
  }
  play(){ if(this.timer) return; this.timer=setInterval(()=>{ if(this.i>=this.steps.length-1){this.pause();return;} this.i++; this.render(); },this.speed); }
  pause(){ clearInterval(this.timer); this.timer=null; }
  step(){ if(this.i<this.steps.length-1){ this.i++; this.render(); } }
  reset(){ this.i=0; this.render(); }
}
// 让代码块中某一行加深底色（IDE 单步观感）—— 只改样式，绝不让页面滚动
function setActiveLine(codeId, line){
  const el=document.getElementById(codeId); if(!el) return;
  el.querySelectorAll('.cl.active').forEach(n=>n.classList.remove('active'));
  const t=el.querySelector('.cl[data-line="'+line+'"]');
  if(t) t.classList.add('active');
}

/* ---------- 示例：冒泡排序动画（代码联动） ---------- */
(function buildBubble(){
  const init=[5,2,8,1,9,3,7,4,6,0];
  const steps=[]; let a=init.slice();
  const snap=(desc,line,ex)=>steps.push(Object.assign({desc,line,arr:a.slice()},ex||{}));
  snap("初始数组",5);
  for(let i=0;i<a.length-1;i++){
    for(let j=0;j<a.length-1-i;j++){
      snap("比较 a["+j+"] 与 a["+(j+1)+"]",9,{active:[j,j+1]});
      if(a[j]>a[j+1]){ const t=a[j]; a[j]=a[j+1]; a[j+1]=t;
        snap("a["+j+"] > a["+(j+1)+"]，交换",10,{active:[j,j+1],swapped:true}); }
    }
    snap("第 "+(i+1)+" 轮结束，尾部已就位",8);
  }
  snap("排序完成 ✓",14,{sorted:true});

  function drawBars(c,i){
    const s=steps[i], data=s.arr, n=data.length;
    const W=c.canvas.width,H=c.canvas.height;
    const bw=W/n*0.7, gap=W/n*0.3, max=Math.max.apply(null,data.concat([1]));
    for(let k=0;k<n;k++){
      const h=data[k]/max*(H-38), x=k*(bw+gap)+gap/2, y=H-18-h;
      let color='#3b82f6';
      if(s.sorted) color='#7ee787';
      else if(s.swapped && s.active && s.active.indexOf(k)>=0) color='#ff7b72';
      else if(s.active && s.active.indexOf(k)>=0) color='#22d3ee';
      c.fillStyle=color; c.fillRect(x,y,bw,h);
      c.fillStyle='#9fb0c3'; c.font='12px Consolas,monospace'; c.textAlign='center';
      c.fillText(data[k],x+bw/2,H-5);
    }
  }
  const anim=new Anim({canvas:"bs-cv",desc:"bs-desc",codeId:"bs-code",steps:steps,speed:520,draw:drawBars});
  document.getElementById("bs-play").onclick=()=>anim.play();
  document.getElementById("bs-pause").onclick=()=>anim.pause();
  document.getElementById("bs-step").onclick=()=>anim.step();
  document.getElementById("bs-reset").onclick=()=>anim.reset();
})();

/* ---------- 页面加载：块级代码逐行高亮 + LaTeX ---------- */
window.addEventListener('load',function(){
  // 仅对「块级代码」<pre><code class="cpp"> 做逐行高亮（行内 <code> 保持原样）
  document.querySelectorAll('pre code.cpp').forEach(el=>{
    const lines = el.textContent.split('\n');
    el.innerHTML = lines.map((ln,k)=>'<div class="cl" data-line="'+(k+1)+'">'+highlightCPP(ln)+'</div>').join('');
  });
  if(window.katex && window.renderMathInElement){
    renderMathInElement(document.body,{
      delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],
      throwOnError:false
    });
  }
});
