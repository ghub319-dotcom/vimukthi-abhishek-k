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
// Exercises by body part
// ==========================
const EXERCISES = {
  full: ['Jumping Jacks','Burpees','Mountain Climbers','Plank (30s)'],
  arms: ['Push-ups','Tricep Dips','Bicep Curls'],
  legs: ['Squats','Lunges','Calf Raises']
};


// ==========================
// Generate workout plan
// ==========================
document.getElementById('gen').addEventListener('click', () => {
  const bp = document.getElementById('bodypart').value;
  const eq = document.getElementById('equipment').value; // currently unused but available
  const pool = EXERCISES[bp] || EXERCISES.full;

  const plan = [];
  for (let i = 0; i < 4; i++) {
    plan.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  const html = plan.map((ex, i) => `
    <div class="card" style="margin-top:.4rem">
      <strong>${ex}</strong>
      <div style="margin-top:.4rem">
        Time: <span id="t_${i}">30</span>s
        <button onclick="startTimer(${i},30)">Start</button>
      </div>
    </div>
  `).join('');

  document.getElementById('plan').innerHTML = html;
});


// ==========================
// Countdown timer
// ==========================
function startTimer(i, sec) {
  const el = document.getElementById('t_' + i);
  let s = sec;
  const iv = setInterval(() => {
    s--;
    el.textContent = s;
    if (s <= 0) {
      clearInterval(iv);
      el.textContent = 'Done';
      playBeep();
    }
  }, 1000);
}


// ==========================
// Beep sound
// ==========================
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => osc.stop(), 120);
  } catch (e) {
    console.warn('Beep not supported', e);
  }
}
