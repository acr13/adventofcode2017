let particles = [];

const parseLine = line => {
  const parts = line.split(', ');
  const coords = parts[0].substring(3, parts[0].length - 1).split(',').map(x => parseInt(x));
  const velocity = parts[1].substring(3, parts[1].length - 1).split(',').map(x => parseInt(x));
  const accel = parts[2].substring(3, parts[2].length - 1).split(',').map(x => parseInt(x));
  particles.push({ coords, velocity, accel });
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('20/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part One:', p1());
  console.log('Part Two:', p2());
});

const p1 = () => {
  let min = Infinity;

  const accels = particles.map(particle => {
    const a = Math.abs(particle.accel[0]) + Math.abs(particle.accel[1]) + Math.abs(particle.accel[2]);
    if (a < min) {
      min = a;
    }
    return a;
  });

  const numMins = accels.filter(a => a === min).length;

  // we got lucky
  if (numMins === 1) {
    return accels.indexOf(min);
  }
}

const p2 = () => {
  while (true) {
    // lets move, then filter out collisions
    particles = particles.map(particle => {
      const { coords, velocity, accel } = particle;
      const newVelocity = velocity.map((n, idx) => n += accel[idx]);
      const newCoords = newVelocity.map((n, idx) => n += coords[idx]);

      return { coords: newCoords, velocity: newVelocity, accel };
    });

    let matches = [];

    for (let i = 0; i < particles.length; i++) {
      let thisPosition = particles[i].coords;

      for (let j = 0; j < particles.length; j++) {
        if (i !== j) {
          let otherPosition = particles[j].coords;

          if (thisPosition[0] === otherPosition[0] && thisPosition[1] === otherPosition[1] && thisPosition[2] === otherPosition[2]) {
            matches = matches.concat(i, j);
          }
        }
      }
    }

    let newParticles = [];
    for (let i = 0; i < particles.length; i++) {
      if (!matches.includes(i)) {
        newParticles.push(particles[i]);
      }
    }

    particles = newParticles;
    console.log(particles.length);
  }
};
