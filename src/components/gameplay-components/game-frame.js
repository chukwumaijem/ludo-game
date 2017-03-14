import React from 'react';
import HouseFrame from './house-frame.js';
import { HRailFrame, VRailFrame } from './rail-frame.js';
import GameSideBoard from './game-sideboard.js';
import { startPoint, newSeedPosition } from '../../helpers/gameaction-helpers/seed-path.js';

export default class GameFrame extends React.Component {

  constructor() {
    super();
    this.state = {
      houseOneCards: {
        'H1-C1': 'HL-01',
        'H1-C2': 'still',
        'H1-C3': 'still',
        'H1-C4': 'still',
        'H1-Colour': null
      },
      houseTwoCards: {
        'H2-C1': 'VT-12',
        'H2-C2': 'still',
        'H2-C3': 'still',
        'H2-C4': 'still',
        'H2-Colour': null
      },
      houseThreeCards: {
        'H3-C1': 'VB-40',
        'H3-C2': 'still',
        'H3-C3': 'still',
        'H3-C4': 'still',
        'H3-Colour': null
      },
      houseFourCards: {
        'H4-C1': 'HR-24',
        'H4-C2': 'still',
        'H4-C3': 'still',
        'H4-C4': 'still',
        'H4-Colour': null
      }
    };
    this.findSeedGroup = this.findSeedGroup.bind(this);
    this.setSeedPosition = this.setSeedPosition.bind(this);
    this.killSeed = this.killSeed.bind(this);
    this.getSeedPosition = this.getSeedPosition.bind(this);
  }

  componentWillMount() {
    this.setColours();
  }

  /**
   * setColours
   * 
   * Sets the colour of the houses
   * and indirectly of the seeds.
   * Will later be used to allow playes choose house colours
   */
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

	/**
	 * getLudoSeeds
	 *
	 * Merge all the seeds into a single object
	 * this is to make matching and iteration easier.
	 */
  getLudoSeeds() {
    let seeds = {};
    seeds = { ...this.state.houseOneCards };
    seeds = { ...seeds, ...this.state.houseTwoCards };
    seeds = { ...seeds, ...this.state.houseThreeCards };
    seeds = { ...seeds, ...this.state.houseFourCards };

    return seeds;
  }

  /**
   * findSeedGroup
   * 
   * gets the house a seed belongs to
   */
  findSeedGroup(seedId) {
    let house;

    switch (seedId.substr(0, 2)) {
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

  /**
   * killSeed
   * 
   * returns a seed to its house if another seeds
   * move ends at its position.
   */
  killSeed(seedPosition) {
    const seeds = this.getLudoSeeds();
    const seedId = Object.keys(seeds).filter((seed) => {
      return seeds[seed] === seedPosition;
    }).toString();
    if (seedId) {
      const seedGroup = this.findSeedGroup(seedId);
      seedGroup[seedId] = 'still';
      this.setState({ seedGroup: seedGroup });
    }
  }

  /**
   * getSeedPosition
   * 
   * gets the current position of a seed
   */
  getSeedPosition(seedId) {
    const seedGroup = this.findSeedGroup(seedId);
    return seedGroup[seedId];
  }

  /**
   * setSeedPosition
   * 
   * Updates the seed state to chnge
   * its positions on the game board.
   */
  setSeedPosition(seedId, moves) {
    // setInterval(() => {
    if (this.getSeedPosition(seedId) === 'still' && moves.includes(6)) {
      setTimeout(() => {
        startPoint(seedId);
        moves.splice(moves.indexOf(6), 1);
      }, 500);
    }
    if (moves.length > 0) {
      moves.forEach((move, ind) => {
        setTimeout(() => {
          for (let i = 0; i < move; i++) {
            const seedGroup = this.findSeedGroup(seedId);
            const currentSeedPosition = this.getSeedPosition(seedId);
            const lastMove = (i + 1 == move && !moves[ind + 1]) ? true : false;
            const seedPosition = newSeedPosition(seedId, currentSeedPosition);

            if (lastMove) {
              this.killSeed(seedPosition);
            }
            seedGroup[seedId] = seedPosition;
            this.setState({ seedGroup: seedGroup });
          }
        });
      }, 500);
    }
    // }, 300);
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
        <div className="" style={{ float: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HouseFrame houseHeight={houseHeight} houseColour={houseOneColour} houseCards={this.state.houseOneCards} />
            <VRailFrame VRailHeight={VRailHeight} boxColour={houseTwoColour} boxPosition={'VT'} seedData={seedData} />
            <HouseFrame houseHeight={houseHeight} houseColour={houseTwoColour} houseCards={this.state.houseTwoCards} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HRailFrame HRailHeight={HRailHeight} position={"left"} boxColour={houseOneColour} boxPosition={'HL'} seedData={seedData} />
            <div className="home" style={{ width: HRailHeight, height: HRailHeight }}>
            </div>
            <HRailFrame HRailHeight={HRailHeight} position={"right"} boxColour={houseFourColour} boxPosition={'HR'} seedData={seedData} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HouseFrame houseHeight={houseHeight} houseColour={houseThreeColour} position={"left"} houseCards={this.state.houseThreeCards} />
            <VRailFrame VRailHeight={VRailHeight} boxColour={houseThreeColour} boxPosition={'VB'} seedData={seedData} />
            <HouseFrame houseHeight={houseHeight} houseColour={houseFourColour} position={"right"} houseCards={this.state.houseFourCards} />
          </div>
        </div>
        <div style={{ float: 'right', width: sideBoardWidth * 0.6, marginLeft: sideBoardWidth * 0.1 }}>
          <GameSideBoard seedMove={this.setSeedPosition} />
        </div>
      </div>
    );
  }
};
