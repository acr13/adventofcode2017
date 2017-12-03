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

console.log(numSteps(14));
console.log(numSteps(12));
console.log(numSteps(23));
console.log(numSteps(1024));
console.log(numSteps(361527));
