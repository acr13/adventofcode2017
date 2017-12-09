const partOne = line => {
  const len = line.length;
  let score = 0;
  let openedGroups = 0;
  let deadGarbage = 0;
  let inGarbage = false;

  for (let i = 0; i < len; i++) {
    let char = line.charAt(i);

    if (!inGarbage && char === '{') {
      openedGroups++;
    } else if (!inGarbage && char === '}') {
      score += openedGroups;
      openedGroups--;
    } else if (char === '<') {
      if (inGarbage) {
        deadGarbage++;
      }

      inGarbage = true;
    } else if (char === '>') {
      inGarbage = false;
    } else if (char === '!') {
      i++;
    } else if (inGarbage) {
      deadGarbage++;
    }
  }

  console.log('Score:', score);
  console.log('Garbage:', deadGarbage)
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('9/9.txt')
});
lineReader.on('line', line => partOne(line));
