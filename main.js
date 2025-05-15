const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
//  kiểm soát nhạc chạy
window.addEventListener('pointerdown', function () {
    const audio = document.getElementById('bgm');
    if (audio.muted) {
        audio.muted = false;   // Bỏ mute
        audio.play();          // Bắt đầu phát
    }
}, { once: true });


const loveBtn = document.getElementById('loveBtn');

loveBtn.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';

        // Tạo vị trí ngẫu nhiên theo chiều ngang
        const left = Math.random() * window.innerWidth;
        const delay = Math.random() * 0.5; // ngẫu nhiên delay rơi

        heart.style.left = `${left}px`;
        heart.style.top = `-30px`;
        heart.style.animationDelay = `${delay}s`;

        document.body.appendChild(heart);

        // Xóa tim sau 3s
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
});

const form = document.getElementById('rsvpForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const sheetURL = "https://script.google.com/macros/s/AKfycbxL9GUtDOg1Dq095iMIFbLYFM1Ek8is7_jNwNMn-iOnKv7BrOpnLkNcL-3hycXNAMxVnw/exec";

    try {
        const response = await fetch(sheetURL, {
            method: "POST",
            body: formData, // không dùng JSON → tránh preflight CORS
        });

        const text = await response.text();
        document.getElementById("rsvpMessage").textContent = "✅ Đã gửi thành công!";
        form.reset();
    } catch (err) {
        console.error(err);
        document.getElementById("rsvpMessage").textContent = "❌ Gửi thất bại!";
    }
});
