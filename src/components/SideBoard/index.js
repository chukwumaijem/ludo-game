import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { moveSeedToPosition } from '../../actions';

import styles from './SideBoard.module.css';

class SideBoard extends Component {
  setSeed = () => {
    const seedId = document.getElementById('seedId').value;
    const moves = document.getElementById('seedPosition').value;
    this.props.moveSeedToPosition(seedId, moves.split(''));
  }
  render() {
    const sideBoardWidth = this.props.sideBoardWidth;
    const containerStyle = {
      float: 'right',
      width: sideBoardWidth * 0.8,
      marginLeft: sideBoardWidth * 0.1,
      position: 'relative',
      height: '100%',
    };
    return (
      <div style={containerStyle}>
        <div className={styles.chatWindowContainer}>
          Chat Window
        </div>
        <div className={styles.dieWindowContainer}>
          <div>Roll</div>
          <div>
            Roll Results
          </div>
        </div>
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