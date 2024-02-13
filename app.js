const fillGridWithDivs = (display, gridResolution) => {
  const totalPixels = gridResolution * gridResolution;
  for (let i = 0; i < totalPixels; i++) {
    const pixel = document.createElement("div");
    pixel.style.width = `calc(480px / ${gridResolution})`;
    pixel.style.height = `calc(480px / ${gridResolution})`;
    pixel.classList.add("pixel");
    display.appendChild(pixel);
  }
};

const main = () => {
  const display = document.querySelector(".display");
  let gridResolution = 32;

  fillGridWithDivs(display, gridResolution);
};

main();
