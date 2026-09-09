const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let currentImage = null;

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
    ctx.drawImage(currentImage, -currentImage.width / 2, -currentImage.height / 2);
});