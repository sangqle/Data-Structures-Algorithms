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

// Create the matrix of roads
let A = [];
for (let i = 0; i < board.height; i++) {
  let row = [];
  for (let j = 0; j < board.width; j++) {
    row.push(1);
  }
  A.push(row);
}

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
    // td.textContent = currentId;
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
  //   console.log("mouse enter");
  let node = e.target;
  if (board.isDrawing === true) {
    if (node.className == "unvisited") {
      node.className = "wall";
      let point = node.id.split("-");
      let i = parseInt(point[0]);
      let j = parseInt(point[1]);
      A[i][j] = 0;
    }
  }
}
function mouseLeave(e) {
  //   e.preventDefault();
  //   console.log(e);
  //   console.log("mouse leave");
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
  //   console.log("mouse is down");
  event.preventDefault();
  board.isDrawing = true;
}

function mouseUp() {
  //   console.log("mouse is up");
  if (board.isDrawing === true) board.isDrawing = false;
}

document.getElementById("A").addEventListener("click", () => {
  console.log(A);
});
document.getElementById("bfs").addEventListener("click", bfs);

function list_neighbours(point) {
  let res = [];
  let x = point.x;
  let y = point.y;

  if (x < board.height - 1) {
    let currentId = `${x + 1}-${y}`;
    let currentElement = document.getElementById(currentId);
    if (
      ![...currentElement.classList].includes("neighbour") &&
      A[x + 1][y] !== 0
    )
      res.push({ x: x + 1, y });
  }
  if (y < board.width - 1) {
    let currentId = `${x}-${y + 1}`;
    let currentElement = document.getElementById(currentId);
    if (
      ![...currentElement.classList].includes("neighbour") &&
      A[x][y + 1] !== 0
    )
      res.push({ x, y: y + 1 });
  }
  if (x > 0) {
    let currentId = `${x - 1}-${y}`;
    let currentElement = document.getElementById(currentId);
    if (
      ![...currentElement.classList].includes("neighbour") &&
      A[x - 1][y] !== 0
    )
      res.push({ x: x - 1, y });
  }
  if (y > 0) {
    let currentId = `${x}-${y - 1}`;
    let currentElement = document.getElementById(currentId);
    if (
      ![...currentElement.classList].includes("neighbour") &&
      A[x][y - 1] !== 0
    )
      res.push({ x, y: y - 1 });
  }

  return res;
}

let listNodes = [];
function bfs(e) {
  let Q = [];
  let start = board.start;
  Q.push(start);
  while (Q.length > 0) {
    let head = Q.shift();
    if (head.x === board.des.x && head.y === board.des.y) break;
    let neighbours = list_neighbours(head);
    for (let i = 0; i < neighbours.length; i++) {
      Q.push(neighbours[i]);
      let neighbourId = `${neighbours[i].x}-${neighbours[i].y}`;
      let neighbour = document.getElementById(neighbourId);
      let neighbourClassList = [...neighbour.classList];
      if (
        !neighbourClassList.includes("neighbour") &&
        !neighbourClassList.includes("start") &&
        !neighbourClassList.includes("des")
      ) {
        neighbour.classList.add("neighbour");
        listNodes.push(neighbour);
      }
    }
  }
  let k = 0;
  setInterval(() => {
    if (k < listNodes.length) listNodes[k++].classList.add("check");
  }, 20);
}
