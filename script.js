let gridSize = 16;
let drawingMode/*'pen' | 'eraser'*/ = 'pen';
const container = document.querySelector(".canvas");

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear everything you drew do far?")) {

    gridSize = prompt("Please, inform a new grid size in pixels. (16 = 16px by 16px grid, 32 = 32px by 32px grid");

    // do the grid cleanup
    // generateGrid(gridSize, container)
    //
  }
});

generateGrid(gridSize, container);

// HTML5's drag events breaks this kind of app, and there's no easier/better way for disabling it other than the code below
['dragstart', 'drag', 'dragover', 'dragenter', 'dragleave', 'drop', 'dragend'].forEach(eventType => {
  window.addEventListener(eventType, e => {
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false }); // passive: false needed for preventDefault to work in some browsers
});

document.addEventListener("mousedown", (e) => {
  console.log(e.target.id);
  if (e.target.className.includes("row")) handleDrawing(e);
  container.addEventListener("mousemove", handleDrawing);
});

document.addEventListener("mouseup", (e) => {
  container.removeEventListener("mousemove", handleDrawing);
  if (e.target.className === "tool") drawingMode = e.target.id;
});

function handleDrawing(event) {
  block = event.target;
  if (!(block.className.includes("painted")) && drawingMode === "pen") {
    block.setAttribute("class", "row painted");
    return;
  }

  if (block.className.includes("painted") && drawingMode === "eraser") {
    block.setAttribute("class", "row");
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
      innerBlock.setAttribute("class", "row");
      innerBlock.setAttribute("id", `${j}x${i}`);
      colBlock.appendChild(innerBlock);
    }
  }
}