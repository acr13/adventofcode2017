const passphrases = [];

const isValidPartOne = passphrase => {
  let phraseMap = {};
  let valid = true;
  phraseList = passphrase.split(' ');

  for (var i = 0; i < phraseList.length; i++) {
    if (!phraseMap[phraseList[i]]) {
      phraseMap[phraseList[i]] = true;
    } else {
      valid = false;
      break;
    }
  }

  return valid;
};

const isValidPartTwo = passphrase => {
  let valid = true;
  phraseList = passphrase.split(' ');

  for (var i = 0; i < phraseList.length; i++) {
    let thisWord = phraseList[i];
    let thisWordMap = generateWordMap(thisWord);

    // check all other words
    for (var j = 0; j < phraseList.length; j++) {
      // only check words with same length, and not the same word
      if (i !== j && thisWord.length === phraseList[j].length) {
        let otherWord = phraseList[j];
        let otherWordMap = generateWordMap(otherWord);

        if (isAnagram(thisWordMap, otherWordMap)) {
          return false;
        }
      }
    }
  }

  return valid;
};

const isAnagram = (firstWord, secondWord) => {
  const letters = Object.keys(firstWord);

  for (var i = 0; i < letters.length; i++) {
    let letter = letters[i];

    if (firstWord[letter] !== secondWord[letter]) {
      return false;
    }
  }

  return true;
};

const generateWordMap = word => {
  let map = {};

  for (var i = 0; i < word.length; i++) {
    let thisChar = word.charAt(i);

    if (!map[thisChar]) {
      map[thisChar] = 0;
    }

    map[thisChar]++;
  }

  return map;
};

const getNumValid = input => {
  let numValidPartOne = 0;
  let numValidPartTwo = 0;

  input.map(phrase => {
    if (isValidPartOne(phrase)) {
      numValidPartOne++;
    }
    if (isValidPartTwo(phrase)) {
      numValidPartTwo++;
    }
  });

  console.log('Part One:', numValidPartOne);
  console.log('Part Two:', numValidPartTwo);
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('4.txt')
});
lineReader.on('line', line => passphrases.push(line));
lineReader.on('close', () => getNumValid(passphrases));
