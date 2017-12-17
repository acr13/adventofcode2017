let mutations = [];
let word = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('16/input.txt')
});
lineReader.on('line', line => { mutations = line.split(','); });
lineReader.on('close', () => partTwo(word));

const swap = (word, a, b) => {
  let temp = word[a];
  word[a] = word[b];
  word[b] = temp;
};

const partOne = word => {
  mutations.map(mutation => {
    let c = mutation.charAt(0);
    if (c === 's') {
      let n = parseInt(mutation.substr(1));
      n = n % word.length;
      word = [...word.slice(word.length - n), ...word.slice(0, word.length - n)];
    } else if (c === 'x') {
      let parts = mutation.substr(1).split('/').map(x => parseInt(x));
      swap(word, parts[0], parts[1]);
    } else { // c === 'p'
      let parts = mutation.substr(1).split('/');
      swap(word, word.indexOf(parts[0]), word.indexOf(parts[1]));
    }
  });

  return word;
};

const partTwo = word => {
  let start = word.join('');
  let n = 1000000000;
  for (let i = 0; i < n; i++) {
    word = partOne(word);
    if (word.join('') === start) {
      i += (Math.floor(n / (i+1)) - 1) * (i + 1);
    }
  }

  console.log(word.join(''));
};
