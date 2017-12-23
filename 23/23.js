const registers = { a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };
const input = [
  'set b 93',
  'set c b',
  'jnz a 2',
  'jnz 1 5',
  'mul b 100',
  'sub b -100000',
  'set c b',
  'sub c -17000',
  'set f 1',
  'set d 2',
  'set e 2',
  'set g d',
  'mul g e',
  'sub g b',
  'jnz g 2',
  'set f 0',
  'sub e -1',
  'set g e',
  'sub g b',
  'jnz g -8',
  'sub d -1',
  'set g d',
  'sub g b',
  'jnz g -13',
  'jnz f 2',
  'sub h -1',
  'set g b',
  'sub g c',
  'jnz g 2',
  'jnz 1 3',
  'sub b -17',
  'jnz 1 -23'
];

let numMul = 0;

for (let i = 0; i < 14; i++) {
  let line = input[i];
  const [cmd, x, y] = line.split(' ');

  let xVal = isNaN(Number(x)) ? registers[x] : parseInt(x);
  let yVal = isNaN(Number(y)) ? registers[y] : parseInt(y);

  if (cmd === 'set') {
    registers[x] = yVal;
  } else if (cmd === 'sub') {
    registers[x] -= yVal;
  } else if (cmd === 'mul') {
    numMul++;
    registers[x] = registers[x] * yVal;
  } else if (cmd === 'jnz' && xVal !== 0) {
    i = i + (yVal - 1);
  }
}

console.log(numMul);

// p2 = 911
