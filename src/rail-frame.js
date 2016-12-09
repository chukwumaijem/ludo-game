import React from 'react';

function buildRails(col, row, size, position, colour) {
	const boxSize = size/3;
	const railBox = [];
	const className = `railbox box-${colour}-${position}`;
	for (let i = 0; i < col; i++) {
		for(let j = 0; j < row; j++) {
			railBox.push(<div className={className} style={{width: boxSize, height: boxSize}} key={`${i}${j}`}></div>);
		}
	}

	return railBox;
}

export class VRailFrame extends React.Component {
	render() {
		const VRailHeight = this.props.VRailHeight;
		return (
			<div className="rails" style={{width: VRailHeight*0.5, height: VRailHeight}} >
				{buildRails(3, 6, VRailHeight * 0.5)}
			</div>
		);
	}
};

export class HRailFrame extends React.Component {
	render() {
		const HRailHeight = this.props.HRailHeight;
		const className = `rails rails-h-${this.props.position}`;
		return (
			<div className={className} style={{width: HRailHeight*2, height: HRailHeight}} >
				{buildRails(6, 3, HRailHeight, )}
			</div>
		);
	}
};