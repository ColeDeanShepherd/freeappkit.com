export function isNodeOrDescendant(targetNode: Node, node: Node): boolean {
  return targetNode === node || Array.from(node.childNodes).some((child) => isNodeOrDescendant(targetNode, child));
}

export function onElementAdded(targetNode: Node, callback: (node: Node) => void) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if our target node was added
        console.log(mutation.addedNodes);
        mutation.addedNodes.forEach((node) => {
          if (isNodeOrDescendant(targetNode, node)) {
            callback(node);
            observer.disconnect(); // Stop observing if no longer needed
          }
        });
      }
    }
  });

  // Start observing the document body for child node additions
  observer.observe(document.body, { childList: true, subtree: true });
}