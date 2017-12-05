const input = [];

const partOne = () => {
  let numSteps = 0;
  let index = 0;

  while (true) {
    let indiciesToMove = input[index];
    if (indiciesToMove === undefined) {
      break;
    }

    let currentIndex = index;
    index += indiciesToMove;

    input[currentIndex] >= 3 ? input[currentIndex]-- : input[currentIndex]++;
    numSteps++;
  }

  console.log(numSteps);
};


const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./5.txt')
});
lineReader.on('line', line => input.push(parseInt(line)));
lineReader.on('close', () => partOne());
