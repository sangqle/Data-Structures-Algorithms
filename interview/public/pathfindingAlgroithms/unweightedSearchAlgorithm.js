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
