let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};

document.body.onmouseup = () => {
  mouseDown = false;
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

const changeColor = (e) => {
  if (mouseDown) {
    e.target.style.background = "red";
  }
};

const getFormData = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
  });
};

const changeDisplayRes = (form, display, modal) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    const newResolution = formObject["resolution"];
    display.replaceChildren();
    fillGridWithDivs(display, parseInt(newResolution));
    modal.close();
  });
};

const openModal = (buttonActivateModal, modal) => {
  buttonActivateModal.addEventListener("click", () => {
    modal.showModal();
  });
};

const main = () => {
  const display = document.querySelector(".display");
  const btnGridResolution = document.querySelector(".btn-grid");
  const modalGridResolution = document.querySelector(".modal-grid-res");
  const btnModalChangeRes = document.querySelector(".submit-change-res");
  const formChangeRes = document.querySelector(".modal-grid-res > form");
  let gridResolution = 32;

  fillGridWithDivs(display, gridResolution);
  openModal(btnGridResolution, modalGridResolution);
  changeDisplayRes(formChangeRes, display, modalGridResolution);

  // btnGridResolution.addEventListener("click", () => {
  //   modalGridResolution.showModal();
  // });
};

main();
