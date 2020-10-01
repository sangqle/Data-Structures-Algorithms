console.log("Hello interview");
let start = {
  x: 0,
  y: 0,
};

let des = {
  x: 0,
  y: 0,
};

let board = {
  start: {},
  des: {},
  width: 50,
  height: 20,
  isDrawing: false,
};

// create board
let table = document.createElement("table");
table.setAttribute("id", "board");
document.body.appendChild(table);

for (let i = 0; i < board.height; i++) {
  let tr = document.createElement("tr");
  tr.setAttribute("id", `row-${i}`);
  for (let j = 0; j < board.width; j++) {
    let currentId = `${i}-${j}`;
    let td = document.createElement("td");
    td.setAttribute("id", currentId);
    td.setAttribute("class", "unvisited");
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

let boardHTML = document.getElementById("board");

for (let i = 0; i < board.height; i++) {
  for (let j = 0; j < board.width; j++) {
    let currentId = `${i}-${j}`;
    let currentElement = document.getElementById(currentId);
    currentElement.addEventListener("click", onClick);
    currentElement.addEventListener("mousedown", mouseDown);
    currentElement.addEventListener("mouseenter", mouseEnter);
    currentElement.addEventListener("mouseleave", mouseLeave);
    currentElement.addEventListener("mouseup", mouseUp);
  }
}

function mouseEnter(e) {
  console.log("mouse enter");
  let node = e.target;
  if (board.isDrawing === true) {
    if (node.className == "unvisited") node.className = "wall";
  }
}
function mouseLeave(e) {
  //   e.preventDefault();
  //   console.log(e);
  console.log("mouse leave");
}
function onClick(event) {
  let node = event.target;

  if (Object.keys(board.start).length == 0) {
    node.className = "start";
    let point = node.id.split("-");
    board.start.x = parseInt(point[0]);
    board.start.y = parseInt(point[1]);
  } else {
    node.className = "des";
    let point = node.id.split("-");
    board.des.x = parseInt(point[0]);
    board.des.y = parseInt(point[1]);
  }
}

function mouseDown(event) {
  console.log("mouse is down");
  event.preventDefault();
  board.isDrawing = true;
}

function mouseUp() {
  console.log("mouse is up");
  if (board.isDrawing === true) board.isDrawing = false;
}
