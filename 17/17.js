// let buffer = [0];
const steps = 354;
const target = 50000000 + 1;

let nextVal = 1;
let currentPosition = 0;
let besideZero = -1;

while (nextVal < target) {
  // walk the number of steps
  currentPosition = (currentPosition + steps) % nextVal; // buffer.length;

  // insert nextVal at currentPosition + 1;
  // buffer = [...buffer.slice(0, currentPosition + 1), nextVal, ...buffer.slice(currentPosition + 1)];

  if (currentPosition === 0) {
    besideZero = nextVal;
  }

  nextVal++;
  currentPosition = ++currentPosition % nextVal; // buffer.length;
}

// console.log(buffer[currentPosition + 1]);
console.log(besideZero);
