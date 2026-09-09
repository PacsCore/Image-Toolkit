# Image Toolkit

A client-side image editor built with vanilla HTML, CSS, and JavaScript. Upload an image, edit it entirely in the browser, and download the result — no server, no backend, no image ever leaves your machine.

## Features

- **Upload & preview** — pick any image file and see it rendered on canvas
- **Rotate** — rotate in 90° increments
- **Resize** — set custom width/height dimensions
- **Filters** — grayscale and sepia
- **Reset colors** — undo a filter without losing rotation or resize changes
- **Download** — save the edited image as a PNG

## How it works

Everything happens through the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). The image is read locally with the File API and `FileReader`, drawn onto a `<canvas>` element, and pixel-level filters are applied directly via `getImageData`/`putImageData`.

## Running it

No build step or dependencies. Just open `index.html` in a browser.

## Built with

HTML, CSS, JavaScript — no frameworks, no libraries.