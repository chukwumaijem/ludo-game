import React from 'react';
import HouseFrame from './house-frame.js';
import { HRailFrame, VRailFrame } from './rail-frame.js';
import GameSideBoard from './game-sideboard.js';

export default class GameFrame extends React.Component {

	constructor(){
		super();
		this.state = {
			houseOneCards: {
				'H1-C1': 'HL-15',
				'H1-C2': 'still',
				'H1-C3': 'still',
				'H1-C4': 'still',
				'H1-Colour': null
			},
			houseTwoCards: {
				'H2-C1': 'still',
				'H2-C2': 'still',
				'H2-C3': 'still',
				'H2-C4': 'VT-02',
				'H2-Colour': null
			},
			houseThreeCards: {
				'H3-C1': 'still',
				'H3-C2': 'still',
				'H3-C3': 'still',
				'H3-C4': 'still',
				'H3-Colour': null
			},
			houseFourCards: {
				'H4-C1': 'still',
				'H4-C2': 'still',
				'H4-C3': 'still',
				'H4-C4': 'still',
				'H4-Colour': null
			}
		};
		this.findSeedGroup = this.findSeedGroup.bind(this);
		this.setSeedPosition = this.setSeedPosition.bind(this);
	}

	componentWillMount() {
		this.setColours();
	}

	setColours() {
		const houseOneCards = this.state.houseOneCards;
		const houseTwoCards = this.state.houseTwoCards;
		const houseThreeCards = this.state.houseThreeCards;
		const houseFourCards = this.state.houseFourCards;

		houseOneCards["H1-Colour"] = 'green';
		houseTwoCards["H2-Colour"] = 'red';
		houseThreeCards["H3-Colour"] = 'yellow';
		houseFourCards["H4-Colour"] = 'blue';

		this.setState({
			houseOneCards: houseOneCards,
			houseTwoCards: houseTwoCards,
			houseThreeCards: houseThreeCards,
			houseFourCards: houseFourCards,
		});
	}

	getLudoSeeds() {
		let seeds = {};
		seeds = {...this.state.houseOneCards};
		seeds = {...seeds, ...this.state.houseTwoCards};
		seeds = {...seeds, ...this.state.houseThreeCards};
		seeds = {...seeds, ...this.state.houseFourCards};

		return seeds;
	}

	findSeedGroup(seedId) {
		let house;
		console.log(seedId);
		switch (seedId.substr(0, 2)){
			case 'H1':
				house = this.state.houseOneCards;
				break;
			case 'H2':
				house = this.state.houseTwoCards;
				break;
			case 'H3':
				house = this.state.houseThreeCards;
				break;
			case 'H4':
				house = this.state.houseFourCards;
				break;
			default:
				return;
		}

		return house;
	}

	setSeedPosition(seedId, seedPosition) {
		const seedGroup = this.findSeedGroup(seedId);
		console.log(seedGroup);
		seedGroup[seedId] = seedPosition;

		this.setState({seedGroup: seedGroup})
	}

	render() {
		const gameBoardHeight = this.props.gameBoardHeight;
		const houseHeight = gameBoardHeight * 0.4;
		const VRailHeight = gameBoardHeight * 0.4;
		const HRailHeight = gameBoardHeight * 0.2;
		const houseOneColour = this.state.houseOneCards["H1-Colour"];
		const houseTwoColour = this.state.houseTwoCards["H2-Colour"];
		const houseThreeColour = this.state.houseThreeCards["H3-Colour"];
		const houseFourColour = this.state.houseFourCards["H4-Colour"];
		const seedData = this.getLudoSeeds();
		const sideBoardWidth = window.innerWidth - gameBoardHeight;
		return (
			<div>
				<div className="" style={{float: 'left'}}>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<HouseFrame houseHeight={houseHeight} houseColour={houseOneColour} houseCards={this.state.houseOneCards} />
						<VRailFrame VRailHeight={VRailHeight} boxColour={houseTwoColour} boxPosition={'VT'} seedData={seedData} />
						<HouseFrame houseHeight={houseHeight} houseColour={houseTwoColour} houseCards={this.state.houseTwoCards} />
					</div>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<HRailFrame HRailHeight={HRailHeight} position={"left"} boxColour={houseOneColour} boxPosition={'HL'} seedData={seedData} />
						<div className="home" style={{width: HRailHeight, height: HRailHeight}}>
						</div>
						<HRailFrame HRailHeight={HRailHeight} position={"right"} boxColour={houseFourColour} boxPosition={'HR'} seedData={seedData} />
					</div>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<HouseFrame houseHeight={houseHeight} houseColour={houseThreeColour} position={"left"} houseCards={this.state.houseThreeCards} />
						<VRailFrame VRailHeight={VRailHeight} boxColour={houseThreeColour} boxPosition={'VB'} seedData={seedData} />
						<HouseFrame houseHeight={houseHeight} houseColour={houseFourColour} position={"right"} houseCards={this.state.houseFourCards} />
					</div>
				</div>
				<div style={{float: 'right', width: sideBoardWidth*0.6, marginLeft: sideBoardWidth*0.1}}>
	      	<GameSideBoard changeSeedPosition={this.setSeedPosition} />
	      </div>
      </div>
		);
	}
};