let gridSize = 16;

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear everything you drew do far?")) {
    // do the grid cleanup

    //

    gridSize = prompt("Please, inform a new grid size in pixels. (16 = 16px by 16px grid, 32 = 32px by 32px grid");
  }
});

const container = document.querySelector(".container");

generateGrid(gridSize);

function generateGrid(gridSize) {
  for (let i = 1;i <= gridSize;i++) {
    const colBlock = document.createElement("div", { id: `col${i}`, className: "col-wrapper" });
    container.appendChild(colBlock);

    for (let j = 1;j <= gridSize;j++) {
      const innerBlock = document.createElement("div", id = { id: `${j}x${i}`, className: "row" });
      colBlock.appendChild(innerBlock);
    }
  }
}