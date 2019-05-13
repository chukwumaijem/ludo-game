import cloneDeep from 'lodash.clonedeep';
import Types from '../actions/actionTypes';
import { setColours } from '../utils/moveSeed';
import { initialState } from '../utils/constants';

// movesLeft here is the minimum number of moves needed to finish after coming out of the house.

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
  const availHouses = { ...houseColors };
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

function removePlayerFromlist(state, player) {
  const { playingHouses } = state;
  const indexOfHouse = playingHouses.findIndex(function (element) {
    return element.includes(player);
  });
  const houseCopy = [...playingHouses]
  houseCopy.splice(indexOfHouse, 1);
  return houseCopy;
}

function makeStateCopy() {
  return cloneDeep(initialState);
}

export default function gameData(state = makeStateCopy(), action) {
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
    case Types.REMOVE_PLAYER_FROM_LIST:
      return Object.assign({},
        state,
        { playingHouses: removePlayerFromlist(state, action.payload) },
      );
    case Types.SET_RESULT_TO_GLOBAL:
      return Object.assign({},
        state,
        { dieResult: action.payload },
      );
    case Types.RESET_GAME_DATA:
      const { numberOfPlayers } = state;
      return Object.assign({},
        makeStateCopy(),
        {
          numberOfPlayers,
          numberOfPlayersUpdated: true,
        });
    default:
      return state;
  }
}
