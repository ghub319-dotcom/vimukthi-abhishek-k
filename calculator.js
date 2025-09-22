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
// BMR formula
// ==========================
function calcBMR(age, gender, height, weight) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}


// ==========================
// Handle calculation
// ==========================
document.getElementById('calc-btn').addEventListener('click', () => {
  const age    = Number(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  const factor = Number(document.getElementById('activity').value);

  if (!age || !height || !weight) {
    showToast('Please fill all fields');
    return;
  }

  const bmr  = Math.round(calcBMR(age, gender, height, weight));
  const tdee = Math.round(bmr * factor);

  const carbs_g = Math.round((tdee * 0.5) / 4);
  const prot_g  = Math.round((tdee * 0.2) / 4);
  const fat_g   = Math.round((tdee * 0.3) / 9);

  const results = document.getElementById('results');
  results.classList.remove('hidden');
  results.innerHTML = `
    <h3>Results</h3>
    <p>BMR: <strong>${bmr} kcal</strong></p>
    <p>TDEE: <strong>${tdee} kcal</strong></p>
    <h4>Macros</h4>
    <p>Carbs: ${carbs_g} g · Protein: ${prot_g} g · Fat: ${fat_g} g</p>
    <div class="progress" style="margin-top:.5rem"><span style="width:${50}%"></span></div>
    <div style="display:flex;gap:.4rem;margin-top:.6rem">
      <button class="btn" onclick="saveProfile()">Save profile</button>
      <button onclick="document.getElementById('results').classList.add('hidden')">Hide</button>
    </div>
  `;

  storage.save('lastCalc', { date: new Date().toISOString(), bmr, tdee, carbs_g, prot_g, fat_g });
});


// ==========================
// Save profile
// ==========================
function saveProfile() {
  const p = storage.load('lastCalc');
  if (!p) {
    showToast('No result to save');
    return;
  }
  storage.save('savedProfile', p);
  showToast('Profile saved');
}
