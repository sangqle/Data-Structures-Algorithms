async function launchInstantAnimations(board, success, type) {
  let index = board.nodesToAnimate.length;
  timeout(index);
  function timeout(index) {
    setTimeout(() => {
      if (index === 0) {
        return;
      }
      let currentNode = board.nodesToAnimate.shift();
      if (!currentNode) return;
      let currentElement = document.getElementById(currentNode.id);
      if (currentNode.id !== board.target && currentNode.id !== board.start)
        currentElement.className = currentNode.status;
      // console.log(currentNode);
      timeout(--index);
    }, 20);
  }
}

module.exports = launchInstantAnimations;
