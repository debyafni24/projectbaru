/* Skrip halaman ucapan. Ubah nama, pengirim, tanggal, doa & alasan di bagian CFG / WISHES / REASONS. */
/* ===== Ubah bagian ini sesuai kebutuhan ===== */
var CFG={
  nama:'Bu Rini Melati',
  dari:'Deby Afni Nur Azizah',
  tanggal:'10 Oktober 2026'
};
var WISHES=[
  'Barakallah fii umrik, Bu. Semoga Allah memberkahi setiap detik usia Ibu.',
  'Semoga Allah senantiasa memberi Ibu kesehatan lahir dan batin.',
  'Semoga rezeki Ibu halal, lapang, dan penuh berkah.',
  'Semoga ilmu yang Ibu ajarkan menjadi amal jariyah yang tak pernah putus.',
  'Semoga Allah mudahkan setiap urusan Ibu dan lapangkan setiap kesulitan.',
  'Semoga keluarga Ibu selalu dalam lindungan dan kasih sayang Allah.',
  'Semoga hati Ibu selalu tenang dan dipenuhi rasa syukur.',
  'Semoga Allah pertemukan Ibu dengan kebahagiaan di dunia dan akhirat.',
  'Semoga Ibu selalu dikelilingi orang-orang baik yang menyayangi Ibu.',
  'Semoga di usia yang baru, Ibu semakin dekat dengan ridha-Nya. Aamiin.'
];
var REASONS=[
  'Terima kasih sudah sabar menjelaskan sampai aku benar-benar paham.',
  'Terima kasih sudah percaya aku bisa, saat aku sendiri ragu.',
  'Terima kasih untuk senyum Ibu yang membuat suasana belajar terasa hangat.',
  'Terima kasih sudah mendengarkan, bukan hanya mengajar.',
  'Terima kasih untuk nasihat yang baru kumengerti belakangan.',
  'Terima kasih sudah jadi teladan lewat sikap, bukan hanya kata-kata.'
];
/* ============================================= */

var $=function(id){return document.getElementById(id)};
['nm','nm2'].forEach(function(i){$(i).textContent=CFG.nama});
$('ltHead').textContent=CFG.nama.replace(/^Bu /,'Ibu ')+' yang kusayangi,';
$('from').textContent='Dengan hormat dan sayang, '+CFG.dari;
$('endMsg').textContent='Barakallah fii umrik, '+CFG.nama+'. Terima kasih untuk segalanya. Salam sayang, '+CFG.dari+'.';
if(CFG.tanggal){$('eyDate').textContent=CFG.tanggal;$('ltDate').textContent=CFG.tanggal}

/* kelopak melayang */
var pc=$('petals'),px=pc.getContext('2d'),P=[],W,H;
function size(){W=pc.width=fx.width=innerWidth;H=pc.height=fx.height=innerHeight}
var fx=$('fx'),fxc=fx.getContext('2d');size();addEventListener('resize',size);
var cols=['#f2799c','#ff9bb8','#ffd3e0','#f5c26b'];
for(var i=0;i<26;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:3+Math.random()*5,s:.2+Math.random()*.5,d:Math.random()*6,c:cols[i%4]});
function petals(){px.clearRect(0,0,W,H);P.forEach(function(p){p.y+=p.s;p.d+=.01;p.x+=Math.sin(p.d)*.4;if(p.y>H+10){p.y=-10;p.x=Math.random()*W}px.globalAlpha=.4;px.fillStyle=p.c;px.beginPath();px.ellipse(p.x,p.y,p.r,p.r*.6,p.d,0,6.3);px.fill()});requestAnimationFrame(petals)}
var petalsOn=false;function startPetals(){if(petalsOn)return;petalsOn=true;petals()}

/* efek: ledakan bunga & konfeti */
var F=[],running=false;
var SPX={};
function spriteOf(c){if(SPX[c])return SPX[c];var s=document.createElement('canvas');s.width=s.height=128;var q=s.getContext('2d'),r=48,m=64;q.fillStyle=c;for(var k=0;k<5;k++){var a=k*1.2566;q.beginPath();q.arc(m+Math.cos(a)*r*.7,m+Math.sin(a)*r*.7,r*.55,0,6.3);q.fill()}q.fillStyle='#f5c26b';q.beginPath();q.arc(m,m,r*.35,0,6.3);q.fill();return SPX[c]=s}
function flowerAt(x,y,r,c){var d=r*128/48;fxc.drawImage(spriteOf(c),x-d/2,y-d/2,d,d)}
function loop(){fxc.clearRect(0,0,W,H);F=F.filter(function(f){return f.life>0});F.forEach(function(f){f.life--;f.x+=f.vx;f.y+=f.vy;f.vy+=f.g;f.a+=f.va;fxc.globalAlpha=Math.min(1,f.life/30);if(f.t==='f'){flowerAt(f.x,f.y,f.r*Math.min(1,(f.max-f.life)/14+.2),f.c)}else{fxc.save();fxc.translate(f.x,f.y);fxc.rotate(f.a);fxc.fillStyle=f.c;fxc.fillRect(-f.r,-f.r/2,f.r*2,f.r);fxc.restore()}});fxc.globalAlpha=1;if(F.length)requestAnimationFrame(loop);else running=false}
function go(){if(!running){running=true;requestAnimationFrame(loop)}}
function burstFlowers(){var big=['#f2799c','#ff9bb8','#ffd3e0','#f5c26b','#7aa7ff','#ffd35c'];for(var i=0;i<45;i++){var x=Math.random()*W,y=Math.random()*H,l=70+Math.random()*50;F.push({t:'f',x:x,y:y,vx:(x-W/2)*.004,vy:(y-H/2)*.004,g:0,a:0,va:0,r:34+Math.random()*50,c:big[i%6],life:l,max:l})}go()}
function confetti(){for(var i=0;i<120;i++){var l=120+Math.random()*80;F.push({t:'c',x:W/2,y:H*.45,vx:(Math.random()-.5)*12,vy:-Math.random()*13-3,g:.28,a:0,va:(Math.random()-.5)*.4,r:4+Math.random()*4,c:cols[i%4],life:l,max:l})}go()}

/* alur gerbang */
var opened=false;
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
var fontsP=(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve());
Promise.race([fontsP,wait(1500)]).then(function(){document.documentElement.classList.add('fr')});
var assetsP=Promise.all([fontsP].concat(['assets/bolu.webp','assets/foto-bu-rini.jpg','assets/video-poster.jpg'].map(function(s){return new Promise(function(r){var im=new Image();im.onload=im.onerror=function(){r()};im.src=s;if(im.decode)im.decode().then(r,r)})})));
Promise.race([assetsP,wait(5000)]).then(function(){return wait(1800)}).then(function(){
  $('gift').hidden=false;$('gift').classList.add('enter');$('loader').classList.add('out');
  setTimeout(function(){$('loader').hidden=true},900);
});
$('giftBtn').onclick=function(){
  if(opened)return;opened=true;document.body.classList.add('go');startPetals();burstFlowers();startMusic();
  setTimeout(function(){$('main').hidden=false;$('music').hidden=false;$('gift').classList.add('out');show(0)},1100);
  setTimeout(function(){$('gift').hidden=true;confetti()},2000);
};

/* video: jeda musik latar saat video diputar, lanjutkan setelahnya */
var vid=$('vid'),musicWas=false;
vid.addEventListener('play',function(){musicWas=playing;if(playing){playing=false;clearTimeout(timer);$('music').classList.add('off')}});
function resumeAfterVid(){if(musicWas){musicWas=false;startMusic()}}
vid.addEventListener('pause',resumeAfterVid);vid.addEventListener('ended',resumeAfterVid);

/* halaman */
var pages=[].slice.call(document.querySelectorAll('.page')),bgs=[].slice.call(document.querySelectorAll('#bg i')),dotsEl=$('dots'),cur=0,names=['Ucapan','Foto','Video','Surat','Buket','Toples','Penutup'];
pages.forEach(function(p,i){var d=document.createElement('button');d.setAttribute('aria-label','Ke halaman '+(i+1)+': '+names[i]);d.onclick=function(){show(i)};dotsEl.appendChild(d)});
function show(n){
  if(n<0||n>=pages.length)return;cur=n;
  pages.forEach(function(p,i){p.classList.toggle('active',i===n);p.classList.toggle('before',i<n);p.classList.toggle('after',i>n);if(i!==n)p.scrollTop=0});
  bgs.forEach(function(b,i){b.classList.toggle('on',i===n)});
  [].forEach.call(dotsEl.children,function(d,i){d.classList.toggle('on',i===n)});
  $('prev').disabled=n===0;$('next').disabled=n===pages.length-1;
  if(n!==2){vid.pause()}
}
$('prev').onclick=function(){show(cur-1)};$('next').onclick=function(){show(cur+1)};
addEventListener('keydown',function(e){if($('main').hidden)return;if(e.key==='ArrowRight'||e.key==='PageDown')show(cur+1);if(e.key==='ArrowLeft'||e.key==='PageUp')show(cur-1)});
var tx=0,ty=0;
addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',function(e){if($('main').hidden)return;var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)show(cur+(dx<0?1:-1))},{passive:true});
show(0);

/* lilin */
var cake=$('cake');
function blow(){cake.classList.remove('blown');void cake.getBoundingClientRect();cake.classList.add('blown');confetti();$('blowMsg').textContent='Semoga harapan Ibu terkabul. Barakallah fii umrik!';$('blow').disabled=true}
$('blow').onclick=blow;
$('again').onclick=function(){cake.classList.remove('blown');$('blow').disabled=false;$('blowMsg').textContent='Ketuk tombol, lalu ucapkan satu harapan dalam hati.';show(0)};


var SPR=[{"src":"assets/bunga/jasmine.webp","ar":0.3135,"sx":0.356,"hy":0.15,"ang":-44,"hf":0.5,"z":1},{"src":"assets/bunga/hydrangea.webp","ar":0.3269,"sx":0.478,"hy":0.15,"ang":-33,"hf":0.6,"z":2},{"src":"assets/bunga/tulip.webp","ar":0.2192,"sx":0.587,"hy":0.15,"ang":-22,"hf":0.72,"z":3},{"src":"assets/bunga/daisy.webp","ar":0.3173,"sx":0.429,"hy":0.15,"ang":-11,"hf":0.85,"z":4},{"src":"assets/bunga/sunflower.webp","ar":0.3577,"sx":0.493,"hy":0.15,"ang":0,"hf":0.8,"z":6},{"src":"assets/bunga/lily.webp","ar":0.3173,"sx":0.472,"hy":0.15,"ang":9,"hf":0.93,"z":5},{"src":"assets/bunga/rose.webp","ar":0.3058,"sx":0.506,"hy":0.15,"ang":19,"hf":0.78,"z":4},{"src":"assets/bunga/gypsophila.webp","ar":0.2615,"sx":0.482,"hy":0.15,"ang":28,"hf":0.64,"z":3},{"src":"assets/bunga/carnation.webp","ar":0.3269,"sx":0.402,"hy":0.15,"ang":37,"hf":0.56,"z":2},{"src":"assets/bunga/statice.webp","ar":0.2731,"sx":0.503,"hy":0.15,"ang":45,"hf":0.5,"z":1}];
var NS='http://www.w3.org/2000/svg';var bq=$('bq'),PX=50,PY=80; /* titik ikatan buket (persen) */
SPR.forEach(function(d,i){
  var el=document.createElement('div');el.className='stem';
  var hP=d.hf*100,wP=hP*d.ar/1.12; /* lebar dalam persen lebar wadah */
  el.style.cssText='height:'+hP+'%;width:'+wP+'%;left:'+(PX-d.sx*wP)+'%;top:'+(PY-hP)+'%;--ox:'+(d.sx*100)+'%;--hy:'+(d.hy*100)+'%;z-index:'+d.z+';transform:rotate('+d.ang+'deg)';
  var im=new Image();im.src=d.src;im.alt='';el.appendChild(im);
  var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Bunga '+(i+1)+', baca doa');
  b.onclick=function(){[].forEach.call(bq.querySelectorAll('.stem'),function(e){e.classList.remove('on')});el.classList.add('on');$('wish').textContent=WISHES[i]};
  el.appendChild(b);bq.appendChild(el)
});
var wr=document.createElementNS(NS,'svg');wr.setAttribute('class','wrap');wr.setAttribute('viewBox','0 0 400 160');wr.setAttribute('preserveAspectRatio','none');
wr.innerHTML='<path d="M200 156L96 12Q200-6 304 12Z" fill="#f2799c"/><path d="M200 156L96 12Q150 30 200 28Q250 30 304 12Z" fill="#ff9bb8"/><path d="M200 156L152 20Q200 40 248 20Z" fill="#fbf3ea" opacity=".9"/><path d="M168 14Q200 26 232 14L226 38Q200 46 174 38Z" fill="#f5c26b"/><path d="M200 30c-26-24-52-8-34 6 10 8 24 0 34-6zM200 30c26-24 52-8 34 6-10 8-24 0-34-6z" fill="#f5c26b" stroke="#d99a3a" stroke-width="1.5"/><circle cx="200" cy="31" r="7" fill="#d99a3a"/>';
bq.appendChild(wr);


/* toples */
var last=-1;
$('jarBtn').onclick=function(){var n;do{n=Math.floor(Math.random()*REASONS.length)}while(n===last&&REASONS.length>1);last=n;var el=$('note');el.hidden=false;el.style.animation='none';void el.offsetWidth;el.style.animation='';el.innerHTML='';var s=document.createElement('small');s.textContent='Catatan '+(n+1)+' dari '+REASONS.length;var t=document.createElement('span');t.textContent=REASONS[n];el.appendChild(t);el.appendChild(s);$('jarBtn').textContent='Ambil catatan lain'};

/* musik: lagu selamat ulang tahun dengan nada kotak musik */
var ac,playing=false,timer,idx=0;
var f={C:261.63,D:293.66,E:329.63,F:349.23,G:392,A:440,B:493.88,C2:523.25,D2:587.33,E2:659.25,F2:698.46,G2:783.99};
var tune=[['G',.75],['G',.25],['A',1],['G',1],['C2',1],['B',2],['G',.75],['G',.25],['A',1],['G',1],['D2',1],['C2',2],['G',.75],['G',.25],['G2',1],['E2',1],['C2',1],['B',1],['A',1],['F2',.75],['F2',.25],['E2',1],['C2',1],['D2',1],['C2',3]];
function tone(fr,t,d){var o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=fr;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.18,t+.01);g.gain.exponentialRampToValueAtTime(.0008,t+d+.5);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d+.6)}
function step(){if(!playing)return;var n=tune[idx],d=n[1]*.55;tone(f[n[0]],ac.currentTime+.02,d);idx++;var wait=d*1000;if(idx>=tune.length){idx=0;wait+=2500}timer=setTimeout(step,wait)}
function startMusic(){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();playing=true;$('music').classList.remove('off');step()}catch(e){}}
$('music').onclick=function(){if(playing){playing=false;clearTimeout(timer);this.classList.add('off')}else{startMusic()}};
