import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rollADie from 'roll-a-die';
import shortId from 'shortid';

import { moveSeedToPosition } from '../../actions';
import GameChat from '../GameChat';

import styles from './SideBoard.module.css';

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
    })
  }

  rollDice = () => {
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
    const sideBoardWidth = this.props.sideBoardWidth;
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

    return (
      <div style={containerStyle}>
        <hr className={styles.hRule} />
        <GameChat />
        <hr className={styles.hRule} />
        <div className={styles.dieWindowContainer}>
          <div>
            {this.renderDieResults()}
          </div>
          <div id="roll-die"></div>
          <div className={styles.rollDieButton} onClick={this.rollDice}>
            Roll Dice
          </div>
        </div>
        <hr className={styles.hRule} />
      </div>
    )
  }
}

function mapStateToProps({ gameSettings }) {
  return {
    sideBoardWidth: gameSettings.sideBoardWidth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveSeedToPosition,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBoard);