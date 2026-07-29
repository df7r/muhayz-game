let bird = document.getElementById("bird");
let scoreDisplay = document.getElementById("score");

let isDragging = false;
let startX, startY;
let currentX = 100, currentY = 300;
let velocityX = 0, velocityY = 0;
let gravity = 0.5;
let isFlying = false;
let score = 0;

// تعيين الموقع الأولي للطائر
bird.style.left = currentX + "px";
bird.style.top = currentY + "px";

// بدء السحب (ماوس أو لمس)
function startDrag(e) {
    if (isFlying) return;
    isDragging = true;
    let pageX = e.touches ? e.touches[0].pageX : e.pageX;
    let pageY = e.touches ? e.touches[0].pageY : e.pageY;
    startX = pageX;
    startY = pageY;
}

// أثناء السحب
function moveDrag(e) {
    if (!isDragging) return;
    let pageX = e.touches ? e.touches[0].pageX : e.pageX;
    let pageY = e.touches ? e.touches[0].pageY : e.pageY;
    
    let dx = pageX - startX;
    let dy = pageY - startY;
    
    bird.style.left = (currentX + dx) + "px";
    bird.style.top = (currentY + dy) + "px";
}

// الإفلاق والرمي
function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    
    let endX = parseInt(bird.style.left);
    let endY = parseInt(bird.style.top);
    
    // حساب قوة وسرعة الرمية بناءً على مسافة السحب
    velocityX = (currentX - endX) * 0.15;
    velocityY = (currentY - endY) * 0.15;
    
    isFlying = true;
    animate();
}

// تحريك الطائر في الهواء بالفيزياء (جاذبية وسرعة)
function animate() {
    if (!isFlying) return;
    
    let posX = parseFloat(bird.style.left);
    let posY = parseFloat(bird.style.top);
    
    velocityY += gravity; // تطبيق الجاذبية
    
    posX += velocityX;
    posY += velocityY;
    
    bird.style.left = posX + "px";
    bird.style.top = posY + "px";
    
    // إذا طلع خارج الشاشة أو نزل للأرض يعود لمكانه الأصلي
    if (posY > window.innerHeight || posX > window.innerWidth || posX < -100) {
        resetBird();
    } else {
        requestAnimationFrame(animate);
    }
}

function resetBird() {
    isFlying = false;
    bird.style.left = currentX + "px";
    bird.style.top = currentY + "px";
}

// أحداث الماوس واللمس للجوال
bird.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", endDrag);

bird.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", moveDrag);
document.addEventListener("touchend", endDrag);
