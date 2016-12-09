import React from 'react';

function buildRails(col, row, size, position, colour) {
	const boxSize = size/3;
	const railBox = [];
	const colorBox = [5, 6, 8, 11, 14, 17];
	let className = `railbox box-${position}`;
	let count = 1;
	const extendClassName = `${className} box-${colour}`
	for (let i = 0; i < col; i++) {
		for(let j = 0; j < row; j++) {
			let boxClassColour = className;
			if(colorBox.indexOf(count) >= 0){
				boxClassColour = extendClassName;
			}
			railBox.push(<div className={boxClassColour} style={{width: boxSize, height: boxSize}} key={`${i}${j}`}></div>);
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
				{buildRails(6, 3, HRailHeight, boxPosition, boxColour )}
			</div>
		);
	}
};