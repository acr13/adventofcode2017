const ports = [];

const parseLine = line => ports.push(line.split('/').map(x => parseInt(x)));

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('24/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  solve(ports);
});

const solve = (input) => {
  let bridges = [...build(0, [], ports, 0)];
  let part1 = maxBy(bridges, c => c.strength).strength;
  let part2 = bridges.sort((a, b) => b.used.length - a.used.length || b.strength - a.strength)[0].strength;
  console.log(part1, part2);
}

function *build(cur,used,available,strength) {
  for (let [a,b] of available) {
    if (a === cur || b === cur) {
      yield* build(a === cur ? b : a,[...used,[a,b]],available.filter(([x,y]) => !(x===a && y===b)),strength+a+b)
    }
  }

  yield { used, strength };
}

function findBy(seq, selector, test) {
  let foundVal;
  let foundElem;

  for (let n of seq) {
    let val = (typeof(selector) === 'undefined') ? n : selector(n);
    if (typeof(foundElem) === 'undefined' || test(val, foundVal)) {
      foundElem = n;
      foundVal = val;
    }
  }
  return { foundVal, foundElem };
}

function maxBy(seq, selector) {
  return findBy(seq,selector,(a,b) => a > b).foundElem;
}
