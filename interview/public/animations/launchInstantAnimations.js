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
