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
const dogBubble = document.getElementById("dog-bubble");

let score = 0;
let level = 1;
let activeBirds = [];
let gameInterval;

// تتبع حركة الماوس للنيشان والبندقية
document.addEventListener("mousemove", (e) => {
    const rect = playScreen.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= 800 && y >= 0 && y <= 600) {
        crosshair.style.left = x + "px";
        crosshair.style.top = y + "px";
        
        // تدوير البندقية قليلاً باتجاه النيشان
        const angle = (x - 400) / 20;
        shotgun.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }
});

// بدء اللعبة
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

// إنشاء الطيور بطيران عشوائي وصورتك
function spawnBirds() {
    skyArea.innerHTML = "";
    activeBirds = [];

    const count = 3; // عدد الطيور
    for (let i = 0; i < count; i++) {
        createBird();
    }
}

function createBird() {
    const bird = document.createElement("div");
    bird.className = "bird-unit";

    // جسم وطاقات الطائر
    const wings = document.createElement("div");
    wings.className = "bird-wings";

    // الوجه (الصورة الخاصة بك face.png)
    const face = document.createElement("div");
    face.className = "bird-face";
    face.style.backgroundImage = "url('face.png')";

    bird.appendChild(wings);
    bird.appendChild(face);

    // موقع البداية عشوائي
    let posX = Math.random() * 600 + 50;
    let posY = Math.random() * 200 + 150;
    let dirX = (Math.random() - 0.5) * 4;
    let dirY = (Math.random() - 0.5) * 3;

    bird.style.left = posX + "px";
    bird.style.top = posY + "px";

    // عند إطلاق النار على الطائر (إصابته)
    bird.addEventListener("mousedown", () => {
        score += 250;
        updateHUD();
        bird.remove();
        checkWin();
    });

    skyArea.appendChild(bird);

    // تحريك الطائر
    const flyTimer = setInterval(() => {
        posX += dirX;
        posY += dirY;

        // ارتداد من الجدران
        if (posX <= 10 || posX >= 710) dirX *= -1;
        if (posY <= 20 || posY >= 300) dirY *= -1;

        bird.style.left = posX + "px";
        bird.style.top = posY + "px";
    }, 20);

    activeBirds.push({ element: bird, timer: flyTimer });
}

function checkWin() {
    const remaining = skyArea.querySelectorAll(".bird-unit");
    if (remaining.length === 0) {
        // إذا فاز بالروند
        level++;
        if (level > 5) {
            alert("مبروك! أنهيت كل المستويات بنجاح 🏆");
            location.reload();
        } else {
            updateHUD();
            showDogLaugh(true);
            setTimeout(spawnBirds, 2000);
        }
    }
}

function showDogLaugh(isWin = false) {
    dog.style.bottom = "140px";
    if (!isWin) {
        dogBubble.classList.remove("hidden");
    }

    setTimeout(() => {
        dog.style.bottom = "90px";
        dogBubble.classList.add("hidden");
    }, 1500);
}
