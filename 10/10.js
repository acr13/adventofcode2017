const list = [...Array(256).keys()];
const input = '183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88';

// const list = [0, 1, 2, 3, 4];
// const input = '1,2,3'; // [3, 4, 1, 5];

const convertHash = numbers => {
  const denseHash = [];

  for (let i = 0; i < 16; i++) {
    const o = numbers.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b);
    denseHash.push(o);
  }

  return denseHash;
};

const partOne = (list, input, currentPosition, skipSize) => {
  let legnths = null;
  if (typeof input === 'string') {
    lengths = input.split(',').map(x => parseInt(x));
  } else {
    lengths = [...input];
  }

  let theString = [...list];
  let pos = currentPosition;
  let skip = skipSize;

  for (let i = 0; i < lengths.length; i++) {
    // theString = reverseSubset(theString, pos, lengths[i]);
    theString = [...theString.slice(pos), ...theString.slice(0, pos)];
    theString = [...theString.slice(0, lengths[i]).reverse(), ...theString.slice(lengths[i])];
    theString = [...theString.slice(-pos), ...theString.slice(0, -pos)];
    pos = (pos + lengths[i] + skip++) % 256;
  }

  return [ theString, pos, skip ];
};

const convertLengthsToAscii = input => [...input].map(x => parseInt(x.charCodeAt(0)));

const partTwo = (list, lengths) => {
  const asciiLegnths = convertLengthsToAscii(lengths);
  asciiLegnths.push(17, 31, 73, 47, 23);

  let theString = [...list];
  let pos = 0;
  let skip = 0;

  for (let i = 0; i < 64; i++) {
    [theString, pos, skip] = partOne(theString, asciiLegnths, pos, skip);
  }

  const denseHash = convertHash(theString);

  return denseHash.map(num => num.toString(16)) // convert to hex
    .map(n => ('0' + n).substr(-2)) // pad with 0 if need be
    .join(''); // toString()
};

const [p1, ...rest] = partOne(list, input, 0, 0);

// console.log('Part One:', p1[0] * p1[1]);
// console.log('Part Two:', partTwo(list, input));

module.exports = {
  partTwo
};
