/* ================================================================
   BIRTHDAY SURPRISE - MAIN SCRIPT
   ================================================================ */

/* ================================================================
   1. CONFIGURATION
   🔧 แก้ไขค่าต่าง ๆ ที่นี่
   ================================================================ */

// วันที่เริ่มคบกัน (ปี-เดือน-วัน)
const RELATIONSHIP_START = new Date('2023-01-01T00:00:00');

// ข้อความ Typewriter
const TYPEWRITER_MESSAGE = 'สุขสันต์วันเกิดนะคนเก่งของเค้า 🤍\nวันนี้เธออายุ 20 ปีแล้ว ขอให้ปีนี้เป็นปีที่ดีที่สุดของเธอ ขอให้มีแต่ความสุข สุขภาพแข็งแรง ประสบความสำเร็จในทุกสิ่งที่ตั้งใจ ขอบคุณที่เข้ามาเป็นความสุขของเค้า ขอบคุณที่อยู่เคียงข้างกันเสมอ ถึงจะมีวันที่เรางอนกันหรือเข้าใจกันผิด แต่เค้าก็ยังเลือกเธอทุกวัน และจะรักเธอไปเรื่อย ๆ หวังว่าเราจะได้สร้างความทรงจำดี ๆ ด้วยกันอีกเยอะเลยนะ รักเธอที่สุด 🤍';

// รูปภาพแกลเลอรี่ (20 รูป)
// 🔧 เปลี่ยน URL เป็นรูปของคุณ เช่น 'images/gallery/1.jpg'
const GALLERY_IMAGES = [
    { src: 'images/1747189043191.jpg', alt: 'รูปที่ 1' },
    { src: 'images/1783869178298.jpg', alt: 'รูปที่ 2' },
    { src: 'images/1747318312253.jpg', alt: 'รูปที่ 3' },
    { src: 'https://picsum.photos/seed/love04/600/800', alt: 'รูปที่ 4' },
    { src: 'https://picsum.photos/seed/love05/600/800', alt: 'รูปที่ 5' },
    { src: 'https://picsum.photos/seed/love06/600/800', alt: 'รูปที่ 6' },
    { src: 'https://picsum.photos/seed/love07/600/800', alt: 'รูปที่ 7' },
    { src: 'https://picsum.photos/seed/love08/600/800', alt: 'รูปที่ 8' },
    { src: 'https://picsum.photos/seed/love09/600/800', alt: 'รูปที่ 9' },
    { src: 'https://picsum.photos/seed/love10/600/800', alt: 'รูปที่ 10' },
    { src: 'https://picsum.photos/seed/love11/600/800', alt: 'รูปที่ 11' },
    { src: 'https://picsum.photos/seed/love12/600/800', alt: 'รูปที่ 12' },
    { src: 'https://picsum.photos/seed/love13/600/800', alt: 'รูปที่ 13' },
    { src: 'https://picsum.photos/seed/love14/600/800', alt: 'รูปที่ 14' },
    { src: 'https://picsum.photos/seed/love15/600/800', alt: 'รูปที่ 15' },
    { src: 'https://picsum.photos/seed/love16/600/800', alt: 'รูปที่ 16' },
    { src: 'https://picsum.photos/seed/love17/600/800', alt: 'รูปที่ 17' },
    { src: 'https://picsum.photos/seed/love18/600/800', alt: 'รูปที่ 18' },
    { src: 'https://picsum.photos/seed/love19/600/800', alt: 'รูปที่ 19' },
    { src: 'https://picsum.photos/seed/love20/600/800', alt: 'รูปที่ 20' },
];

// ความทรงจำ (รูป + คำบรรยาย)
// 🔧 เปลี่ยน URL เป็นรูปของคุณ
const MEMORIES = [
    { src: 'https://picsum.photos/seed/mem01/600/400', caption: 'วันแรกที่เราเจอกัน 💕' },
    { src: 'https://picsum.photos/seed/mem02/400/400', caption: 'ครั้งแรกที่ไปเดทกัน 🌹' },
    { src: 'https://picsum.photos/seed/mem03/400/400', caption: 'วันเดทที่ทะเล 🌊' },
    { src: 'https://picsum.photos/seed/mem04/400/400', caption: 'เที่ยวด้วยกันเสมอ ✨' },
    { src: 'https://picsum.photos/seed/mem05/400/400', caption: 'ยิ้มให้กันทุกวัน ☀️' },
    { src: 'https://picsum.photos/seed/mem06/400/400', caption: 'ขอบคุณที่เป็นของเค้า 🤍' },
];

// รวมรูปทั้งหมดสำหรับ Fullscreen Viewer
const ALL_IMAGES = [
    ...GALLERY_IMAGES.map(g => g.src),
    ...MEMORIES.map(m => m.src)
];

/* ================================================================
   2. DOM ELEMENTS
   ================================================================ */
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const btnSurprise = document.getElementById('btn-surprise');
const bgMusic = document.getElementById('bg-music');
const floatingButtons = document.getElementById('floating-buttons');
const fullscreenViewer = document.getElementById('fullscreen-viewer');
const fullscreenImg = document.getElementById('fullscreen-img');
const viewerCounter = document.getElementById('viewer-counter');
const fireworksCanvas = document.getElementById('fireworks-canvas');
const fCtx = fireworksCanvas.getContext('2d');
const confettiCanvas = document.getElementById('confetti-canvas');
const cCtx = confettiCanvas.getContext('2d');
const toastEl = document.getElementById('toast');
const scrollProgress = document.getElementById('scroll-progress');

/* ================================================================
   3. UTILITY FUNCTIONS
   ================================================================ */

// แสดง Toast Notification
let toastTimeout = null;
function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimeout = setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// สร้างตัวเลขสุ่มในช่วง
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/* ================================================================
   4. WELCOME SCREEN HEARTS
   ================================================================ */
function createWelcomeHearts() {
    const container = document.getElementById('welcome-hearts');
    const hearts = ['♥', '♡', '❤', '🤍'];
    const colors = ['#FF8FAB', '#FFD6E0', '#E8587A', '#D4A843', '#F0D78C', '#FFFFFF'];

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('div');
        heart.classList.add('welcome-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const size = Math.random() * 1.5 + 0.6;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-5%';
        heart.style.fontSize = size + 'rem';
        heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(heart);
    }
}

createWelcomeHearts();

/* ================================================================
   5. BUILD GALLERY SLIDES
   ================================================================ */
function buildGallery() {
    const wrapper = document.getElementById('gallery-wrapper');
    const total = GALLERY_IMAGES.length;

    GALLERY_IMAGES.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'gallery-slide');
        slide.setAttribute('data-index', index);
        slide.setAttribute('data-src', img.src);

        slide.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
            <span class="gallery-slide-number">${index + 1} / ${total}</span>
            <span class="gallery-slide-zoom"><i class="fas fa-search-plus"></i></span>
        `;

        // แตะเพื่อดูเต็มจอ
        slide.addEventListener('click', () => {
            openFullscreen(img.src);
        });

        wrapper.appendChild(slide);
    });
}

buildGallery();

/* ================================================================
   6. BUILD MEMORIES GRID
   ================================================================ */
function buildMemories() {
    const grid = document.getElementById('memories-grid');

    MEMORIES.forEach((memory) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');

        card.innerHTML = `
            <img src="${memory.src}" alt="${memory.caption}" loading="lazy">
            <span class="memory-zoom"><i class="fas fa-search-plus"></i></span>
            <div class="memory-caption">${memory.caption}</div>
        `;

        // แตะเพื่อดูรูปเต็มจอ
        card.addEventListener('click', () => {
            openFullscreen(memory.src);
        });

        grid.appendChild(card);
    });
}

buildMemories();

/* ================================================================
   7. SURPRISE BUTTON HANDLER
   ================================================================ */
let isSurpriseOpened = false;

btnSurprise.addEventListener('click', function(e) {
    if (isSurpriseOpened) return;
    isSurpriseOpened = true;

    // Ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);

    // ซ่อนหน้าต้อนรับ
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
    }, 300);

    // แสดงเนื้อหาหลัก
    setTimeout(() => {
        mainContent.classList.add('visible');
        welcomeScreen.style.display = 'none';
        floatingButtons.classList.add('visible');
    }, 1000);

    // เล่นเพลง
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        btnMusic.classList.add('active');
        showToast('🎵 เล่นเพลงแล้ว');
    }).catch(() => {
        showToast('แตะปุ่มเพลงเพื่อเล่น 🎵');
    });

    // เริ่มเอฟเฟกต์
    setTimeout(() => {
        startFireworks();
        startConfetti();
    }, 800);

    setTimeout(startTypewriter, 1500);

    startFloatingHearts();

    // เริ่ม Counter
    updateCounter();
    setInterval(updateCounter, 1000);
});

/* ================================================================
   8. TYPEWRITER EFFECT
   ================================================================ */
let typewriterRunning = false;

function startTypewriter() {
    if (typewriterRunning) return;
    typewriterRunning = true;

    const textEl = document.getElementById('typewriter-text');
    const cursorEl = document.getElementById('typewriter-cursor');
    const chars = [...TYPEWRITER_MESSAGE];
    let index = 0;

    function type() {
        if (index < chars.length) {
            const char = chars[index];

            if (char === '\n') {
                textEl.appendChild(document.createElement('br'));
            } else {
                textEl.appendChild(document.createTextNode(char));
            }

            index++;

            let delay = 45;
            if (char === ' ') delay = 25;
            if (char === '\n') delay = 150;
            if (char === '🤍') delay = 300;
            if (char === ',') delay = 80;
            if (char === '.') delay = 100;

            setTimeout(type, delay);
        } else {
            setTimeout(() => {
                cursorEl.style.display = 'none';
            }, 2000);
        }
    }

    type();
}

/* ================================================================
   9. FIREWORKS
   ================================================================ */
let fireworksParticles = [];
let fireworksRunning = false;

function resizeFireworksCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        this.size = Math.random() * 3 + 1;
        this.trail = [];
    }

    update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > 5) this.trail.shift();
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04;
        this.alpha -= this.decay;
        this.vx *= 0.99;
        this.vy *= 0.99;
    }

    draw(ctx) {
        this.trail.forEach((t) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, t.alpha * 0.3);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function createFirework(x, y) {
    const colors = ['#FF8FAB', '#FFD6E0', '#D4A843', '#F0D78C', '#FFFFFF', '#E8587A', '#FFB6C1'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 50 + Math.floor(Math.random() * 30);

    for (let i = 0; i < count; i++) {
        fireworksParticles.push(new FireworkParticle(x, y, color));
    }
}

function animateFireworks() {
    if (!fireworksRunning && fireworksParticles.length === 0) return;

    fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworksParticles = fireworksParticles.filter(p => p.alpha > 0);

    fireworksParticles.forEach(p => {
        p.update();
        p.draw(fCtx);
    });

    requestAnimationFrame(animateFireworks);
}

function startFireworks() {
    resizeFireworksCanvas();
    fireworksRunning = true;
    animateFireworks();

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(
                randomRange(fireworksCanvas.width * 0.1, fireworksCanvas.width * 0.9),
                randomRange(fireworksCanvas.height * 0.1, fireworksCanvas.height * 0.5)
            );
        }, i * 400);
    }

    const interval = setInterval(() => {
        if (!fireworksRunning) {
            clearInterval(interval);
            return;
        }
        createFirework(
            randomRange(fireworksCanvas.width * 0.1, fireworksCanvas.width * 0.9),
            randomRange(fireworksCanvas.height * 0.1, fireworksCanvas.height * 0.5)
        );
    }, 1500);

    setTimeout(() => {
        fireworksRunning = false;
    }, 12000);
}

/* ================================================================
   10. CONFETTI
   ================================================================ */
let confettiParticles = [];
let confettiRunning = false;

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.color = ['#FF8FAB', '#FFD6E0', '#D4A843', '#F0D78C', '#FFFFFF', '#E8587A'][Math.floor(Math.random() * 6)];
        this.vx = randomRange(-1, 1);
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = randomRange(-5, 5);
        this.alpha = 1;
        this.shape = Math.floor(Math.random() * 3);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02;
        this.rotation += this.rotationSpeed;
        this.vx += randomRange(-0.1, 0.1);
        if (this.y > confettiCanvas.height + 20) this.alpha = 0;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        if (this.shape === 0) {
            ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        } else if (this.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

function animateConfetti() {
    if (!confettiRunning && confettiParticles.length === 0) return;

    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = confettiParticles.filter(p => p.alpha > 0);

    confettiParticles.forEach(p => {
        p.update();
        p.draw(cCtx);
    });

    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    resizeConfettiCanvas();
    confettiRunning = true;
    animateConfetti();

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            confettiParticles.push(new ConfettiPiece());
        }, i * 30);
    }

    const interval = setInterval(() => {
        if (!confettiRunning) {
            clearInterval(interval);
            return;
        }
        for (let i = 0; i < 5; i++) {
            confettiParticles.push(new ConfettiPiece());
        }
    }, 300);

    setTimeout(() => {
        confettiRunning = false;
    }, 10000);
}

/* ================================================================
   11. FLOATING HEARTS
   ================================================================ */
let heartsInterval = null;

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');

    const hearts = ['♥', '❤', '♡'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const size = Math.random() * 1.2 + 0.6;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 2;

    heart.style.left = left + 'vw';
    heart.style.bottom = '-5vh';
    heart.style.fontSize = size + 'rem';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    const colors = ['#FF8FAB', '#FFD6E0', '#E8587A', '#D4A843', '#F0D78C'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000 + 100);
}

function startFloatingHearts() {
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 400);
    }
    heartsInterval = setInterval(createFloatingHeart, 1200);
}

/* ================================================================
   12. GALLERY SWIPER
   ================================================================ */
const gallerySwiper = new Swiper('.gallery-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: Math.floor(GALLERY_IMAGES.length / 2),
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
});

/* ================================================================
   13. FULLSCREEN IMAGE VIEWER
   ================================================================ */
let currentViewerIndex = 0;

function openFullscreen(src) {
    currentViewerIndex = ALL_IMAGES.indexOf(src);
    if (currentViewerIndex === -1) currentViewerIndex = 0;

    fullscreenImg.src = src;
    fullscreenViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateViewerCounter();
}

function closeFullscreen() {
    fullscreenViewer.classList.remove('active');
    document.body.style.overflow = '';
}

function updateViewerCounter() {
    viewerCounter.textContent = (currentViewerIndex + 1) + ' / ' + ALL_IMAGES.length;
}

function viewerNavigate(direction) {
    currentViewerIndex += direction;
    if (currentViewerIndex < 0) currentViewerIndex = ALL_IMAGES.length - 1;
    if (currentViewerIndex >= ALL_IMAGES.length) currentViewerIndex = 0;

    fullscreenImg.style.opacity = '0';
    fullscreenImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        fullscreenImg.src = ALL_IMAGES[currentViewerIndex];
        fullscreenImg.style.opacity = '1';
        fullscreenImg.style.transform = 'scale(1)';
        updateViewerCounter();
    }, 200);
}

// Transition สำหรับรูป
fullscreenImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// ปุ่มปิด
document.getElementById('viewer-close').addEventListener('click', closeFullscreen);

// ปุ่มเลื่อนรูป
document.getElementById('viewer-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    viewerNavigate(-1);
});

document.getElementById('viewer-next').addEventListener('click', (e) => {
    e.stopPropagation();
    viewerNavigate(1);
});

// คลิกพื้นหลังเพื่อปิด
fullscreenViewer.addEventListener('click', (e) => {
    if (e.target === fullscreenViewer) closeFullscreen();
});

// คีย์บอร์ด
document.addEventListener('keydown', (e) => {
    if (!fullscreenViewer.classList.contains('active')) return;
    if (e.key === 'Escape') closeFullscreen();
    if (e.key === 'ArrowLeft') viewerNavigate(-1);
    if (e.key === 'ArrowRight') viewerNavigate(1);
});

// Swipe สำหรับมือถือ
let touchStartX = 0;
let touchEndX = 0;

fullscreenViewer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

fullscreenViewer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        viewerNavigate(diff > 0 ? 1 : -1);
    }
}, { passive: true });

/* ================================================================
   14. RELATIONSHIP COUNTER
   ================================================================ */
function updateCounter() {
    const now = new Date();
    const diff = now - RELATIONSHIP_START;

    if (diff < 0) {
        document.getElementById('counter-days').textContent = '0';
        document.getElementById('counter-hours').textContent = '00';
        document.getElementById('counter-minutes').textContent = '00';
        document.getElementById('counter-seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('counter-days').textContent = days.toLocaleString();
    document.getElementById('counter-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('counter-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('counter-seconds').textContent = String(seconds).padStart(2, '0');

    // Tick animation
    const secondsEl = document.getElementById('counter-seconds');
    secondsEl.classList.add('tick');
    setTimeout(() => secondsEl.classList.remove('tick'), 300);
}

/* ================================================================
   15. FLOATING BUTTONS
   ================================================================ */

// เปิด/ปิดเพลง
const btnMusic = document.getElementById('btn-music');
let isMusicPlaying = false;

btnMusic.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        btnMusic.classList.remove('active');
        isMusicPlaying = false;
        showToast('ปิดเพลงแล้ว');
    } else {
        bgMusic.play().then(() => {
            btnMusic.classList.add('active');
            isMusicPlaying = true;
            showToast('🎵 เล่นเพลงแล้ว');
        }).catch(() => {
            showToast('ไม่สามารถเล่นเพลงได้ ลองแตะอีกครั้ง');
        });
    }
});

// เล่นวิดีโอ
document.getElementById('btn-video').addEventListener('click', () => {
    const videoSection = document.getElementById('video-section');
    videoSection.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        const video = document.getElementById('birthday-video');
        if (video) {
            video.play().catch(() => {
                showToast('ไม่สามารถเล่นวิดีโอได้');
            });
        } else {
            showToast('ยังไม่มีวิดีโอ');
        }
    }, 800);
});

// แชร์
document.getElementById('btn-share').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: '🤍 Happy 20th Birthday My Love 🤍',
            text: 'เซอร์ไพรส์วันเกิดพิเศษสำหรับคนพิเศษ 💕',
            url: window.location.href,
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('📋 คัดลอกลิงก์เรียบร้อยแล้ว!');
        }).catch(() => {
            showToast('ไม่สามารถแชร์ได้');
        });
    }
});

// กลับขึ้นด้านบน
document.getElementById('btn-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ================================================================
   16. SCROLL PROGRESS BAR
   ================================================================ */
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}, { passive: true });

/* ================================================================
   17. SCROLL REVEAL
   ================================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ================================================================
   18. SCROLL-BASED EFFECTS
   ================================================================ */
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 300) {
        floatingButtons.classList.add('visible');
    }

    // เพิ่มหัวใจเมื่อเลื่อนมา closing section
    const closingSection = document.getElementById('closing-section');
    if (closingSection) {
        const rect = closingSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && scrollY > lastScrollY) {
            if (Math.random() < 0.2) {
                createFloatingHeart();
            }
        }
    }

    lastScrollY = scrollY;
}, { passive: true });

/* ================================================================
   19. WINDOW RESIZE HANDLER
   ================================================================ */
window.addEventListener('resize', () => {
    resizeFireworksCanvas();
    resizeConfettiCanvas();
});

/* ================================================================
   20. INITIALIZATION
   ================================================================ */
resizeFireworksCanvas();
resizeConfettiCanvas();
updateCounter();
setInterval(updateCounter, 1000);