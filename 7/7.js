const input = [];

const parseLine = line => {
  const parts = line.split(' ');
  const above = [];

  if (parts.length > 2) {
    for (let i = 3; i < parts.length; i++) {
      above.push(parts[i].replace(',', ''));
    }
  }

  return [
    parts[0],
    parseInt(parts[1].substr(1, parts[1].length - 2)),
    above
  ];
};

// if a disk has disks above it (non empty list)
// AND it doesn't appear in other disks' above list
const findBottom = disks => {
  for (let i = 0; i < disks.length; i++) {
    // has disks above
    if (disks[i][2].length > 0) {
      let thisDisk = disks[i][0];
      let match = false;

      for (let j = 0; j < disks.length && !match; j++) {
        if (i !== j && disks[j][2].length > 0) {
          let otherDisks = disks[j][2];

          if (otherDisks.indexOf(thisDisk) !== -1) {
            match = true;
          }
        }
      }

      if (!match) {
        return thisDisk;
      }
    }
  }

  return 'fuck';
};

const normalize = disks => {
  return disks.reduce((acc, disk) => {
    acc[disk[0]] = { weight: disk[1], children: disk[2] };
    return acc;
  }, {});
};

const getBadIndex = list => {
  const valueMap = {};
  list.map(val => {
    if (!valueMap['' + val]) {
      valueMap['' + val] = 0;
    }
    valueMap['' + val]++;
  });

  for (var i = 0; i < list.length; i++) {
    if (valueMap['' + list[i]] === 1) {
      return i;
    }
  }

  return 'fuck';
}

const getWeightOfNode = (nodes, node) => {
  if (nodes[node].children.length === 0) {
    return nodes[node].weight;
  }

  return nodes[node].children.reduce((sum, childNode) => {
    return sum += getWeightOfNode(nodes, childNode);
  }, nodes[node].weight);
};

const findWrongWeight = disks => {
  const root = findBottom(input);
  const nodes = normalize(disks);
  const nodesToCheck = [root];

  while (nodesToCheck.length > 0) {
    let thisNode = nodesToCheck.shift();

    const weightOfChildren = nodes[thisNode].children.map(child => {
      return getWeightOfNode(nodes, child);
    });
    const allEqual = weightOfChildren.every(x => x === weightOfChildren[0]);

    if (!allEqual) {
      const badIndex = getBadIndex(weightOfChildren);
      const badNode = nodes[thisNode].children[badIndex];

      console.log([nodes[badNode].weight, badIndex, weightOfChildren]);
    }

    nodes[thisNode].children.map(node => nodesToCheck.push(node));
  }

};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('7/7.txt')
});
lineReader.on('line', line => input.push(parseLine(line)));
lineReader.on('close', () => {
  console.log('Part One:', findBottom(input));
  console.log('Part Two:', findWrongWeight(input));
});
