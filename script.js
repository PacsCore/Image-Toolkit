const imageInput = document.getElementById('imageInput');
const Canvas = document.getElementById('imageCanvas');
const ctx = Canvas.getContext('2d');

imageInput.addEventListener('change', function() {
    console.log('file selected');
});
