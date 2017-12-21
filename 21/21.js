const RULES = {};
let IMAGE = ['.#.', '..#', '###'];

const numPixelsOn = image => image.reduce((sum, line) => sum += line.split('').filter(cell => cell === '#').length, 0);

const parseLine = line => {
  const parts = line.split(' => ');
  RULES[parts[0]] = parts[1];
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('21/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part One:', p1());
});

const flipGrid = grid => {
  return grid.map(row => {
    return row.split('').reverse().join('');
  });
};

const rotate = (array) => {
  const newArray = [];
  const imgGrid = array.map(row => row.split(''));

  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
  }


  for (let col = 0; col < array.length; col++) {
    for (let row = array.length - 1; row >= 0; row--) {
      newArray[col].push(imgGrid[row][col]);
    }
  }

  return newArray.map(row => row.join(''));
}

const getCombinations = list => {
  let combinations = [];

  // build our combinations
  combinations.push(list);
  combinations.push(rotate(list));
  combinations.push(rotate(combinations[1]));
  combinations.push(rotate(combinations[2]));

  if (list.length % 2 !== 0) {
    combinations.map(img => combinations.push(flipGrid(img)));
  }

  return combinations;
}

const getSquares = image => {
  const squares = [];
  const numSquares = (image.length * image.length) / 4;

  // console.log('numSquares', numSquares);

  for (let i = 0; i < numSquares; i++) {
    let row = Math.floor(squares.length / Math.sqrt(numSquares)) * 2
    let col = (i % 2) * 2;

    //console.log(row,col);

    let square = [
      `${image[row][col]}${image[row][col + 1]}`,
      `${image[row + 1][col]}${image[row + 1][col + 1]}`
    ];

    squares.push(square)
  }


  return squares;
}

const putImageBackTogether = squares => {
  let image = [];
  let newSize = Math.sqrt(squares.length * (3 * 3));
  let squaresPerRow = Math.sqrt(squares.length);

  // break into rows
  squares = squares.map(square => square.split('/'));
  // console.log(squares);

  // newSize
  while (image.length < newSize) {
    let row = Math.floor(image.length / 3) * 2;
    let col = image.length % 3;

    let newRow = squares[0][col] + squares[0 + 1][col];
    // console.log(newRow);
    image.push(newRow);
  }

  return image;
};

const getNextImage = (image, rules) => {
  if (image.length % 2 === 0) {
    let newImageOfSquares = [];
    let squares = getSquares(image);

    // for each square...
    for (let i = 0; i < squares.length; i++) {
      // get all the combos
      const combinations = getCombinations(squares[i]);

      // for each combination of this square...
      for (let j = 0; j < combinations.length; j++) {
        const lookupStr = combinations[j].join('/');
        if (rules[lookupStr]) {
          newImageOfSquares.push(rules[lookupStr]);
        }
      }
    }

    // holy jesus
    return putImageBackTogether(newImageOfSquares);
  } else if (image.length % 3 === 0) {
    const combinations = getCombinations(image);

    for (let i = 0; i < combinations.length; i++) {
      const lookupStr = combinations[i].join('/');
      if (rules[lookupStr]) {
        return rules[lookupStr].split('/');
      }
    }
  }

  return 'fuck';
};

const p1 = () => {
  const NUM_ITERATIONS = 5;

  for (let i = 0; i < NUM_ITERATIONS; i++) {
    IMAGE = getNextImage(IMAGE, RULES);
    // console.log('NEXT IMAGE', IMAGE);
    // console.log(numPixelsOn(IMAGE));
  }

  return numPixelsOn(IMAGE);
};
