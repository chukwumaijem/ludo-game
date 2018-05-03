import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { moveSeedToPosition } from '../../actions';

class SideBoard extends Component {
  setSeed = () => {
    const seedId = document.getElementById('seedId').value;
    const moves = document.getElementById('seedPosition').value;
    this.props.moveSeedToPosition(seedId, moves.split(''));
  }
  render() {
    const sideBoardWidth = this.props.width;
    return (
      <div style={{ float: 'right', width: sideBoardWidth * 0.6, marginLeft: sideBoardWidth * 0.1 }}>
        <div className="text-center" style={{ display: 'inline-block', justifyContent: 'center' }}>
          <input id="seedId" type="text" placeholder="Enter Seed id" /><br />
          <input id="seedPosition" type="text" placeholder="Enter new position" /><br />
          <button onClick={this.setSeed}>Set Seed</button>
        </div>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    moveSeedToPosition,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SideBoard);