let input = [];
const parseLine = line => { input = [...line.split(',')]; };

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('11/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => partOne(input));

const partOne = input => {
  let currentPosition = [0, 0];
  let furthestPoint = 0;

  input.map(move => {
    if (move === 'n') {
      currentPosition = [ currentPosition[0], currentPosition[1] + 1 ];
    } else if (move === 's') {
      currentPosition = [ currentPosition[0], currentPosition[1] - 1 ];
    } else if (move === 'ne') {
      currentPosition = [ currentPosition[0] + 0.5, currentPosition[1] + 0.5 ];
    } else if (move === 'se') {
      currentPosition = [ currentPosition[0] + 0.5, currentPosition[1] - 0.5 ];
    } else if (move === 'nw') {
      currentPosition = [ currentPosition[0] - 0.5, currentPosition[1] + 0.5 ];
    } else if (move === 'sw') {
      currentPosition = [ currentPosition[0] - 0.5, currentPosition[1] - 0.5 ];
    }

    let stepsAway = Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]);
    if (stepsAway > furthestPoint) {
      furthestPoint = stepsAway;
    }
  });

  console.log('Part One:', Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]));
  console.log('Part Two:', furthestPoint);
};
