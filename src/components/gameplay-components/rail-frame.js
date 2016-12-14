import React from 'react';
import { buildRails } from '../../helpers/gameaction-helpers/seed-rail-build.js';

export class VRailFrame extends React.Component {
	render() {
		const VRailHeight = this.props.VRailHeight;
		const boxPosition = this.props.boxPosition;
		const boxColour = this.props.boxColour;
		const seedData = this.props.seedData;
		return (
			<div className="rails" style={{width: VRailHeight*0.5, height: VRailHeight}} >
				{buildRails(3, 6, VRailHeight * 0.5, boxPosition, boxColour, seedData)}
			</div>
		);
	}
};

export class HRailFrame extends React.Component {
	render() {
		const HRailHeight = this.props.HRailHeight;
		const boxPosition = this.props.boxPosition;
		const boxColour = this.props.boxColour;
		const seedData = this.props.seedData;
		return (
			<div className="rails" style={{width: HRailHeight*2, height: HRailHeight}} >
				{buildRails(6, 3, HRailHeight, boxPosition, boxColour, seedData)}
			</div>
		);
	}
};