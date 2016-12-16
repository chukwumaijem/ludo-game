import React from 'react';

export default class GameSideBoard extends React.Component {
  constructor() {
    super();
    this.setSeed = this.setSeed.bind(this);
  }

  setSeed() {
    const seedId = document.getElementById('seedId').value;
    const moves = document.getElementById('seedPosition').value;
    this.props.seedMove(seedId, moves.split(''));
  }

  render() {
    return (
      <div className="text-center" style={{ display: 'inline-block', justifyContent: 'center' }}>
        <input id="seedId" type="text" placeholder="Enter Seed id" /><br />
        <input id="seedPosition" type="text" placeholder="Enter new position" /><br />
        <button onClick={this.setSeed}>Set Seed</button>
      </div>
    );
  }
};

