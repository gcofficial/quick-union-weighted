function root (ids, index) {
  while (index != ids[index]) {
    index = ids[index]
  }
  return index
}

/**
 * Connect two indexes.
 *
 * @param {array} ids All indexes and connections.
 * @param {number} from From index.
 * @param {number} to To index.
 */
function union (ids, from, to, sz) {
  const fromRoot = root(ids, from)
  const toRoot = root(ids, to)

  if (fromRoot === toRoot) {
    return ids
  }

  if (sz[fromRoot] < sz[toRoot]) {
    ids[fromRoot] = toRoot
    sz[toRoot] += sz[fromRoot]
  } else {
    ids[toRoot] = fromRoot
    sz[fromRoot] += sz[toRoot]
  }

  return ids
}

/**
 * Is two indexes connected?
 *
 * @param {array} ids All indexes and connections.
 * @param {number} from From index.
 * @param {number} to To index.
 */
function isConnected (ids, from, to) {
  return root(ids, from) === root(ids, to)
}