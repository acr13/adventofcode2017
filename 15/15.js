// inputs
const NUM_PAIRS = 5000000; // 40000000;
const factorA = 16807;
const factorB = 48271;
const modBy = 2147483647;

let genA = 722;
let genB = 354;
let pairsGenerated = 0;
let count = 0;

const next = (val, factor, div) => {
  val = (val * factor) % modBy;
  if (val % div === 0) {
    return val;
  }
  return next(val, factor, div);
}

while (pairsGenerated < NUM_PAIRS) {
  genA = next(genA, factorA, 4);
  genB = next(genB, factorB, 8);

  if ((genA & 0xFFFF) === (genB & 0xFFFF)) {
    count++;
  }

  pairsGenerated++;
}

console.log(count);
