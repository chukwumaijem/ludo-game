import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rollADie from 'roll-a-die';
import shortId from 'shortid';

import { moveSeedToPosition, dieCastComplete } from '../../actions';
import GameChat from '../GameChat';

import styles from './SideBoard.module.css';
const NUMBER = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
};

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

  setDieRollResult = (results) => {
    const resultObjects = results.map(result => {
      return { id: shortId.generate(), value: result, selected: false };
    });
    this.setState(prevState => {
      return {
        results: [...prevState.results, ...resultObjects]
      }
    });
    if (results[0] !== 6 || results[1] !== 6) {
      this.props.dieCastComplete();
    }
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
      selectedSeed,
      dieCast,
      playComplete
    } = this.props;
    const { results } = this.state;
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
    const playDisabled = selectedSeed && results.length;
    return (
      <div style={containerStyle}>
        <hr className={styles.hRule} />
        <GameChat />
        <hr className={styles.hRule} />
        <div className={styles.playMoveContainer}>
          <p>Playing: Player {NUMBER[playerTurn.substr(1, 1)]}</p>
          <div className={styles.playMove}>
            <button disabled={!playDisabled}>Play it</button>
            {selectedSeed &&
              <span>
                Selected Seed: Seed {NUMBER[selectedSeed.substr(4, 1)]}
              </span>
            }
          </div>
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
    playComplete: gameData.playComplete,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveSeedToPosition,
    dieCastComplete,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBoard);