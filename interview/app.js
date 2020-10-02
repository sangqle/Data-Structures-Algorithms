// Create the matrix of roads
let A = [];
let listNodes = []; // The list of node is traversing
let board = {
  start: {},
  des: {},
  width: 50,
  height: 20,
  isDrawing: false,
};
(function setup() {
  makeGrid();
  document.getElementById("bfs").addEventListener("click", bfs);

  document.getElementById("dfs").addEventListener("click", dfs);

  document.getElementById("random-maze").addEventListener("click", randomMaze);

  document.getElementById("dijkstra").addEventListener("click", dijkstra);

  console.log("hello");
})();

function makeGrid() {
  // make A as zero board
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

  // Add event listener for every td tag
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
}
// Check 2 point is the same thing
function isSamePosition(x1, x2) {
  if (x1.x === x2.x && x1.y === x2.y) return true;
  return false;
}

// Drawing the path
function drawPath() {
  setTimeout(() => {
    let n = routes.length - 1;
    setInterval(() => {
      if (n > 0) {
        let currentId = `${routes[n].x}-${routes[n].y}`;
        let currentElement = document.getElementById(currentId);
        currentElement.classList.add("path");
        n--;
      }
    }, 20);
  }, listNodes.length * 20);
}

// Visualization nodes is traverse
function nodesTraverse() {
  let k = 0;
  setInterval(() => {
    if (k < listNodes.length) listNodes[k++].classList.add("check");
  }, 20);
}

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

let routes = [];
function bfs(e) {
  let Q = [];
  let parent = {};
  let start = board.start;
  Q.push(start);
  let head;
  while (Q.length > 0) {
    head = Q.shift();
    if (head.x === board.des.x && head.y === board.des.y) break;
    let neighbours = list_neighbours(head);
    for (let i = 0; i < neighbours.length; i++) {
      neighbours[i].parent = head;
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
  // Resere the path
  while (head.parent) {
    routes.push(head);
    head = head.parent;
  }
  // Visualization checking
  nodesTraverse();
  // Show the path
  drawPath();
}

// Depth first search
function dfs() {
  let S = [];
  let parent = {};
  let start = board.start;
  S.push(start);
  let head;
  while (S.length > 0) {
    head = S.pop();
    if (head.x === board.des.x && head.y === board.des.y) break;
    let neighbours = list_neighbours(head);
    for (let i = neighbours.length - 1; i >= 0; i--) {
      neighbours[i].parent = head;
      S.push(neighbours[i]);
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
  while (head.parent) {
    routes.push(head);
    head = head.parent;
  }
  nodesTraverse();
  drawPath();
}

function randomMaze() {
  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      let random = Math.floor(Math.random() * 2);
      if (
        random &&
        i !== board.start.x &&
        i !== board.des.x &&
        j !== board.start.y &&
        j !== board.des.y
      ) {
        let currentId = `${i}-${j}`;
        let currentElement = document.getElementById(currentId);
        A[i][j] = 0;
        currentElement.className = "wall";
      }
    }
  }
}
// Clear path
// document.getElementById("clear-path").addEventListener("click", clearPath);
// function clearPath() {
//   for (let i = 0; i < board.height; i++) {
//     for (let j = 0; j < board.width; j++) {
//       let currentId = `${i}-${j}`;
//       let currentElement = document.getElementById(currentId);
//       let currentPoint = {
//         x: i,
//         y: j,
//       };
//       if (
//         !isSamePosition(currentPoint, board.start) &&
//         !isSamePosition(currentPoint, board.des)
//       ) {
//         A[i][j] = 1;
//         currentElement.classList = ["unvisited"];
//       }
//     }
//   }
// }
// Dijstra's Algorithm
function dijkstra() {
  // Create route table for Dijkstra
  let routeTable = [];
  for (let i = 0; i < board.height; i++) {
    let row = [];
    for (let j = 0; j < board.width; j++) {
      row.push(0);
    }
    routeTable.push(row);
  }
  // parent
  let parent = [];
  // Initialize infinity values
  let infinity = 999999;
  for (let i = 0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      let currentPoint = { x: i, y: j };
      if (
        !isSamePosition(board.start, currentPoint) &&
        !isSamePosition(board.des, currentPoint)
      ) {
        routeTable[i][j] = infinity;
      }
    }
  }
  // Dijkstra's algorithm
  // let sPoint = board.start;
  // let i = 0;
  // while (i < 50 * 20) {
  //   if (isSamePosition(sPoint, board.des)) return;
  //   /* 1. Update route cost for neighbours and find the min point
  //    */
  //   let neighbours = list_neighbours(sPoint);
  //   let min = infinity;
  //   let nextPoint;
  //   for (let k = 0; k < neighbours.length; k++) {
  //     let neighbour = neighbours[k];
  //     let { x, y } = neighbour;
  //     if (
  //       A[x][y] !== 0 &&
  //       routeTable[sPoint.x][sPoint.y] + 1 < routeTable[x][y]
  //     ) {
  //       routeTable[x][y] = routeTable[sPoint.x][sPoint.y] + 1; // edit here
  //       if (routeTable[x][y] < min) {
  //         min = routeTable[x][y];
  //         nextPoint = { x, y }; // update next point
  //         sPoint = nextPoint;
  //       }
  //       let neighbourId = `${x}-${y}`;
  //       let neighbour = document.getElementById(neighbourId);
  //       let neighbourClassList = [...neighbour.classList];
  //       if (
  //         !neighbourClassList.includes("neighbour") &&
  //         !neighbourClassList.includes("start") &&
  //         !neighbourClassList.includes("des")
  //       ) {
  //         neighbour.classList.add("neighbour");
  //         listNodes.push(neighbour);
  //       }
  //     }
  //   }
  //   /** Next point */

  //   i++;
  // }

  // let k = 0;
  // setInterval(() => {
  //   if (k < listNodes.length) listNodes[k++].classList.add("check");
  // }, 10);
  // console.log(routeTable);
  // console.log("dijstra");
}
