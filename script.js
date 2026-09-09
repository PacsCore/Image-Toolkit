const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let currentImage = null;
let baseWidth = 0;
let baseHeight = 0;
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const lockRatio = document.getElementById('lockRatio');
const resizeBtn = document.getElementById('resizeBtn');

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        currentImage = new Image();

        currentImage.onload = function () {
            canvas.width = currentImage.width;
            canvas.height = currentImage.height;
            ctx.drawImage(currentImage, 0, 0);

            widthInput.value = currentImage.width;
            heightInput.value = currentImage.height;
            baseWidth = currentImage.width;
            baseHeight = currentImage.height;
        };

        currentImage.src = e.target.result;
    };
 reader.readAsDataURL(file);
});


const rotateBtn = document.getElementById('rotateBtn');
let rotationAngle = 0;

rotateBtn.addEventListener('click', function() {
    if (!currentImage) return;

    rotationAngle += 90;

    const isSideways = rotationAngle % 180 !== 0;
    canvas.width = isSideways ? baseHeight : baseWidth;
    canvas.height = isSideways ? baseWidth : baseHeight;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(currentImage, -baseWidth / 2, -baseHeight / 2, baseWidth, baseHeight);
});

resizeBtn.addEventListener('click', function() {
    if (!currentImage) return;

    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);

    canvas.width = newWidth;
    canvas.height = newHeight;
    baseWidth = newWidth;
    baseHeight = newHeight;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0, newWidth, newHeight);
});

const grayscaleBtn = document.getElementById('grayscaleBtn');
const sepiaBtn = document.getElementById('sepiaBtn');
const resetColorsBtn = document.getElementById('resetColorsBtn');
let preFilterSnapshot = null;

function saveSnapshotIfNeeded() {
    if (!preFilterSnapshot) {
        preFilterSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}

function resetToOriginal() {
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0);
}

grayscaleBtn.addEventListener('click', function() {
    saveSnapshotIfNeeded();
    if (!currentImage) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
});

sepiaBtn.addEventListener('click', function() {
    saveSnapshotIfNeeded();
    if (!currentImage) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        data[i]     = (r * 0.393) + (g * 0.769) + (b * 0.189);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    }

    ctx.putImageData(imageData, 0, 0);
});

resetColorsBtn.addEventListener('click', function() {
    if (!preFilterSnapshot) return;
    ctx.putImageData(preFilterSnapshot, 0, 0);
    preFilterSnapshot = null;
});