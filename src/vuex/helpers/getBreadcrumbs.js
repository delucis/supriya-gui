/**
 * Helper function returning an array of “breadcrumbs” to a node in a tree of
 * nodes with parent IDs.
 * @module
 *
 * @param {Object} node
 * @param {Number} node.parent - ID of the parent of the node to be breadcrumbed
 * @param {Object} nodes
 * @param {Number} nodes[].parent - Each node in nodes is expected to have a parent property.
 *
 * @returns {(Number[]|null)} - An array of parent IDs tracing the given node’s ancestors.
 */
export default function getBreadcrumbs (node, nodes) {
  // build a “breadcrumbs” array for a given node by querying the properties
  // of all known nodes in a nodes object
  // the breadcrumbs give you the path to that node from the root of the tree,
  // e.g. [1002, 1, 0] implies this has an address of tree.0.1.1002.this
  if (node.parent !== null) {
    let id = node.parent
    let breadcrumbs = []
    breadcrumbs.push(id)
    while (nodes[id].hasOwnProperty('parent') && nodes[id].parent !== null) {
      breadcrumbs.push(nodes[id].parent)
      id = nodes[id].parent
    }
    return breadcrumbs
  } else {
    return null
  }
}
