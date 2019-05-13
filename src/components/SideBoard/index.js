import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rollADie from 'roll-a-die';
import shortId from 'shortid';
import Toastr from 'toastr';
import sortBy from 'lodash.sortby';

import {
  moveSeedToPosition,
  dieCastComplete,
  changeTurn,
  clearNotification,
  setResultToGlobalState,
  setDisabled,
  gameDataReset,
} from '../../actions';
import { findSeedGroup } from '../../utils/moveSeed';
import GameChat from '../GameChat';
import { disableEmptyHouses } from '../../helpers';
import './index.css';

const NUMBER = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
};
const COLOUR_CODE = {
  yellow: 'rgb(202, 202, 57)',
  green: '#218F08',
  red: '#ED0707',
  blue: '#11089C',
}

class SideBoard extends Component {
  state = {
    element: null,
    results: [],
    repeatCast: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dieResult !== state.result) {
      return {
        ...state,
        results: props.dieResult,
      };
    }
    return null;
  }

  componentDidMount() {
    const rollDieElement = document.getElementById('roll-die');
    this.setState({
      element: rollDieElement,
    });
  }

  checkIfPlayerHasValidMoves = (results) => {
    const { playerTurn } = this.props;
    const groups = findSeedGroup(this.props.gameData, `H${playerTurn.substr(1, 1)}`);
    const seedGroup = sortBy(groups, (o) => o.movesLeft).reverse();
    // sorting and reversing here to first test and remove seeds that are still
    let canPlay = 0;
    const resultCollection = results.map(result => result.value);
    const resultsSum = resultCollection.reduce((a, b) => a + b, 0);
    const seedOutside = seedGroup.filter(group => group.movesLeft < 56).length;

    Object.keys(seedGroup).forEach(group => {
      if (seedGroup[group].position === 'still' && !resultCollection.includes(6)) {
        canPlay += 1;
      } else if (seedOutside < 2 && resultsSum > seedGroup[group].movesLeft) {
        canPlay += 1;
      }
    });
    if (canPlay === 4) {
      Toastr.info('No valid moves. Changing turn.', 'No Moves')
      setTimeout(() => {
        this.endTurn();
      }, 2000);
    }
  }

  setDieRollResult = (results) => {
    if (results[0] === 6 && results[1] === 6) {
      this.setState({ repeatCast: true });
    } else {
      this.setState({ repeatCast: false });
    }

    const preResults = this.state.results;
    const resultObjects = results.map(result => {
      return { id: shortId.generate(), value: result, selected: false };
    });
    const resultsConcat = [...preResults, ...resultObjects];
    this.props.setResultToGlobalState(resultsConcat);

    if (results[0] !== 6 || results[1] !== 6) {
      this.props.dieCastComplete();
      this.checkIfPlayerHasValidMoves(resultsConcat)
    }
  }

  rollDice = () => {
    const { dieCast } = this.props;
    if (dieCast) return;
    const options = {
      element: this.state.element,
      numberOfDice: 2,
      callback: this.setDieRollResult,
    };
    rollADie(options);
  }

  toggleDieResultSelected = (id) => {
    const results = this.state.results.map(result => {
      if (result.id === id) {
        result.selected = !result.selected;
      }
      return result;
    });
    this.setState({ results });
  }

  endTurn = () => {
    this.props.changeTurn();
    this.props.setResultToGlobalState([]);
  }

  moveSeed = () => {
    const { results, repeatCast } = this.state;
    const selectedSeed = this.props.selectedSeed;
    const indexes = [];
    const selectedMoves = results.filter((result, index) => {
      if (result.selected) {
        indexes.push(result.id); //saves the ids for use later
      }
      return result.selected;
    }).map(data => data.value);

    this.props.moveSeedToPosition(selectedSeed, selectedMoves, () => {
      const resultsLeft = results.filter(result => indexes.indexOf(result.id) < 0);
      this.props.setResultToGlobalState(resultsLeft);
      this.setState({ results: resultsLeft });
      if (!resultsLeft.length && !repeatCast) {
        this.endTurn()
      }
    });
  }

  renderSelectedDie = (colour) => {
    const { selectedSeed } = this.props;
    const { results } = this.state;
    const playDisabled = selectedSeed && results.filter(result => result.selected).length;
    return (
      <div className="playMove">
        <input
          disabled={!playDisabled}
          onClick={this.moveSeed}
          className={`btn playButton ${colour.toLowerCase()}-playing-body`}
          value="Play It"
        />
        <div className="selectedSeedContainer">
          {selectedSeed &&
            <Fragment>
              Selected Seed: &nbsp;
              <div
                className="selectedSeed"
                style={{
                  backgroundColor: COLOUR_CODE[colour.toLowerCase()],
                }}>
                {selectedSeed.substr(4, 1)}
              </div>
            </Fragment>
          }
        </div>
      </div>
    )
  }
  renderDieResults = () => {
    const results = this.state.results;
    return results.map(result =>
      <div
        key={result.id}
        className={`dieResult ${result.selected ? 'selectedResult' : ''}`}
        onClick={() => this.toggleDieResultSelected(result.id)}
      >
        {result.value}
      </div>
    )
  }

  resetGame = () => {
    if(window.confirm('Are you sure you want to restart the game?')) {
      this.props.gameDataReset();
      const { numberOfPlayers } = this.props;
      disableEmptyHouses(this.props.setDisabled, numberOfPlayers);
    }
  }


  newGame = () => {
    if(window.confirm('Are you sure you want to create new game?')) {
      return window.location.href = '/';
    }
  }

  render() {
    const {
      sideBoardWidth,
      playerTurn,
      dieCast,
    } = this.props;
    const containerStyle = {
      float: 'right',
      width: sideBoardWidth * 0.8,
      marginLeft: sideBoardWidth * 0.1,
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
    const disableButton = (dieCast) ? 'disabled' : null;
    const houseNumber = playerTurn.substr(1, 1);
    let colour = this.props.gameData[`house${NUMBER[houseNumber]}Cards`][`H${houseNumber}-Colour`];
    colour = colour.substr(0, 1).toUpperCase() + colour.substr(1, colour.length);
    return (
      <div style={containerStyle}>
        <hr className="hRule" />
        <GameChat />
        <hr className="hRule" />
        <div className="reset-buttons">
          <button type="button" className="btn btn-warning" onClick={this.newGame}>New Gane</button>
          <button type="button" className="btn btn-warning" onClick={this.resetGame}>Restart Gane</button>
        </div>
        <hr className="hRule" />
        <div className="playMoveContainer">
          <span className="playMoveContainer-row">
            <h6 className={`${colour.toLowerCase()}-playing-body`}>Playing: {colour} House</h6>
          </span>
          <span className="playMoveContainer-row">
            {this.renderSelectedDie(colour)}
          </span>
        </div>
        <hr className="hRule" />
        <div className="dieWindowContainer">
          <div className="dieResultContainer">
            {this.renderDieResults()}
            <div id="roll-die"></div>
          </div>
          <div
            className={`${colour.toLowerCase()}-playing-body rollDieButton ${disableButton ? 'disabled' : ''}`}
            onClick={this.rollDice}>
            Roll Dice
          </div>
        </div>
        <hr className="hRule" />
      </div>
    )
  }
}

function mapStateToProps({ gameSettings, gameData }) {
  return {
    sideBoardWidth: gameSettings.sideBoardWidth,
    playerTurn: gameData.playerTurn,
    selectedSeed: gameData.selectedSeed,
    dieCast: gameData.dieCast,
    gameData,
    dieResult: gameData.dieResult,
    numberOfPlayers: gameData.numberOfPlayers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveSeedToPosition,
    dieCastComplete,
    changeTurn,
    clearNotification,
    setResultToGlobalState,
    setDisabled,
    gameDataReset,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBoard);