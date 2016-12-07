import React from 'react';
import ReactDOM from 'react-dom';

export class VRailFrame extends React.Component {
	render() {
		const VRailHeight = this.props.VRailHeight;
		return (
			<div className="rails" style={{width: VRailHeight*0.5, height: VRailHeight}} >
			Vertical Rails
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
			Horizontal Rails
			</div>
		);
	}
};