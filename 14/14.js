const { partTwo } = require('../10/10.js');

const GRID_SIZE = 128;
const puzzleInput = 'hwlqcszp';
const startOfHash = [...Array(256).keys()];

const generateKey = (row, col) => `${row},${col}`;

const generateGrid = () => {
  const hashes = []; // 128 hashes, one per row

  for (let i = 0; i < GRID_SIZE; i++) {
    hashes.push( partTwo(startOfHash, `${puzzleInput}-${i}`) );
  }

  return hashes.map(hash => {
    const len = hash.len;
    const binaryString = [];
    for (let i = 0; i < hash.length; i++) {
      let binary = parseInt(hash.charAt(i), 16).toString(2);
      if (binary.length < 4) {
        binary = binary.padStart(4, '0')
      }
      binaryString.push(binary);
    }

    return binaryString.join('');
  });
};

const numSquaresInGrid = grid => {
  return grid.reduce((sum, hash) => {
    let thisSum = 0;

    for (let j = 0; j < hash.length; j++) {
      if (hash.charAt(j) === '1') {
        thisSum++;
      }
    }

    return sum += thisSum;
  }, 0);
};

const getUsedAdjacentCells = (grid, row, col, visited) => {
  // for each direction around this cell..
  const adjacentCells = [
    [row - 1, col],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col],
  ].filter(coords => {
    // this is a real cell that we haven't visited yet
    let key = generateKey(coords[0], coords[1]);
    if (coords[0] >= 0 && coords[1] >= 0 && coords[0] < grid.length && coords[1] < grid[0].length && grid[coords[0]][coords[1]] === '1' && !visited[key]) {
      visited[key] = true;
      visited = getUsedAdjacentCells(grid, coords[0], coords[1], visited);
    }
  });

  return visited;
};

const numRegionsInGrid = grid => {
  let visitedCells = {};
  let regions = 0;

  // row, col
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let key = generateKey(i, j);

      if (grid[i][j] === '1' && !visitedCells[key]) {
        visitedCells[key] = true;

        // mark adjacent cells as visited
        visitedCells = getUsedAdjacentCells(grid, i, j, visitedCells);
        regions++;
      }
    }
  }


  return regions;
};

const grid = generateGrid();
const numRegions = numRegionsInGrid(grid);

console.log('Part One:', numSquaresInGrid(grid));
console.log('Part Two:', numRegions);
