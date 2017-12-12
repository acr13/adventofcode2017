const input = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('12/input.txt')
});
lineReader.on('line', line => input.push(line));
lineReader.on('close', () => {
  console.log('Part One:', partOne(input, '0').length);
  console.log('Part Two:', partTwo(input));
});

const testInput = [
  '0 <-> 2',
  '1 <-> 1',
  '2 <-> 0, 3, 4',
  '3 <-> 2, 4',
  '4 <-> 2, 3, 6',
  '5 <-> 6',
  '6 <-> 4, 5'
];

const normalizeInput = input => {
  const programs = {};

  input.map(line => {
    const parts = line.split(' ');
    const thisProgram = parts[0];
    const group = [];

    for (let i = 2; i < parts.length; i++) {
      let otherProgram = parts[i].replace(',', '');
      if (otherProgram !== thisProgram) {
        group.push(otherProgram);
      }
    }

    programs[thisProgram] = group;
  });

  return programs;
};

const partOne = (input, target) => {
  const programs = normalizeInput(input);

  let programsConnected = [target];
  let programsToCheck = [];

  programs[target].map(p => programsToCheck.push(p));

  while (programsToCheck.length > 0) {
    // pop the first element out
    let [currentProgram, ...tail] = programsToCheck;
    programsToCheck = tail;

    // program not already there, and not our start
    if (currentProgram !== target && programsConnected.indexOf(currentProgram) === -1) {
      programsConnected.push(currentProgram);

      // add its dependencies to the list
      programs[currentProgram].map(p => programsToCheck.push(p));
    }
  }

  return programsConnected;
};

const partTwo = input => {
  const programs = Object.keys(input);
  const groups = [];

  programs.map(program => {
    let valid = true;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].indexOf(program) !== -1) {
        valid = false;
        break;
      }
    }

    if (valid) {
      groups.push(partOne(input, program));
    }
  });

  return groups.length;
};
