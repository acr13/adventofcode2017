// assume we start at [0, 0], lets keep counting squares
// (moving down 1, right 1) until we find the 'square' where
// our number exists (greater than prev square, less than this one)
const numSteps = target => {
  let currentPosition = [0, 0];
  let currentValue = 1;
  let currentSquare = 1;

  while (target > (currentSquare * currentSquare)) {
    currentSquare += 2;
    currentPosition = [
      currentPosition[0] + 1,
      currentPosition[1] - 1
    ];
    currentValue = currentSquare * currentSquare;
  }

  // move left ...
  if ((currentValue - (currentSquare - 1)) < target) {
    currentPosition = [
      currentPosition[0] - (currentValue - target),
      currentPosition[1]
    ];
  } else if ((currentValue - ((currentSquare - 1) * 2)) < target) { // left & up...
    currentValue = currentValue - (currentSquare - 1); // bottom left value
    currentPosition = [
      currentPosition[0] - (currentSquare - 1),
      currentPosition[1] + (currentValue - target)
    ];
  } else if ((currentValue - ((currentSquare - 1) * 3)) < target) { // top row...
    currentValue = currentValue - ((currentSquare - 1) * 2);
    currentPosition = [
      currentPosition[0] + (currentValue - target) - (currentSquare - 1),
      currentPosition[1] + (currentSquare - 1)
    ];
  } else { // right row...
    currentValue = currentValue - ((currentSquare - 1) * 3);
    currentPosition = [
      currentPosition[0],
      (currentPosition[1] + (currentSquare - 1)) - (currentValue - target)
    ];
  }

  return Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]);
};

console.log('Part 1', numSteps(361527));

// part 2 - what a terrible problem, and worse solution. brute force.

const getLookupKey = position => `${position[0]},${position[1]}`;
const getValueOfPosition = (position, grid) => grid[getLookupKey(position)] ? grid[getLookupKey(position)] : 0;
const getSumOfAdjacentCells = (position, grid) => {
  let sum = 0;

  sum += getValueOfPosition([position[0] + 1, position[1]], grid);
  sum += getValueOfPosition([position[0] + 1, position[1] + 1], grid);
  sum += getValueOfPosition([position[0], position[1] + 1], grid);
  sum += getValueOfPosition([position[0] - 1, position[1] + 1], grid);
  sum += getValueOfPosition([position[0] - 1, position[1]], grid);
  sum += getValueOfPosition([position[0] - 1, position[1] - 1], grid);
  sum += getValueOfPosition([position[0], position[1] - 1], grid);
  sum += getValueOfPosition([position[0] + 1, position[1] - 1], grid);

  return sum;
};
const getNextPosition = (position, facing) => {
  if (facing === 'R') {
    return [position[0] + 1, position[1]];
  } else if (facing === 'U') {
    return [position[0], position[1] + 1];
  } else if (facing === 'L') {
    return [position[0] - 1, position[1]];
  } else {
    return [position[0], position[1] - 1];
  }
};
const getNextDirection = facing => {
  if (facing === 'R') { return 'U'; }
  else if (facing === 'U') { return 'L'; }
  else if (facing === 'L') { return 'D'; }
  else { return 'R'; }
};

const findFirstValueLargerInSpiral = target => {
  const GRID = { '0,0': 1 };
  let currentPosition = [0, 0];
  let facing = 'R';
  let step = 1;
  let movesInThisDirection = 1;  // have a counter to know how many times we'ves moved in this direction
  let nextSum = 1;
  let nextPosition = null;

  // generate the spiral
  // every two turns we add one to our step limit
  while (true) {
    currentPosition = getNextPosition(currentPosition, facing);
    nextSum = getSumOfAdjacentCells(currentPosition, GRID);

    GRID[getLookupKey(currentPosition)] = nextSum;
    movesInThisDirection--;

    if (nextSum > target) {
      break;
    }

    // we need to change direction
    if (movesInThisDirection === 0) {
      facing = getNextDirection(facing);
      movesInThisDirection = step; // reset our walking counter

      // two turns, add one
      if (facing === 'L' || facing == 'R') {
        step++;
        movesInThisDirection++;
      }
    }
  }

  return nextSum;
};

console.log('Part 2', findFirstValueLargerInSpiral(361527));
