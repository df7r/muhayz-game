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

let score = 0;
let level = 1;

// تحكم اللمس والماوس
function handleMove(e) {
    const rect = playScreen.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        crosshair.style.left = x + "px";
        crosshair.style.top = y + "px";
        const angle = (x - (rect.width/2)) / 15;
        shotgun.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }
}

document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleMove);

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

    // رسم أجنحة الطائر
    const wings = document.createElement("div");
    wings.className = "bird-wings";

    // الوجه (صورتك)
    const face = document.createElement("div");
    face.className = "bird-face";
    face.style.backgroundImage = "url('E4F839DA-F495-4955-815F-CCC087174D1C.jpeg')";

    bird.appendChild(wings);
    bird.appendChild(face);

    let posX = Math.random() * 250 + 20;
    let posY = Math.random() * 150 + 40;
    let dirX = (Math.random() - 0.5) * 4;
    let dirY = (Math.random() - 0.5) * 3;

    bird.style.left = posX + "px";
    bird.style.top = posY + "px";

    function hitBird(e) {
        e.stopPropagation();
        score += 250;
        updateHUD();
        bird.remove();
        checkWin();
    }

    bird.addEventListener("mousedown", hitBird);
    bird.addEventListener("touchstart", hitBird);

    skyArea.appendChild(bird);

    setInterval(() => {
        posX += dirX;
        posY += dirY;

        if (posX <= 5 || posX >= 280) dirX *= -1;
        if (posY <= 10 || posY >= 200) dirY *= -1;

        bird.style.left = posX + "px";
        bird.style.top = posY + "px";
    }, 25);
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
            setTimeout(spawnBirds, 1600);
        }
    }
}

function showDog() {
    dog.style.bottom = "140px";
    setTimeout(() => {
        dog.style.bottom = "90px";
    }, 1200);
}
