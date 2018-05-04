import { moveSeed } from '../actions/gameData';
import store from '../store';

import { startPoint, newSeedPosition } from './seedPath.js';

/**
 * setColours
 * 
 * Sets the colour of the houses
 * and indirectly of the seeds.
 * Will later be used to allow playes choose house colours
 */
export function setColours(state, action) {
  state.houseOneCards["H1-Colour"] = 'green';
  state.houseTwoCards["H2-Colour"] = 'red';
  state.houseThreeCards["H3-Colour"] = 'yellow';
  state.houseFourCards["H4-Colour"] = 'blue';
  return state;
}

/**
 * findSeedGroup
 * 
 * gets the house a seed belongs to
 */
function findSeedGroup(state, seedId) {
  let house;
  switch (seedId.substr(0, 2)) {
    case 'H1':
      house = state.houseOneCards;
      break;
    case 'H2':
      house = state.houseTwoCards;
      break;
    case 'H3':
      house = state.houseThreeCards;
      break;
    case 'H4':
      house = state.houseFourCards;
      break;
    default:
      return;
  }
  return house;
}

/**
 * getSeedPosition
 * 
 * gets the current position of a seed
 */
function getSeedPosition(state, seedId) {
  const seedGroup = findSeedGroup(state, seedId);
  return seedGroup[seedId];
}

/**
 * getLudoSeeds
 *
 * Merge all the seeds into a single object
 * this is to make matching and iteration easier.
 */
export function getLudoSeeds(gameData) {
  let seeds = {};
  seeds = { ...gameData.houseOneCards };
  seeds = { ...seeds, ...gameData.houseTwoCards };
  seeds = { ...seeds, ...gameData.houseThreeCards };
  seeds = { ...seeds, ...gameData.houseFourCards };

  return seeds;
}
/**
 * killSeed
 * 
 * returns a seed to its house if another seeds
 * move ends at its position.
 */
function killSeed(state, dispatch, seedPosition, movingSeed) {
  const seeds = getLudoSeeds(state);
  const seedId = Object.keys(seeds).filter((seed) => {
    return seeds[seed] === seedPosition;
  }).toString();

  if (seedId && (movingSeed.substr(0, 2) !== seedId.substr(0, 2))) {
    const seedGroup = findSeedGroup(state, seedId);
    seedGroup[seedId] = 'still';
    dispatch(moveSeed(seedGroup))
  }
}
/**
 * setSeedPosition
 * 
 * Updates the seed state to chnge
 * its positions on the game board.
 */
export function setSeedPosition(data) {
  const { seed: seedId, position: moves, dispatch } = data;
  const state = store.getState().gameData;
  if(getSeedPosition(state, seedId) === 'still' && !moves.includes("6")) {
    return;
  }
  if (getSeedPosition(state, seedId) === 'still' && moves.includes("6")) {
    setTimeout(() => {
      const seedGroup = findSeedGroup(state, seedId);
      const lastMove = (moves.length === 1) ? true : false;
      const seedPosition = startPoint(seedId);
      if (lastMove) {
        killSeed(state, dispatch, seedPosition, seedId);
      }
      seedGroup[seedId] = seedPosition;
      dispatch(moveSeed(seedGroup))
      moves.splice(moves.indexOf(6), 1);
    }, 500);
  } else if (moves.length > 0) {
    moves.forEach((move, index) => {
      for (let j = 0; j < move; j++) {
      setTimeout(() => {
          const seedGroup = findSeedGroup(state, seedId);
          const currentSeedPosition = getSeedPosition(state, seedId);
          const lastMove = (j + 1 == move && !moves[index + 1]) ? true : false;
          const seedPosition = newSeedPosition(seedId, currentSeedPosition);
          if (lastMove) {
            killSeed(state, dispatch, seedPosition, seedId);
          }
          seedGroup[seedId] = seedPosition;
          dispatch(moveSeed(seedGroup))
      }, j * 500);
      }
    });
  }
}