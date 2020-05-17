function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function indexToCordinates (index) {
  const y = Math.floor(index / blocksLength)
  const x = index - (blocksLength * y)
  return {
    x,
    y
  }
}

function createBlackRect () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, percolationSize, percolationSize);
}

function getBlockIndex (x, y) {
  return x + y * blocksLength
}

function fill () {
  for (let y = 0; y < blocksLength; y++) {
    for (let x = 0; x < blocksLength; x++) {
      const index = getBlockIndex(x, y)
      if (filledPercolations[index] === true) {
        if (isConnected(connections, -1, index)) {
          context.fillStyle = 'red'
        } else {
          context.fillStyle = 'white'
        }
        context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
      }
    }
  }
  if (!isConnected(connections, -1, size) && !stopped) {
    start()
  }
}

function start () {
  stopped = false
  const rndIndex = whiteIndexes.pop()
  filledPercolations[rndIndex] = true

  const { x, y } = indexToCordinates(rndIndex)

  const left = x > 0 ? getBlockIndex(x - 1, y) : Infinity
  const right = x < blocksLength - 1 ? getBlockIndex(x + 1, y) : Infinity
  const bottom = y < blocksLength - 1 ? getBlockIndex(x, y + 1) : size
  const top = y > 0 ? getBlockIndex(x, y - 1) : -1
  const sides = [left, right, bottom, top]


  console.log({
    current: rndIndex,
    left,
    right,
    bottom,
    top,
    x,
    y
  })
  sides.forEach(
    index => {
      if (filledPercolations[index] === true) {
        union(connections, rndIndex, index, branchSizes)
      }
    }
  )

  setTimeout(
    () => requestAnimationFrame(fill),
    0
  )
}

function stop () {
  stopped = true
}

const percolationSize = 1000
const blockSize = 20
const blocksLength = percolationSize / blockSize
const size = blocksLength * blocksLength
const filledPercolations = Array.from({ length: size }).map(() => false)
const whiteIndexes = shuffle(filledPercolations.map((_value, index) => index))
const connections = filledPercolations.map((_value, index) => index)
connections[-1] = -1
connections[filledPercolations.length] = filledPercolations.length
filledPercolations[filledPercolations.length] = true
filledPercolations[-1] = true
const branchSizes = filledPercolations.map(() => 1)
const percolation = document.getElementById('percolation')
const context = percolation.getContext('2d')
let stopped = false

console.log(whiteIndexes)
createBlackRect()
start()

