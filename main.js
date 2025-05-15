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

    const data = {
        name: form.name.value.trim(),
        attend: form.attend.value,
        guestCount: form.guestCount.value || "0"
    };

    const sheetURL = "https://script.google.com/macros/s/AKfycbxL9GUtDOg1Dq095iMIFbLYFM1Ek8is7_jNwNMn-iOnKv7BrOpnLkNcL-3hycXNAMxVnw/exec"; // dán link Google Script của mày vào đây

    try {
        const res = await fetch(sheetURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await res.json();
        if (result.result === "success") {
            document.getElementById('rsvpMessage').textContent = "✅ Đã gửi thành công. Cảm ơn bạn!";
            form.reset();
        } else {
            throw new Error("Lỗi phản hồi");
        }
    } catch (err) {
        document.getElementById('rsvpMessage').textContent = "❌ Có lỗi xảy ra. Vui lòng thử lại.";
        console.error(err);
    }
});


