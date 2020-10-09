function shortestPathAnimations(shortestNodesAnimations) {
  let index = shortestNodesAnimations.length - 1;
  timeout(index);
  function timeout(index) {
    setTimeout(() => {
      if (index <= 0) return;
      let currentNode = shortestNodesAnimations[index];
      let currentElement = document.getElementById(currentNode.id);
      currentElement.className = "path";
      timeout(--index);
    }, 20);
  }
  //   console.log(shortestNodesAnimations);
}
module.exports = shortestPathAnimations;
