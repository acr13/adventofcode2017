const registers = { a: 0 };
let largestEver = 0;

const getLargest = () => {
  let largest = 0;
  Object.keys(registers).map(key => {
    if (registers[key] > largest) {
      largest = registers[key];
    }
  });

  return largest;
};

const getRegisterValue = register => {
  if (!registers[register]) {
    registers[register] = 0;
  }

  return registers[register];
};

const updateRegisters = (register, instruction, value) => {
  if (!registers[register]) {
    registers[register] = 0;
  }

  instruction === 'inc' ? registers[register] += value : registers[register] -= value;

  if (registers[register] > largestEver) {
    largestEver = registers[register];
  }
};

const parseLine = line => {
  const parts = line.split(' ');
  const target = parts[4];
  const operation = parts[5];

  const targetValue = getRegisterValue(target);
  let valid = false;

  if (operation === '>') {
    valid = targetValue > parseInt(parts[6]);
  } else if (operation === '<') {
    valid = targetValue < parseInt(parts[6]);
  } else if (operation === '<=') {
    valid = targetValue <= parseInt(parts[6]);
  } else if (operation === '>=') {
    valid = targetValue >= parseInt(parts[6]);
  } else if (operation === '==') {
    valid = targetValue === parseInt(parts[6]);
  } else if (operation === '!=') {
    valid = targetValue !== parseInt(parts[6]);
  }

  if (valid) {
    updateRegisters(parts[0], parts[1], parseInt(parts[2]));
  }
};


const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('8/8.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part One:', getLargest());
  console.log('Part Two:', largestEver);
});
