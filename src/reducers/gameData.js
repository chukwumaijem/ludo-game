import Types from '../actions/actionTypes';
import { setColours } from '../utils/moveSeed';
import { still, movesLeft } from '../utils/constants';

// movesLeft here is the minimum number of moves needed to finish after coming out of the house.
const initialState = {
  houseOneCards: {
    'H1-C1': { position: still, movesLeft: movesLeft },
    'H1-C2': { position: still, movesLeft: movesLeft },
    'H1-C3': { position: still, movesLeft: movesLeft },
    'H1-C4': { position: still, movesLeft: movesLeft },
    'H1-Colour': 'blue'
  },
  houseTwoCards: {
    'H2-C1': { position: still, movesLeft: 34 },
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
  playerTurn: 'P2',
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
  }
};

function nextTurn(state) {
  const { playerTurn, playingHouses } = state;
  const playingIndex = playingHouses.indexOf(playerTurn.replace('P', 'H'));
  if ((playingIndex + 1) >= playingHouses.length) {
    return playingHouses[0].replace('H', 'P');
  }

  return playingHouses[playingIndex + 1].replace('H', 'P');
}

function setHouseOrder(house) {
  const houses = house.sort(); // should be in order ['H1', 'H2', 'H4', 'H3'];
  if (houses.includes('H3') && houses.includes('H4')) {
    const h3Index = houses.indexOf('H3');
    const h4Index = houses.indexOf('H4');
    houses[h3Index] = 'H4';
    houses[h4Index] = 'H3';
  }
  return houses;
}
function setInitialPlayerTurn(state) {
  const { disabledHouses, houseColors } = state;
  const avail = Object.keys(disabledHouses).filter(key => !disabledHouses[key]);
  const availPlayers = avail[Math.floor(Math.random() * avail.length)];
  const availHouses = {...houseColors};
  for (let item in availHouses) {
    if (!avail.includes(availHouses[item]))
      delete availHouses[item];
   }
  const playingHouses = Object.keys(availHouses);

  return {
    playerToStart: playingHouses
      .find(key => houseColors[key] === availPlayers)
      .replace('H', 'P'),
    playingHouses: setHouseOrder(playingHouses),
  };
}

export default function gameData(state = initialState, action) {
  switch (action.type) {
    case Types.SET_COLOURS:
      return setColours(state, action);
    case Types.MOVE_SEED_TO_POSITION:
      return Object.assign({}, state, action.seedGroup);
    case Types.DISABLE_INACTIVE_HOUSE_SEEDS:
      const items = { ...state };
      Object.keys(items).forEach(item => {
        if (item.endsWith('Cards')) {
          Object.keys(items[item]).forEach(data => {
            if (!data.toLowerCase().includes('colour')) {
              if (data.substr(1, 1) !== action.payload.substr(1, 1)) {
                items[item][data].disabled = true;
              } else {
                items[item][data].disabled = false;
              }
            }
          });
        }
      });
      return items;
    case Types.DIE_CAST_COMPLETE:
      return Object.assign({},
        state,
        { dieCast: true }
      );
    case Types.SET_SELECTED_SEED:
      const seedId = action.payload;
      if (seedId.substr(1, 1) !== state.playerTurn.substr(1, 1))
        return state;
      return Object.assign({},
        state,
        { selectedSeed: seedId }
      );
    case Types.CHANGE_TURN:
      return Object.assign({},
        state,
        {
          playerTurn: nextTurn(state), //order: H1, H2, H4, H3 and repeat
          selectedSeed: '',
          dieCast: false,
        }
      );
    case Types.REMOVE_NOTIFICATION:
      return Object.assign({},
        state,
        { notification: [] }
      )
    case Types.CREATE_NOTIFICATION:
      return Object.assign({},
        state,
        { notification: action.payload }, // use id here so notifications can be cleared one after the other.
      )
    case Types.NUMBER_OF_PLAYERS:
      return Object.assign({},
        state,
        { numberOfPlayers: Number(action.payload) },
      );
    case Types.NUMBER_OF_PLAYERS_UPDATED:
      return Object.assign({},
        state,
        { numberOfPlayersUpdated: true },
      );
    case Types.SET_DISABLED_HOUSES:
      return Object.assign({},
        state,
        { disabledHouses: action.payload },
      );
    case Types.SET_DISABLED_HOUSES_COMPLETE:
      const { playerToStart, playingHouses } = setInitialPlayerTurn(state);
      return Object.assign({},
        state,
        {
          setDisabledHousesComplete: true,
          playerTurn: playerToStart,
          playingHouses,
        },
      );
    default:
      return state;
  }
}
