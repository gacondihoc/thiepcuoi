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