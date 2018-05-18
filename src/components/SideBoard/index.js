import React, { Component } from 'react';
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
  clearNotification
} from '../../actions';
import { findSeedGroup } from '../../utils/moveSeed';
import GameChat from '../GameChat';

import styles from './SideBoard.module.css';
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
  }

  componentDidMount() {
    const rollDieElement = document.getElementById('roll-die');
    this.setState({
      element: rollDieElement,
    });
  }

  canPlayPlay = () => {
    const { playerTurn } = this.props;
    const { results } = this.state;
    const groups = findSeedGroup(this.props.gameData, `H${playerTurn.substr(1, 1)}`);
    const seedGroup = sortBy(groups, (o) => o.movesLeft).reverse();
    // srting and reversing here to first test and remove seeds that are still
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
    const preResults = this.state.results;
    const resultObjects = results.map(result => {
      return { id: shortId.generate(), value: result, selected: false };
    });

    this.setState({
      results: [
        ...preResults, ...resultObjects
      ]
    }, () => {
      if (results[0] !== 6 || results[1] !== 6) {
        this.props.dieCastComplete();
        this.canPlayPlay()
      }
    });
  }

  rollDice = () => {
    const { playerTurn, loggedInPlayer, dieCast } = this.props;
    if (playerTurn !== loggedInPlayer) return;
    if (dieCast) return;
    const options = {
      element: this.state.element,
      numberOfDice: 2,
      callback: this.setDieRollResult
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
    this.setState({ results: [] })
  }

  moveSeed = () => {
    const results = this.state.results;
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
      this.setState({ results: resultsLeft });
      if (!resultsLeft.length) {
        this.endTurn()
      }
    });
  }

  renderSelectedDie = (colour) => {
    const { selectedSeed } = this.props;
    const { results } = this.state;
    const playDisabled = selectedSeed && results.filter(result => result.selected).length;
    return (
      <div className={styles.playMove}>
        <button disabled={!playDisabled} onClick={this.moveSeed} style={{ height: '30px' }}>
          Play it
      </button>
        {selectedSeed &&
          <span>
            Selected Seed:
          <span
              style={{
                display: 'inline-block',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50px',
                backgroundColor: COLOUR_CODE[colour.toLowerCase()],
                lineHeight: '40px',
                textAlign: 'center',
                marginLeft: '10px',
              }}>
              {selectedSeed.substr(4, 1)}
            </span>
          </span>
        }
      </div>
    )
  }
  renderDieResults = () => {
    const results = this.state.results;
    return results.map(result =>
      <div
        key={result.id}
        className={`${styles.dieResult} ${result.selected ? styles.selectedResult : ''}`}
        onClick={() => this.toggleDieResultSelected(result.id)}
      >
        {result.value}
      </div>
    )
  }

  render() {
    const {
      sideBoardWidth,
      playerTurn,
      loggedInPlayer,
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
      justifyContent: 'center',
      alignItems: 'center'
    };
    const disableButton = (playerTurn !== loggedInPlayer || dieCast) ? 'disabled' : null;
    const houseNumber = playerTurn.substr(1, 1);
    let colour = this.props.gameData[`house${NUMBER[houseNumber]}Cards`][`H${houseNumber}-Colour`];
    colour = colour.substr(0, 1).toUpperCase() + colour.substr(1, colour.length);
    return (
      <div style={containerStyle}>
        <hr className={styles.hRule} />
        <GameChat />
        <hr className={styles.hRule} />
        <div className={styles.playMoveContainer}>
          <p>Playing: {colour} House</p>
          {this.renderSelectedDie(colour)}
        </div>
        <hr className={styles.hRule} />
        <div className={styles.dieWindowContainer}>
          <div>
            {this.renderDieResults()}
          </div>
          <div id="roll-die"></div>
          <div
            className={`${styles.rollDieButton} ${styles[disableButton]}`}
            onClick={this.rollDice}>
            Roll Dice
          </div>
        </div>
        <hr className={styles.hRule} />
      </div>
    )
  }
}

function mapStateToProps({ gameSettings, gameData }) {
  return {
    sideBoardWidth: gameSettings.sideBoardWidth,
    playerTurn: gameData.playerTurn,
    loggedInPlayer: gameData.loggedInPlayer,
    selectedSeed: gameData.selectedSeed,
    dieCast: gameData.dieCast,
    gameData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveSeedToPosition,
    dieCastComplete,
    changeTurn,
    clearNotification,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBoard);