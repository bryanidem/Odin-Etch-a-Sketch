const display = document.querySelector(".display");
const btnGridResolution = document.querySelector(".btn-grid");
const modalGridResolution = document.querySelector(".modal-grid-res");
const formChangeRes = document.querySelector(".modal-grid-res > form");

const btnColorMode = document.querySelector(".btn-color");
const modalColorMode = document.querySelector(".modal-color");
const formColorMode = document.querySelector(".modal-color > form");

const btnErase = document.querySelector(".btn-erase");

let gridResolution = 32;
let colorSchema = "gray";
const colors = {
  gray: ["#4a5759"],
  rainbow: ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
  green: ["#354f52", "#354f52", "#52796f", "#84a98c", "#cad2c5"],
  pop: ["#e4c1f9", "#a9def9", "#d0f4de", "#fcf6bd", "#ff99c8"],
  vintage: ["#bc4b51", "#5b8e7d", "#f4a259", "#f4e285", "#8cb369"],
};

let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};

document.body.onmouseup = () => {
  mouseDown = false;
};

const changeColor = (e) => {
  if (mouseDown) {
    const color = colors[colorSchema];
    e.target.style.background = color[Math.floor(Math.random() * color.length)];
  }
};

const fillGridWithDivs = (display, gridResolution) => {
  const totalPixels = gridResolution * gridResolution;

  for (let i = 0; i < totalPixels; i++) {
    const pixel = document.createElement("div");
    pixel.style.width = `calc(480px / ${gridResolution})`;
    pixel.style.height = `calc(480px / ${gridResolution})`;
    pixel.classList.add("pixel");
    pixel.addEventListener("mouseover", changeColor);
    display.appendChild(pixel);
  }
};

formChangeRes.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formChangeRes);
  const formObject = Object.fromEntries(formData);
  const newResolution = formObject["resolution"];
  display.replaceChildren();
  gridResolution = parseInt(newResolution);
  fillGridWithDivs(display, gridResolution);
  modalGridResolution.close();
});

formColorMode.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formColorMode);
  const formObject = Object.fromEntries(formData);
  colorSchema = formObject["colors"];
  modalColorMode.close();
});

const openModal = (buttonActivateModal, modal) => {
  buttonActivateModal.addEventListener("click", () => {
    modal.showModal();
  });
};

btnErase.addEventListener("click", () => {
  display.replaceChildren();
  fillGridWithDivs(display, gridResolution);
});

fillGridWithDivs(display, gridResolution);
openModal(btnGridResolution, modalGridResolution);
openModal(btnColorMode, modalColorMode);
