// Live clock
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Rotating slogans
const slogans = [
    "Eat well, live well!",
    "Strong body, calm mind.",
    "Small steps, big changes.",
    "Nourish to flourish.",
    "Wellness is a journey, not a destination."
];
let sloganIdx = 0;
function showSlogan() {
    document.getElementById('slogan').textContent = slogans[sloganIdx];
    sloganIdx = (sloganIdx + 1) % slogans.length;
}
setInterval(showSlogan, 3000);
showSlogan();

// Health tip of the day
const healthTips = [
    "Drink plenty of water today!",
    "Take a brisk walk for 20 minutes.",
    "Try a new vegetable in your meal.",
    "Practice deep breathing for 5 minutes.",
    "Get enough sleep for better recovery.",
    "Stretch your body after sitting long hours.",
    "Smile and practice gratitude."
];
const today = new Date();
const tipIdx = today.getDate() % healthTips.length;
document.getElementById('health-tip').textContent = healthTips[tipIdx];

// Newsletter subscription
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value.trim();
    if(email && email.includes('@')) {
        const stored = JSON.parse(localStorage.getItem('gb_newsletter') || '[]');
        stored.push({email, date: new Date().toISOString()});
        localStorage.setItem('gb_newsletter', JSON.stringify(stored));
        document.getElementById('newsletter-msg').textContent = "Thank you for subscribing!";
        document.getElementById('newsletter-email').value = '';
    } else {
        document.getElementById('newsletter-msg').textContent = "Please enter a valid email address.";
    }
});
