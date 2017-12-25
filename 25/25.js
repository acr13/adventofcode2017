const NUM_STEPS = 12386363;
const STATES = {
  A: {
    0: {
      write: 1,
      move: 'R',
      next: 'B'
    },
    1: {
      write: 0,
      move: 'L',
      next: 'E',
    }
  },
  B: {
    0: {
      write: 1,
      move: 'L',
      next: 'C'
    },
    1: {
      write: 0,
      move: 'R',
      next: 'A'
    }
  },
  C: {
    0: {
      write: 1,
      move: 'L',
      next: 'D'
    },
    1: {
      write: 0,
      move: 'R',
      next: 'C',
    }
  },
  D: {
    0: {
      write: 1,
      move: 'L',
      next: 'E'
    },
    1: {
      write: 0,
      move: 'L',
      next: 'F'
    }
  },
  E: {
    0: {
      write: 1,
      move: 'L',
      next: 'A'
    },
    1: {
      write: 1,
      move: 'L',
      next: 'C'
    }
  },
  F: {
    0: {
      write: 1,
      move: 'L',
      next: 'E'
    },
    1: {
      write: 1,
      move: 'R',
      next: 'A'
    }
  }
};

const padTape = tape => [0, 0, 0, ...tape, 0, 0, 0];

let tape = [0, 0, 0, 0, 0, 0, 0];
let currentState = 'A';
let currentPosition = 3;

for (let i = 0; i < NUM_STEPS; i++) {
  let currentVal = tape[currentPosition];

  tape[currentPosition] = STATES[currentState][currentVal].write;
  if (STATES[currentState][currentVal].move === 'L') {
    currentPosition--;
  } else {
    currentPosition++;
  }

  if (currentPosition === 0 || currentPosition === tape.length - 1) {
    tape = padTape(tape);
    currentPosition += 3;
  }

  currentState = STATES[currentState][currentVal].next;
}

const checkSum = tape.reduce((sum, n) => sum += n, 0);
console.log('Part One:', checkSum);
