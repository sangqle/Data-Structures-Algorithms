(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function launchInstantAnimations(board, success, type) {
  setInterval(() => {
    let currentNode = board.nodesToAnimate.shift();
    if (!currentNode) return;
    let currentElement = document.getElementById(currentNode.id);
    if (currentNode.id !== board.target && currentNode.id !== board.start)
      currentElement.className = currentNode.status;
    console.log(currentNode);
  }, 10);
}
module.exports = launchInstantAnimations;

},{}],2:[function(require,module,exports){
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

},{"./animations/launchInstantAnimations":1,"./node":3,"./pathfindingAlgroithms/unweightedSearchAlgorithm":4}],3:[function(require,module,exports){
function Node(id, status) {
  this.id = id;
  this.status = status;
  this.previousNode = null;
  this.path = null;
  this.direction = null;
  this.distance = Infinity;
}
module.exports = Node;

},{}],4:[function(require,module,exports){
function unweightedSearchAlgorithm(
  nodes,
  start,
  target,
  boardArray,
  algorithmName,
  nodesToAnimate
) {
  if (!start || !target || start === target) {
    return false;
  }

  let structure = [nodes[start]]; // structure can be eithir Stack or Queue demand on the name of algorithm(BFS or DFS)
  let exploredNodes = { start: true };
  while (structure.length) {
    let currentNode;
    if (algorithmName === "bfs") {
      currentNode = structure.shift();
    } else {
      currentNode = structure.pop();
    }
    nodesToAnimate.push(currentNode);
    // update current node is check
    currentNode.status = "visited";
    if (currentNode.id === target) {
      return "success";
    }
    let currentNeighbors = getNeighbors(
      currentNode.id,
      nodes,
      boardArray,
      algorithmName
    );
    currentNeighbors.forEach((neighbor) => {
      if (!exploredNodes[neighbor]) {
        if (algorithmName === "bfs") {
          exploredNodes[neighbor] = true;
        }
        nodes[neighbor].previousNode = currentNode.id;
        structure.push(nodes[neighbor]);
      }
    });
  }
  return false;
}

function getNeighbors(id, nodes, boardArray, algorithmName) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbor = `${(x - 1).toString()}-${y.toString()}`; // exp: "0-0", "0-1"
    if (nodes[potentialNeighbor].status !== "wall") {
      if (algorithmName === "bfs") {
        neighbors.push(potentialNeighbor);
      }
    }
  }
  if (boardArray[x][y + 1]) {
    potentialNeighbor = `${x.toString()}-${(y + 1).toString()}`;
    if (nodes[potentialNeighbor].status !== "wall") {
      if (algorithmName === "bfs") {
        neighbors.push(potentialNeighbor);
      }
    }
  }
  if (boardArray[x + 1] && boardArray[x + 1][y]) {
    potentialNeighbor = `${(x + 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbor].status !== "wall") {
      neighbors.push(potentialNeighbor);
    }
  }
  if (boardArray[x][y - 1]) {
    potentialNeighbor = `${x.toString()}-${(y - 1).toString()}`;

    if (nodes[potentialNeighbor].status !== "wall") {
      if (algorithmName === "bfs") {
        neighbors.push(potentialNeighbor);
      }
    }
  }
  return neighbors;
}
module.exports = unweightedSearchAlgorithm;

},{}]},{},[2]);
