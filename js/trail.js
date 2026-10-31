// hover trail: fills .trail-grid with one li per 16px square
const grid = document.querySelector(".trail-grid");

function fill() {
  const need = Math.ceil(innerWidth / 16) * Math.ceil(innerHeight / 16);
  const cells = document.createDocumentFragment();
  for (let i = grid.children.length; i < need; i++) cells.append(document.createElement("li"));
  grid.append(cells);
}

if (grid && matchMedia("(hover: hover)").matches) {   // skip touch screens
  fill();
  addEventListener("resize", fill);
}
