import React from 'react';
import ReactDOM from 'react-dom';

export default class HouseFrame extends React.Component {
	render() {
		const houseHeight = this.props.houseHeight;
		const className = `house house-${this.props.position}`;
		return (
			<div className="house" style={{width: houseHeight, height: houseHeight}}>
				<div className="text-center">House {houseHeight}</div>
			</div>
		);
	}
};

// export function HouseFrame( houseHeight ) {
// 	const className = `house house-${this.props.position}`;
// 	return (
// 			<div className="house" style={{width: houseHeight, height: houseHeight}}>
// 				<div className="text-center">House {houseHeight}</div>
// 			</div>
// 		);
// }