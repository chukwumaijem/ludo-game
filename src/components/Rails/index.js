import React, { Component } from 'react';
import { buildRails } from '../../utils/buildRails';

export class VRailFrame extends Component {
  render() {
    const VRailHeight = this.props.VRailHeight;
    const boxPosition = this.props.boxPosition;
    const boxColour = this.props.boxColour;
    const seedData = this.props.seedData;
    return (
      <div className="rails" style={{ width: VRailHeight * 0.5, height: VRailHeight }} >
        {buildRails(3, 6, VRailHeight * 0.5, boxPosition, boxColour, seedData)}
      </div>
    );
  }
};

export class HRailFrame extends Component {
  render() {
    const HRailHeight = this.props.HRailHeight;
    const boxPosition = this.props.boxPosition;
    const boxColour = this.props.boxColour;
    const seedData = this.props.seedData;
    return (
      <div className="rails" style={{ width: HRailHeight * 2, height: HRailHeight }} >
        {buildRails(6, 3, HRailHeight, boxPosition, boxColour, seedData)}
      </div>
    );
  }
};