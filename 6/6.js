const banks = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];
// const banks = [2,4,1,2];
const states = {};
let steps = 1;

while (true) {
  let largestIndex = banks.indexOf(Math.max(...banks));
  let numBlocks = banks[largestIndex];
  let cursor = (largestIndex + 1) > (banks.length - 1) ? 0 : largestIndex + 1;
  banks[largestIndex] = 0;

  while (numBlocks > 0) {
    banks[cursor]++;
    numBlocks--;

    cursor = (cursor + 1) >= banks.length ? 0 : cursor + 1;
  }

  state = banks.join('');
  if (states[state]) {
    break;
  }

  states[state] = steps;
  steps++;
}

console.log(banks, steps);
console.log(steps - states[state]);
