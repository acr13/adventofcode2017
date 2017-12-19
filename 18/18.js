
const steps = [];

const getValue = (registers, r) => {
  if (isNaN(Number(r))) {
    if (!registers[r]) {
      registers[r] = 0;
    }

    return registers[r];
  }

  return Number(r);
};
const setRegisterValue = (registers, r, val) => {
  let numVal = Number(val);
  if (isNaN(Number(val))) {
    numVal = registers[val];
  }

  registers[r] = numVal;
};

// RIP can't reuse this
const p1 = () => {
  const registers = {};
  let lastPlayedSound = -1;

  for (let i = 0; i < steps.length; i++) {
    const parts = steps[i].split(' ');

    if (parts[0] === 'set') {
      setRegisterValue(registers, parts[1], parts[2]);
    } else if (parts[0] === 'add') {
      let newVal = getValue(registers, parts[1]) + getValue(registers, parts[2]);
      setRegisterValue(registers, parts[1], newVal);
    } else if (parts[0] === 'mul') {
      let newVal = getValue(registers, parts[1]) * getValue(registers, parts[2]);
      setRegisterValue(registers, parts[1], newVal);
    } else if (parts[0] === 'mod') {
      let newVal = getValue(registers, parts[1]) % getValue(registers, parts[2]);
      setRegisterValue(registers, parts[1], newVal);
    } else if (parts[0] === 'snd') {
      lastPlayedSound = getValue(registers, parts[1]);
    } else if (parts[0] === 'jgz') {
      let x = getValue(registers, parts[1]);
      if (x > 0) {
        i = i + getValue(registers, parts[2]) - 1;
      }
    } else if (parts[0] === 'rcv') {
      let x = getValue(registers, parts[1]);
      if (x !== 0) {
        break;
      }
    }
  }

  return lastPlayedSound;
};

 // jesus lot of wasted code
const runMove = (state, steps) => {
  const { current, 0: state0, 1: state1} = state;
  const other = current === 0 ? 1 : 0;

  const program = current === 0 ? state0 : state1;
  const otherProgram = current === 0 ? state1 : state0;

  const { index, frequencies, messages, sends, waiting } = program;
  const [action, x, y] = steps[index].split(' ');

  const xVal = isNaN(x) ? frequencies[x] || 0 : Number(x);
  const yVal = isNaN(y) ? frequencies[y] || 0 : Number(y);

  if (action === 'set') {
    return {
      ...state,
      [current]: {
        ...program,
        frequencies: { ...frequencies, [x]: yVal},
        index: index + 1,
      }
    };
  } else if (action === 'add') {
    return {
      ...state,
      [current]: {
        ...program,
        frequencies: { ...frequencies, [x]: xVal + yVal },
        index: index + 1,
      }
    };
  } else if (action === 'mul') {
    return {
      ...state,
      [current]: {
        ...program,
        frequencies: { ...frequencies, [x]: xVal * yVal },
        index: index + 1,
      }
    };
  } else if (action === 'mod') {
    return {
      ...state,
      [current]: {
        ...program,
        frequencies: { ...frequencies, [x]: xVal % yVal },
        index: index + 1,
      }
    };
  } else if (action === 'snd') {
    return {
      current: current,
      [current]: {
        ...program,
        index: index + 1,
        sends: sends + 1,
      },
      [other]: {
        ...otherProgram,
        messages: otherProgram.messages.concat(xVal),
        waiting: false
      },
    };
  } else if (action === 'rcv') {
    if (messages.length > 0) {
      return {
        ...state,
        [current]: {
          ...program,
          index: index + 1,
          frequencies: { ...frequencies, [x]: messages[0] },
          messages: messages.slice(1)
        }
      };
    } else {
      return {
        ...state,
        current: other,
        [current]: {
          ...program,
          waiting: true,
        }
      };
    }
  } else if (action === 'jgz') {
    return {
      ...state,
      [current]: {
        ...program,
        index: xVal > 0 ? index + yVal : index + 1
      }
    };
  }
};

const p2 = (steps) => {
  const initialState = {
    index: 0,
    frequencies: {},
    messages: [],
    sends: 0,
    waiting: false
  };

  let state = {
    current: 0,
    0: {...initialState, frequencies: {p: 0}},
    1: {...initialState, frequencies: {p: 1}}
  };

  while (true) {
    const terminated =
      (state[0].waiting || (state[0].index < 0 || state[0].index > steps.length)) &&
      (state[1].waiting || (state[1].index < 0 || state[1].index > steps.length))
    if (terminated) {
      return state[1].sends;
    }

    state = runMove(state, steps);
    // console.log(state);
  }
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('18/input.txt')
});
lineReader.on('line', line => steps.push(line));
lineReader.on('close', () => {
  console.log('Part One:', p1());
  console.log('Part Two:', p2(steps));
});
