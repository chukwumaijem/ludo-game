import React from 'react';
import ReactDOM from 'react-dom';
import HouseFrame from './house-frame.js';
import { HRailFrame, VRailFrame } from './rail-frame.js';

export default class GameFrame extends React.Component {
	render() {
		const houseHeight = window.innerHeight * 0.4;
		const VRailHeight = window.innerHeight * 0.4;
		const HRailHeight = window.innerHeight * 0.2;
		return (
			<div className="">
				<HouseFrame houseHeight={houseHeight}/>
				<VRailFrame VRailHeight={VRailHeight}/>
				<HouseFrame houseHeight={houseHeight}/>
				<div>
					<HRailFrame HRailHeight={HRailHeight} position={"left"}/>
					<div className="home" style={{width: HRailHeight, height: HRailHeight}}>
					</div>
					<HRailFrame HRailHeight={HRailHeight} position={"right"}/>
				</div>
				<HouseFrame houseHeight={houseHeight} position={"left"}/>
				<VRailFrame VRailHeight={VRailHeight}/>
				<HouseFrame houseHeight={houseHeight} position={"right"}/>
			</div>
		);
	}
};