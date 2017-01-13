/**
 * Helper function returning a “target” position within a tree of nodes by
 * following an array of “breadcrumbs”
 * @module
 *
 * @param {Object} tree - a tree of nodes with child_nodes properties to climb
 * @param {Number[]} breadcrumbs - an array of node IDs to trace up the tree
 *
 * @returns {Object} - target node from the provided tree
 */
export default function getTarget (tree, breadcrumbs) {
  // find place in the tree by following breadcrumbs
  let target = tree
  if (breadcrumbs !== null) {
    for (var i = 0; i < breadcrumbs.length; i++) {
      let index = breadcrumbs.length - 1 - i
      target = target.child_nodes[breadcrumbs[index]]
    }
  }
  return target
}
