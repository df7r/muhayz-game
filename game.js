const startScreen = document.getElementById("start-screen");
const playScreen = document.getElementById("play-screen");
const startBtn = document.getElementById("start-btn");
const exitBtn = document.getElementById("exit-btn");
const skyArea = document.getElementById("sky-area");
const scoreVal = document.getElementById("score-val");
const levelVal = document.getElementById("level-val");
const crosshair = document.getElementById("crosshair");
const shotgun = document.getElementById("shotgun");
const dog = document.getElementById("dog");

// الأثوات
const soundShoot = new Audio("https://www.soundjay.com/mechanical/gun-gunshot-01.mp3");
const soundHit = new Audio("https://www.soundjay.com/button/button-10.mp3");
const soundDog = new Audio("https://www.soundjay.com/button/beep-07.mp3");

let score = 0;
let level = 1;

// تحريك النيشان وصوت إطلاق النار عند الضغط
document.addEventListener("mousemove", (e) => {
    const rect = playScreen.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= 800 && y >= 0 && y <= 600) {
        crosshair.style.left = x + "px";
        crosshair.style.top = y + "px";
        
        const angle = (x - 400) / 25;
        shotgun.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }
});

// صوت إطلاق النار عند الكليك في الشاشة
playScreen.addEventListener("mousedown", () => {
    soundShoot.currentTime = 0;
    soundShoot.play().catch(() => {}); // تشغيل صوت البندقية
});

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");
    score = 0;
    level = 1;
    updateHUD();
    spawnBirds();
});

exitBtn.addEventListener("click", () => {
    location.reload();
});

function updateHUD() {
    scoreVal.innerText = String(score).padStart(6, '0');
    levelVal.innerText = `0${level} / 05`;
}

function spawnBirds() {
    skyArea.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        createBird();
    }
}

function createBird() {
    const bird = document.createElement("div");
    bird.className = "bird-unit";

    const face = document.createElement("div");
    face.className = "bird-face";
    face.style.backgroundImage = "url('E4F839DA-F495-4955-815F-CCC087174D1C.jpeg')";

    bird.appendChild(face);

    let posX = Math.random() * 600 + 50;
    let posY = Math.random() * 200 + 100;
    let dirX = (Math.random() - 0.5) * 5;
    let dirY = (Math.random() - 0.5) * 3;

    bird.style.left = posX + "px";
    bird.style.top = posY + "px";

    bird.addEventListener("mousedown", (e) => {
        e.stopPropagation(); // يمنع تكرار صوت الطلقة المزدوج
        soundHit.currentTime = 0;
        soundHit.play().catch(() => {}); // صوت الإصابة
        
        score += 250;
        updateHUD();
        bird.remove();
        checkWin();
    });

    skyArea.appendChild(bird);

    setInterval(() => {
        posX += dirX;
        posY += dirY;

        if (posX <= 10 || posX >= 710) dirX *= -1;
        if (posY <= 20 || posY >= 280) dirY *= -1;

        bird.style.left = posX + "px";
        bird.style.top = posY + "px";
    }, 20);
}

function checkWin() {
    const remaining = skyArea.querySelectorAll(".bird-unit");
    if (remaining.length === 0) {
        level++;
        if (level > 5) {
            alert("مبروك! أنجزت كل المستويات 🏆");
            location.reload();
        } else {
            updateHUD();
            showDog();
            setTimeout(spawnBirds, 1800);
        }
    }
}

function showDog() {
    soundDog.currentTime = 0;
    soundDog.play().catch(() => {}); // صوت الكلب
    dog.style.bottom = "160px";
    setTimeout(() => {
        dog.style.bottom = "110px";
    }, 1200);
}
