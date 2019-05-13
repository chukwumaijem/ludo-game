export const still = 'still';
export const movesLeft = 56;
export const home = 'home';

export const NUMBER = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four'
}

export const initialState = {
  houseOneCards: {
    'H1-C1': { position: still, movesLeft: movesLeft },
    'H1-C2': { position: still, movesLeft: movesLeft },
    'H1-C3': { position: still, movesLeft: movesLeft },
    'H1-C4': { position: still, movesLeft: movesLeft },
    'H1-Colour': 'blue'
  },
  houseTwoCards: {
    'H2-C1': { position: still, movesLeft: movesLeft },
    'H2-C2': { position: still, movesLeft: movesLeft },
    'H2-C3': { position: still, movesLeft: movesLeft },
    'H2-C4': { position: still, movesLeft: movesLeft },
    'H2-Colour': 'red'
  },
  houseThreeCards: {
    'H3-C1': { position: still, movesLeft: movesLeft },
    'H3-C2': { position: still, movesLeft: movesLeft },
    'H3-C3': { position: still, movesLeft: movesLeft },
    'H3-C4': { position: still, movesLeft: movesLeft },
    'H3-Colour': 'yellow'
  },
  houseFourCards: {
    'H4-C1': { position: still, movesLeft: movesLeft },
    'H4-C2': { position: still, movesLeft: movesLeft },
    'H4-C3': { position: still, movesLeft: movesLeft },
    'H4-C4': { position: still, movesLeft: movesLeft },
    'H4-Colour': 'green'
  },
  houseColors: {
    'H1': 'blue',
    'H2': 'red',
    'H3': 'yellow',
    'H4': 'green',
  },
  playerTurn: 'P1',
  selectedSeed: '',
  dieCast: false, // true is a user has finished rolling die for his turn
  notification: {},
  numberOfPlayers: 4,
  numberOfPlayersUpdated: false,
  setDisabledHousesComplete: false,
  playingHouses: ['H1', 'H2', 'H3', 'H4'],
  disabledHouses: {
    red: false,
    green: false,
    blue: false,
    yellow: false,
  },
  dieResult: [],
};
