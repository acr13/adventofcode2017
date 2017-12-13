const ranges = {};

const parseLine = line => {
  const parts = line.split(' ');
  ranges[parts[0].replace(':', '')] = parseInt(parts[1])
};

// actually representing state.. not smart
const partOne = (canBeCaught, delay) => {
  const length = Math.max(...Object.keys(ranges).map(x => parseInt(x))) + 1;
  const scanners = Object.keys(ranges).reduce((acc, val) => { acc[val] = { value: 0, down: true }; return acc; }, {});
  const scannerKeys = Object.keys(scanners);

  let waited = 0;
  let currentPosition = -1;
  let severity = 0;
  let once = true;

  while (currentPosition < length) {
    if (delay && waited < delay) {
      waited++;
    } else {
      currentPosition++;
    }

    if (scanners[currentPosition] && scanners[currentPosition].value === 0) {
      if (!canBeCaught) {
        return false;
      }

      severity += (currentPosition * ranges[currentPosition]);
    }

    // update scanner positions
    for (let j = 0; j < scannerKeys.length; j++) {
      if (scanners[scannerKeys[j]].down) {
        scanners[scannerKeys[j]].value++;

        if (scanners[scannerKeys[j]].value === (ranges[scannerKeys[j]] - 1)) {
          scanners[scannerKeys[j]].down = false;
        }
      } else {
        scanners[scannerKeys[j]].value--;

        if (scanners[scannerKeys[j]].value === 0) {
          scanners[scannerKeys[j]].down = true;
        }
      }
    }
  }

  return severity;
};

const positionAt = (range, time) => {
  return time % (2 * (range - 1));
}

const partTwo = () => {
  let delay = 0;
  let guards = Object.keys(ranges);
  const length = Math.max(...Object.keys(ranges).map(x => parseInt(x))) + 1;

  while (true) {
    let valid = true;

    // check all scanners
    for (var i = 0; i < length; i++) {
      if (ranges[i] && positionAt(ranges[i], delay + i) === 0) {
        valid = false;
        break;
      }
    }

    if (valid) {
      return delay;
    }

    delay++;
  }

  return 'fuck';
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('13/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part One:', partOne(true));
  console.log('Part Two:', partTwo());
});;
