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
// Handle feedback form
// ==========================
function submitForm(e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Fill all fields');
    return;
  }

  const fb = storage.load('feedback') || [];
  fb.push({ name, email, message, date: new Date().toISOString() });
  storage.save('feedback', fb);

  showToast('Thank you — feedback saved locally');
  e.target.reset();
}


// ==========================
// Attach submit listener
// ==========================
document.getElementById('contact-form').addEventListener('submit', submitForm);
