const CANVAS_BACKGROUND_COLOR = "transparent";

const initialGridSize = 16;

const container = document.querySelector(".canvas");
const colorPicker = document.querySelector("#color-picker");

document.getElementById("reset").addEventListener("click", () => {
  if (!confirm("Are you sure you want to clear everything you drew do far?")) return;

  let newGridSize = prompt("Please, inform a new grid size in pixels. (16 gives a 16x16 grid, 32 gives a 32x32 grid).\n\n" +
    "Note that you can only set a grid with a maximum of 100x100."
  );

  let i = 1;
  while (Number(newGridSize) > 100 || Number(newGridSize) === 0 || isNaN(Number(newGridSize))) {
    if (i >= 5) {
      newGridSize = prompt("Are you dumb, or are you just pretending to be?\n\n" +
        "Why do you feel the need to test every f@$k##@ use case of a f#@!$@g drawing app made for the sole purpose of being a goofy a$$ javascript side project?");
      i++;
      continue;
    }

    if (Number(newGridSize) === 0) {
      newGridSize = prompt("You can't create a 0x0 grid. Please, give the app an input it can handle (something equal or below 100, but obviously not 0).");
      i++;
      continue;
    }

    if (isNaN(Number(newGridSize))) {
      newGridSize = prompt(`What even is "${newGridSize}"? Please, give the app an input it can handle (something equal or below 100, but obviously not what "${newGridSize}" should represent).`);
      i++;
      continue;
    }

    newGridSize = prompt(`${newGridSize} is too long of a value. Please, give the app an input it can handle (something equal or below 100).`);
  }

  container.replaceChildren("");
  generateGrid(newGridSize, container);
});

generateGrid(initialGridSize, container);

// HTML5's drag events breaks this kind of app, and there's no easier/better way for disabling it other than the code below
['dragstart', 'drag', 'dragover', 'dragenter', 'dragleave', 'drop', 'dragend'].forEach(eventType => {
  window.addEventListener(eventType, e => {
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false }); // passive: false needed for preventDefault to work in some browsers
});

container.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("mousedown", (e) => {
  if (e.button === 2) e.preventDefault();
  if (e.target.className.includes("row")) handleDrawing(e);
  container.addEventListener("mouseover", handleDrawing);
});

document.addEventListener("mouseup", (e) => {
  container.removeEventListener("mouseover", handleDrawing);
});

function handleDrawing(event) {
  block = event.target;

  console.log(event);

  if ((event.button === 0 && event.type === "mousedown") || (event.buttons === 1 && event.type === "mouseover")) {
    block.style.backgroundColor = colorPicker.value;
    return;
  }

  if ((event.button === 2 && event.type === "mousedown") || (event.buttons === 2 && event.type === "mouseover")) {
    block.style.backgroundColor = CANVAS_BACKGROUND_COLOR;
    return;
  }
};

function generateGrid(gridSize, container) {
  for (let i = 1;i <= gridSize;i++) {
    const colBlock = document.createElement("div");
    colBlock.setAttribute("class", "col-wrapper");
    container.appendChild(colBlock);

    for (let j = 1;j <= gridSize;j++) {
      const innerBlock = document.createElement("div");
      innerBlock.className = "row"; innerBlock.id = `${j}x${i}`;

      // This should've really been coded inside of style.css, but to allow users to use the color picker, i chose 
      // to handle the coloring logic with javascript
      innerBlock.style.backgroundColor = CANVAS_BACKGROUND_COLOR;

      colBlock.appendChild(innerBlock);
    }
  }
}