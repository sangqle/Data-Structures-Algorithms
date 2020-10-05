const unweightedSearchAlgorithm = require("./pathfindingAlgroithms/unweightedSearchAlgorithm");
const launchInstantAnimations = require("./animations/launchInstantAnimations");

const Node = require("./node");
function Board(height, width) {
  this.height = height;
  this.width = width;
  this.start = null;
  this.target = null;
  this.object = null;
  this.boardArray = []; // convert board gird nodes to array grid nodes
  this.nodes = {}; // storage nodes as object for travers path
  this.keyDown = false;
  this.mouseDown = false;
  this.speed = "fast";
  this.pressedNodeStatus = "normal";
  this.previouslySwitchedNode = null;
  this.previouslyPressedNodeStatus = null;
  this.currentAlgorithm = null;
  this.nodesToAnimate = [];
}

Board.prototype.initialise = function () {
  this.createGrid();
  this.addEventListeners();
};

// Create grid
Board.prototype.createGrid = function () {
  let table = document.createElement("table");
  table.setAttribute("id", "board");

  for (let row = 0; row < this.height; row++) {
    let currentArrayRow = [];
    let tr = document.createElement("tr");
    for (let col = 0; col < this.width; col++) {
      let newNodeId = `${row}-${col}`;
      let newNodeClass, newNode;
      if (
        row === Math.floor(this.height / 2) &&
        col === Math.floor(this.width / 4)
      ) {
        newNodeClass = "start";
        this.start = newNodeId;
      } else if (
        row === Math.floor(this.height / 2) &&
        col === 3 * Math.floor(this.width / 4)
      ) {
        newNodeClass = "target";
        this.target = newNodeId;
      } else {
        newNodeClass = "unvisited";
      }
      newNode = new Node(newNodeId, newNodeClass);
      currentArrayRow.push(newNode);
      let td = document.createElement("td");
      this.nodes[newNodeId] = newNode;
      // Update html element
      td.setAttribute("class", newNodeClass);
      td.setAttribute("id", newNodeId);
      tr.appendChild(td);
    }
    this.boardArray.push(currentArrayRow);
    // Update html element
    table.appendChild(tr);
  }
  document.body.appendChild(table);
};

// Event listeners
Board.prototype.addEventListeners = function () {
  let board = this;
  for (let row = 0; row < board.height; row++) {
    for (let col = 0; col < board.width; col++) {
      let currentId = `${row}-${col}`;
      let currentNode = board.getNode(currentId);
      let currentElement = document.getElementById(currentId);
      currentElement.onmousedown = (e) => {
        e.preventDefault();
        board.mouseDown = true;
        if (
          currentNode.status === "start" ||
          currentNode.status === "target" ||
          currentNode.status === "object"
        ) {
          board.pressedNodeStatus = currentNode.status;
        } else {
          board.pressedNodeStatus = "normal";
          board.changeNormalNode(currentNode); // Change node mode to wall or object here
        }
      };
      currentElement.onmouseup = (e) => {
        board.mouseDown = false;
        if (board.pressedNodeStatus === "start") {
          board.start = currentId;
        } else if (board.pressedNodeStatus === "target") {
          board.target = currentId;
        } else if (board.pressedNodeStatus === "object") {
          board.object = currentId;
        }
        board.pressedNodeStatus = "normal";
      };
      currentElement.onmouseenter = (e) => {
        if (board.mouseDown && board.pressedNodeStatus !== "normal") {
          board.changeSpecialNode(currentNode);
          if (board.pressedNodeStatus === "start") {
            board.start = currentId;
          } else if (board.pressedNodeStatus === "target") {
            board.target = currentId;
          }
        }
      };
      currentElement.onmouseleave = (e) => {
        if (board.mouseDown && board.pressedNodeStatus !== "normal") {
          board.changeSpecialNode(currentNode); // How to know the change special node call from here
        }
      };
    }
  }
};

// Change special node
Board.prototype.changeSpecialNode = function (currentNode) {
  console.log(this);
  let element = document.getElementById(currentNode.id);
  let previousElement;
  if (this.previouslySwitchedNode)
    previousElement = document.getElementById(this.previouslySwitchedNode.id); // When leave event is call
  // Update status of previouse element then update status for new node which mouse up
  if (
    currentNode.status !== "start" &&
    currentNode.status !== "target" &&
    currentNode.status !== "object"
  ) {
    // When mouse enter
    if (this.previouslySwitchedNode) {
      this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
      previousElement.className = "unvisited";
      this.previouslySwitchedNode = null;
      this.previouslyPressedNodeStatus = currentNode.status;
      element.className = this.pressedNodeStatus; // update new class name for the normal node
      currentNode.status = this.pressedNodeStatus;
    }
  } else if (currentNode.status !== this.pressedNodeStatus) {
    this.previouslySwitchedNode.status = this.pressedNodeStatus;
    previousElement.className = this.pressedNodeStatus;
  } else if (currentNode.status === this.pressedNodeStatus) {
    this.previouslySwitchedNode = currentNode; // Initialize when the first step start or taget node is move
    element.className = this.previouslyPressedNodeStatus;
    currentNode.status = this.previouslyPressedNodeStatus;
  }
};

// Change normal node
Board.prototype.changeNormalNode = function (currentNode) {
  let element = document.getElementById(currentNode.id);
  let relevantStatus = ["start", "target", "object"];
  let unweightedAlgorithms = ["dfs", "bfs"];
};
// Create maze
Board.prototype.createMazeOne = function () {};

// Clear path
Board.prototype.clearPath = function () {};

// Board get node
Board.prototype.getNode = function (id) {
  let coordinates = id.split("-");
  let row = parseInt(coordinates[0]);
  let col = parseInt(coordinates[1]);
  return this.boardArray[row][col];
};

Board.prototype.instantAlgorithm = function () {
  let unweightedAlgorithms = ["dfs", "bfs"];
  let success = unweightedSearchAlgorithm(
    this.nodes,
    this.start,
    this.target,
    this.boardArray,
    this.currentAlgorithm,
    this.nodesToAnimate
  );
  launchInstantAnimations(this, success, "unweighted");
};

Board.prototype.redoAlgorithm = function () {
  this.instantAlgorithm();
};
let height = 20;
let width = 50;
let newBoard = new Board(height, width);
newBoard.initialise();

// Add event listenver for button
document.getElementById("bfs").addEventListener("click", () => {
  newBoard.currentAlgorithm = "bfs";
  newBoard.redoAlgorithm();
});

document.getElementById("dfs").addEventListener("click", () => {
  newBoard.currentAlgorithm = "dfs";
  newBoard.redoAlgorithm();
});
