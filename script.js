// 1. Earth Loader & Percentage Counter
window.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('load-percentage');
    const loader = document.getElementById('loader-screen');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2;
        if (progress > 100) progress = 100;
        
        fill.style.width = `${progress}%`;
        text.innerText = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.visibility = 'hidden', 800);
            }, 300);
        }
    }, 40);
});

// 2. Animated Galaxy Starfield (Flowing Right to Left)
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let animateParticles = true;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particleCount = Math.floor((width * height) / 7000);
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3 - 0.5,
        speedY: (Math.random() - 0.5) * 0.3 + 0.1,
        alpha: Math.random() * 0.8 + 0.2
    });
}

function renderGalaxy() {
    if (!animateParticles) return;
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f2fe';
        ctx.fill();
    });

    requestAnimationFrame(renderGalaxy);
}
renderGalaxy();

// 3. Modals & Settings Interactivity
const proModal = document.getElementById('pro-modal');
const settingsModal = document.getElementById('settings-modal');

document.getElementById('open-pro-btn').onclick = () => proModal.classList.remove('hidden');
document.getElementById('close-pro-btn').onclick = () => proModal.classList.add('hidden');

document.getElementById('open-settings-btn').onclick = () => settingsModal.classList.remove('hidden');
document.getElementById('close-settings-btn').onclick = () => settingsModal.classList.add('hidden');

document.getElementById('particle-toggle').addEventListener('change', (e) => {
    animateParticles = e.target.checked;
    if (animateParticles) renderGalaxy();
});

// 4. Simulated AI Chat Engine (Demo Response)
const userInput = document.getElementById('user-prompt');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-stream-box');
const pillBtns = document.querySelectorAll('.pill-btn');

function sendQuery(text) {
    if (!text.trim()) return;

    chatBox.classList.remove('hidden');
    
    // User Msg
    const userRow = document.createElement('div');
    userRow.className = 'msg-row msg-user';
    userRow.innerHTML = `<strong>You:</strong> ${escapeHtml(text)}`;
    chatBox.appendChild(userRow);

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulated Bot Reply
    setTimeout(() => {
        const botRow = document.createElement('div');
        botRow.className = 'msg-row msg-bot';
        botRow.innerHTML = `<strong>Torit ai:</strong> [Torit ai Demo Response] I have analyzed your query: "<em>${escapeHtml(text)}</em>". All neural pathways are functioning smoothly!`;
        chatBox.appendChild(botRow);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 700);
}

sendBtn.onclick = () => sendQuery(userInput.value);
userInput.onkeydown = (e) => { if (e.key === 'Enter') sendQuery(userInput.value); };

pillBtns.forEach(btn => {
    btn.onclick = () => sendQuery(btn.getAttribute('data-prompt'));
});

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          }
