const input = [];

const getChecksum = input => {
  let checkSum = 0;

  input.map(row => {
    let low = row[0];
    let high = row[0];

    row.map(thisNumber => {
      if (thisNumber > high) {
        high = thisNumber;
      }
      if (thisNumber < low) {
        low = thisNumber;
      }
    });

    checkSum += (high - low);
  });

  return checkSum;
};

const getEvenlyDivisibleSum = input => {
  let checkSum = 0;

  // for each row...
  input.map(row => {
    // for each number...
    for (let i = 0; i < row.length; i++) {
      let thisNumber = row[i];

      // check all other numbers...
      for (let j = 0; j < row.length; j++) {
        if (i !== j && (thisNumber % row[j] === 0)) {
          checkSum += (thisNumber / row[j]);
          break;
        }
      }
    }
  });

  return checkSum;
};

// turn our text file into a 2d array
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('2.txt')
});
lineReader.on('line', line => {
  input.push(line.split('\t').map(x => parseInt(x)));
});
lineReader.on('close', () => {
  console.log(getChecksum(input))
  console.log(getEvenlyDivisibleSum(input));
});
