/**
 * startPoint
 * 
 * This function sets a seed to its home's
 * starting position
 */
export function startPoint(seedId) {
  let houseStartingPoint;
  switch (seedId.substr(0, 2)) {
    case 'H1':
      houseStartingPoint = 'HL-01';
      break;
    case 'H2':
      houseStartingPoint = 'VT-12';
      break;
    case 'H3':
      houseStartingPoint = 'VB-40';
      break;
    case 'H4':
      houseStartingPoint = 'HR-24';
      break;
    default:
      break;
  }
  return houseStartingPoint;
}

/**
 * newSeedPosition
 * 
 * The methods starts the process of getting the next
 * position to place a seed.
 */
export function newSeedPosition(seedId, currentSeedPosition) {
  let newPosition;
  switch (currentSeedPosition.substr(0, 2)) {
    case 'HL':
      newPosition = hlPath(seedId, currentSeedPosition);
      break;
    case 'VT':
      newPosition = vtPath(seedId, currentSeedPosition);
      break;
    case 'HR':
      newPosition = hrPath(seedId, currentSeedPosition);
      break;
    case 'VB':
      newPosition = vbPath(seedId, currentSeedPosition);
      break;
    default:
      break;
  }

  return newPosition;
}

/**
 * hlPath
 * 
 * This method is responsible for movement
 * on the Left Horizontal rails
 */
function hlPath(seedId, currentSeedPosition) {
  let newPosition;
  switch (currentSeedPosition.substr(0, 4)) {
    case 'HL-0':
      newPosition = hlZeroPath(seedId, currentSeedPosition);
      break;
    case 'HL-1':
      newPosition = hlOnePath(seedId, currentSeedPosition);
      break;
    case 'HL-2':
      newPosition = hlTwoPath(seedId, currentSeedPosition);
      break;
    default:
      break;
  }

  return newPosition;
}

/**
 * hlZeroPath
 * 
 * This method handles movement on HL rail's
 * first row(HL-0).
 */
function hlZeroPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (increment === 5) {
    newPosition = 'VT-50';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 4)}${increment + 1}`;
  }

  return newPosition;
}

/**
 * hlOnePath
 * 
 * This method handles movement on Hl rail's
 * second row(HL-1).
 */
function hlOnePath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (seedId.substr(0, 2) !== 'H1') {
    newPosition = 'HL-00';
  } else {
    if (increment === 5) {
      newPosition = 'home';
    } else {
      newPosition = `${currentSeedPosition.substr(0, 4)}${increment + 1}`;
    }
  }

  return newPosition;
}

/**
 * hlTwoPath
 * 
 * This method handles movement on Hl rail's
 * third row(HL-2).
 */
function hlTwoPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (increment === 0) {
    newPosition = 'HL-10';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 4)}${increment - 1}`;
  }

  return newPosition;
}

/**
 * vtPath
 * 
 * This method handles movement on the
 * top vertical rail.
 */
function vtPath(seedId, currentSeedPosition) {
  let newPosition,
    match = `${currentSeedPosition.substr(0, 3)}${currentSeedPosition.substr(4, 1)}`;
  switch (match) {
    case 'VT-0':
      newPosition = vtZeroPath(seedId, currentSeedPosition);
      break;
    case 'VT-1':
      newPosition = vtOnePath(seedId, currentSeedPosition);
      break;
    case 'VT-2':
      newPosition = vtTwoPath(seedId, currentSeedPosition);
      break;
    default:
      break;
  }

  return newPosition;
}

/**
 * vtZeroPath
 * 
 * This method handles movement on the first column
 * of VT. Should be VT-(*)0, but for simplicity
 * the (*) was removed.
 */
function vtZeroPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (increment === 0) {
    newPosition = 'VT-01';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 3)}${increment - 1}0`;
  }

  return newPosition;
}

/**
 * vtOnePath
 * 
 * This method handles movement on the second column
 * of VT. Should be VT-(*)1, but for simplicity
 * the (*) was removed.
 */
function vtOnePath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (seedId.substr(0, 2) !== 'H2') {
    newPosition = 'VT-02';
  } else {
    if (increment === 5) {
      newPosition = 'home';
    } else {
      newPosition = `${currentSeedPosition.substr(0, 3)}${increment + 1}1`;
    }
  }

  return newPosition;
}

/**
 * vtTwoPath
 * 
 * This method handles movement on the third column
 * of VT. Should be VT-(*)2, but for simplicity
 * the (*) was removed.
 */
function vtTwoPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (increment === 5) {
    newPosition = 'HR-00';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 3)}${increment + 1}2`;
  }

  return newPosition;
}

/**
 * hrPath
 * 
 * This method handles movement on the right
 * horizontal rail.
 */
function hrPath(seedId, currentSeedPosition) {
  let newPosition;
  switch (currentSeedPosition.substr(0, 4)) {
    case 'HR-0':
      newPosition = hrZeroPath(seedId, currentSeedPosition);
      break;
    case 'HR-1':
      newPosition = hrOnePath(seedId, currentSeedPosition);
      break;
    case 'HR-2':
      newPosition = hrTwoPath(seedId, currentSeedPosition);
      break;
    default:
      break;
  }

  return newPosition;
}

/**
 * hrZeroPath
 * 
 * This method handles movement on the first column
 * of the HR rail(HR-0).
 */
function hrZeroPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (increment === 5) {
    newPosition = 'HR-15';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 4)}${increment + 1}`;
  }

  return newPosition;
}

/**
 * hrOnePath
 * 
 * This method handles movement on the second column
 * of the HR rail(HR-1).
 */
function hrOnePath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (seedId.substr(0, 2) !== 'H4') {
    newPosition = 'HR-25';
  } else {
    if (increment === 0) {
      newPosition = 'home';
    } else {
      newPosition = `${currentSeedPosition.substr(0, 4)}${increment - 1}`;
    }
  }

  return newPosition;
}

/**
 * hrTwoPath
 * 
 * This method handles movement on the third column
 * of the HR rail(HR-2).
 */
function hrTwoPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(4, 1), 10);
  if (increment === 0) {
    newPosition = 'VB-02';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 4)}${increment - 1}`;
  }

  return newPosition;
}

/**
 * vbPath
 * 
 * This method handles movement on the Bottom vertical
 * rail.
 */
function vbPath(seedId, currentSeedPosition) {
  let newPosition,
    match = `${currentSeedPosition.substr(0, 3)}${currentSeedPosition.substr(4, 1)}`;
  switch (match) {
    case 'VB-0':
      newPosition = vbZeroPath(seedId, currentSeedPosition);
      break;
    case 'VB-1':
      newPosition = vbOnePath(seedId, currentSeedPosition);
      break;
    case 'VB-2':
      newPosition = vbTwoPath(seedId, currentSeedPosition);
      break;
    default:
      break;
  }

  return newPosition;
}

/**
 * vbZeroPath
 * 
 * This method handles movement on the first column
 * of VB. Should be VB-(*)0, but for simplicity
 * the (*) was removed.
 */
function vbZeroPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (increment === 0) {
    newPosition = 'HL-25';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 3)}${increment - 1}0`;
  }

  return newPosition;
}

/**
 * vbOnePath
 * 
 * This method handles movement on the second column
 * of VB. Should be VB-(*)0, but for simplicity
 * the (*) was removed.
 */
function vbOnePath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (seedId.substr(0, 2) !== 'H3') {
    newPosition = 'VB-50';
  } else {
    if (increment === 0) {
      newPosition = 'home';
    } else {
      newPosition = `${currentSeedPosition.substr(0, 3)}${increment - 1}1`;
    }
  }

  return newPosition;
}

/**
 * vbTwoPath
 * 
 * This method handles movement on the third column
 * of VB. Should be VB-(*)0, but for simplicity
 * the (*) was removed.
 */
function vbTwoPath(seedId, currentSeedPosition) {
  let newPosition, increment = parseInt(currentSeedPosition.substr(3, 1), 10);
  if (increment === 5) {
    newPosition = 'VB-51';
  } else {
    newPosition = `${currentSeedPosition.substr(0, 3)}${increment + 1}2`;
  }

  return newPosition;
}
