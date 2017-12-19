const map = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('19/input.txt')
});
lineReader.on('line', line => map.push(line.split('')));
lineReader.on('close', () => {
  p1();
});

const getNextSpot = (map, pos, prevDir) => {
  // we have to go LEFT or RIGHT now
  if (prevDir === 'U' || prevDir === 'D') {
    if (map[pos[0]][pos[1] + 1] === '-') {
      return {
        facing: 'R',
        position: [pos[0], pos[1] + 1]
      };
    } else {
      return {
        facing: 'L',
        position: [pos[0], pos[1] - 1]
      };
    }
  } else { // UP or DOWN
    if (map[pos[0] + 1][pos[1]] === '|') {
      return {
        facing: 'D',
        position: [pos[0] + 1, pos[1]]
      }
    } else {
      return {
        facing: 'U',
        position: [pos[0] - 1, pos[1]]
      };
    }
  }
};

const p1 = () => {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let position = [0, map[0].indexOf('|')];
  let facing = 'D';
  let visited = [];
  let steps = 0;
  
  while (true) {
    let currentSpot = map[position[0]][position[1]];
    steps++;

    if (LETTERS.indexOf(currentSpot) !== -1) {
      visited.push(currentSpot);
    }

    // travel until we hit a plus
    if (currentSpot === '+') {
      const nextSpot = getNextSpot(map, position, facing);
      facing = nextSpot.facing;
      position = nextSpot.position;
    } else {
      // move
      if (facing === 'D') {
        position = [ position[0] + 1, position[1] ];
      } else if (facing === 'U') {
        position = [ position[0] - 1, position[1] ];
      } else if (facing === 'R') {
        position = [ position[0], position[1] + 1 ];
      } else {
        position = [ position[0], position[1] - 1 ];
      }
      
      if (map[position[0]][position[1]] === ' ') {
        break;
      }
    }
  }
  
  console.log(visited.join(''));
  console.log(steps);
};
