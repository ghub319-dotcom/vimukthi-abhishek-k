// ==========================
// Live clock
// ==========================
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();


// ==========================
// Elements
// ==========================
const breathEl = document.getElementById("breath"),
      txt      = document.getElementById("breathText"),
      msg      = document.getElementById("sessionMsg"),
      btn      = document.getElementById("soundToggle"),
      audio    = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

audio.loop = true;
audio.volume = 0.2;


// ==========================
// Breathing cycle steps
// ==========================
let idx = 0, timer, bSound = false, cycleNum = 0;
const steps = [
  {t:4000, p:"Inhale", c:"inhale"},
  {t:2000, p:"Hold",   c:""},
  {t:4000, p:"Exhale", c:"exhale"},
  {t:2000, p:"Hold",   c:""}
];


// ==========================
// Breathing cycle
// ==========================
function cycle() {
  const s = steps[idx];
  breathEl.className = "breath " + s.c;
  txt.textContent = s.p;

  if (idx === 0) {
    cycleNum++;
    document.getElementById('cycleCount').textContent = `Cycle: ${cycleNum}`;
  }

  idx = (idx + 1) % steps.length;
  timer = setTimeout(cycle, s.t);
}

function startBreathing() {
  cycleNum = 0;
  document.getElementById('cycleCount').textContent = `Cycle: 0`;
  idx = 0;
  cycle();
}

function stopBreathing() {
  clearTimeout(timer);
  idx = 0;
  breathEl.className = "breath";
  txt.textContent = "";
  document.getElementById('cycleCount').textContent = `Cycle: 0`;
}


// ==========================
// Timer session
// ==========================
function startTimer() {
  let secs = (+document.getElementById("minInput").value || 1) * 60;
  msg.textContent = "Session running...";
  const id = setInterval(()=>{
    if (--secs <= 0) {
      clearInterval(id);
      msg.textContent = "Session complete!";
      track();
    }
  },1000);
}


// ==========================
// Ambient sound toggle
// ==========================
function toggleSound() {
  bSound ? audio.pause() : audio.play();
  bSound = !bSound;
  btn.textContent = bSound ? "Stop Ambient" : "Toggle Ambient";
}


// ==========================
// Local storage tracker
// ==========================
function track() {
  let k = "green_sessions",
      a = JSON.parse(localStorage[k] || "[]");
  a.push({when:new Date().toISOString()});
  localStorage[k] = JSON.stringify(a);
}
