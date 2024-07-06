export const logTablePositions = (tableNodes) => {
  const positions = {};

  const compare = (a, b) => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  };

  tableNodes
    .sort((n1, n2) => compare(n1.id, n2.id))
    .forEach((n) => {
      positions[n.id] = {
        x: Math.round(n.position.x),
        y: Math.round(n.position.y),
      };
    });

  navigator.clipboard.writeText(JSON.stringify(positions, null, 2));

  console.log(JSON.stringify(positions, null, 2));
};
