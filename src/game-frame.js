import React from 'react';
import HouseFrame from './house-frame.js';
import { HRailFrame, VRailFrame } from './rail-frame.js';

export default class GameFrame extends React.Component {
	constructor(){
		super();
		this.state = {
			houseOneCards: {
				cardOne: 'still',
				cardTwo: 'still',
				cardThree: 'still',
				cardFour: 'still'
			},
			houseTwoCards: {
				cardOne: 'still',
				cardTwo: 'still',
				cardThree: 'still',
				cardFour: 'still'
			},
			houseThreeCards: {
				cardOne: 'still',
				cardTwo: 'still',
				cardThree: 'still',
				cardFour: 'still'
			},
			houseFourCards: {
				cardOne: 'still',
				cardTwo: 'still',
				cardThree: 'still',
				cardFour: 'still'
			}
		}
	}
	render() {
		const gameBoardHeight = this.props.gameBoardHeight;
		const houseHeight = gameBoardHeight * 0.4;
		const VRailHeight = gameBoardHeight * 0.4;
		const HRailHeight = gameBoardHeight * 0.2;
		const houseOneColour = "green";
		const houseTwoColour = "red";
		const houseThreeColour = "yellow";
		const houseFourColour = "blue";
		return (
			<div className="">
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<HouseFrame houseHeight={houseHeight} houseColour={houseOneColour} houseCards={this.state.houseOneCards} />
					<VRailFrame VRailHeight={VRailHeight} boxColour={houseTwoColour} boxPosition={'VT'} />
					<HouseFrame houseHeight={houseHeight} houseColour={houseTwoColour} houseCards={this.state.houseTwoCards} />
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<HRailFrame HRailHeight={HRailHeight} position={"left"} boxColour={houseOneColour} boxPosition={'HL'} />
					<div className="home" style={{width: HRailHeight, height: HRailHeight}}>
					</div>
					<HRailFrame HRailHeight={HRailHeight} position={"right"} boxColour={houseFourColour} boxPosition={'HR'} />
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<HouseFrame houseHeight={houseHeight} houseColour={houseThreeColour} position={"left"} houseCards={this.state.houseThreeCards} />
					<VRailFrame VRailHeight={VRailHeight} boxColour={houseThreeColour} boxPosition={'VB'} />
					<HouseFrame houseHeight={houseHeight} houseColour={houseFourColour} position={"right"} houseCards={this.state.houseFourCards} />
				</div>
			</div>
		);
	}
};