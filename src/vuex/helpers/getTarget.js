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
