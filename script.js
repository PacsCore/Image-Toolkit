const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let currentImage = null;
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
    canvas.width = isSideways ? currentImage.height : currentImage.width;
    canvas.height = isSideways ? currentImage.width : currentImage.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.drawImage(currentImage, 0, 0, newWidth, newHeight);
});

resizeBtn.addEventListener('click', function() {
    if (!currentImage) return;

    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0, newWidth, newHeight);
});