import React from 'react';

function buildRails(col, row, size, position, colour) {
	const boxSize = size/3;
	const railBox = [];
	const className = `railbox`;
	let colourBoxes;
	let count = 1;
	const extendClassName = `${className} box-${colour}`;

	switch (position) {
		case 'VT':
			colourBoxes = [5, 6, 8, 11, 14, 17];
			break;
		case 'VB':
			colourBoxes = [2, 5, 8, 11, 13, 14];
			break;
		case 'HR':
			colourBoxes = [7, 8, 9, 10, 11, 17];
			break;
		case 'HL':
			colourBoxes = [2, 8, 9, 10, 11, 12];
			break;
		default:
			return;
	}

	for (let i = 0; i < col; i++) {
		for(let j = 0; j < row; j++) {
			let boxColourClass = className;
			if (colourBoxes.indexOf(count) >=0 ) {
				boxColourClass = extendClassName;
			}
			railBox.push(<div
				id={`${position}-count`}
				className={boxColourClass}
				style={{width: boxSize, height: boxSize}}
				key={`${i}${j}`}>
				</div>);
			count++;
		}
	}

	return railBox;
}

export class VRailFrame extends React.Component {
	render() {
		const VRailHeight = this.props.VRailHeight;
		const boxPosition = this.props.boxPosition;
		const boxColour = this.props.boxColour;
		return (
			<div className="rails" style={{width: VRailHeight*0.5, height: VRailHeight}} >
				{buildRails(3, 6, VRailHeight * 0.5, boxPosition, boxColour)}
			</div>
		);
	}
};

export class HRailFrame extends React.Component {
	render() {
		const HRailHeight = this.props.HRailHeight;
		const className = `rails rails-h-${this.props.position}`;
		const boxPosition = this.props.boxPosition;
		const boxColour = this.props.boxColour;
		return (
			<div className={className} style={{width: HRailHeight*2, height: HRailHeight}} >
				{buildRails(6, 3, HRailHeight, boxPosition, boxColour)}
			</div>
		);
	}
};