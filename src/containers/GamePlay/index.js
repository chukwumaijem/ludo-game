import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HouseFrame from '../../components/gameplay-components/house-frame.js';
import { HRailFrame, VRailFrame } from '../../components/gameplay-components/rail-frame.js';
import { startPoint, newSeedPosition } from '../../helpers/gameaction-helpers/seed-path.js';

import { setHouseColours } from '../../actions';
import SideBoard from '../../components/SideBoard';

class GameFrame extends React.Component {

  componentWillMount() {
    this.props.setHouseColours();
  }

	/**
	 * getLudoSeeds
	 *
	 * Merge all the seeds into a single object
	 * this is to make matching and iteration easier.
	 */
  getLudoSeeds() {
    let seeds = {};
    seeds = { ...this.props.gameData.houseOneCards };
    seeds = { ...seeds, ...this.props.gameData.houseTwoCards };
    seeds = { ...seeds, ...this.props.gameData.houseThreeCards };
    seeds = { ...seeds, ...this.props.gameData.houseFourCards };

    return seeds;
  }



  render() {
    const gameBoardHeight = this.props.gameBoardHeight;
    const houseHeight = gameBoardHeight * 0.4;
    const VRailHeight = gameBoardHeight * 0.4;
    const HRailHeight = gameBoardHeight * 0.2;
    const houseOneColour = this.props.gameData.houseOneCards["H1-Colour"];
    const houseTwoColour = this.props.gameData.houseTwoCards["H2-Colour"];
    const houseThreeColour = this.props.gameData.houseThreeCards["H3-Colour"];
    const houseFourColour = this.props.gameData.houseFourCards["H4-Colour"];
    const seedData = this.getLudoSeeds();
    const sideBoardWidth = window.innerWidth - gameBoardHeight;
    return (
      <div>
        <div className="" style={{ float: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HouseFrame houseHeight={houseHeight} houseColour={houseOneColour} houseCards={this.props.gameData.houseOneCards} />
            <VRailFrame VRailHeight={VRailHeight} boxColour={houseTwoColour} boxPosition={'VT'} seedData={seedData} />
            <HouseFrame houseHeight={houseHeight} houseColour={houseTwoColour} houseCards={this.props.gameData.houseTwoCards} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HRailFrame HRailHeight={HRailHeight} position={"left"} boxColour={houseOneColour} boxPosition={'HL'} seedData={seedData} />
            <div className="home" style={{ width: HRailHeight, height: HRailHeight }}>
            </div>
            <HRailFrame HRailHeight={HRailHeight} position={"right"} boxColour={houseFourColour} boxPosition={'HR'} seedData={seedData} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HouseFrame houseHeight={houseHeight} houseColour={houseThreeColour} position={"left"} houseCards={this.props.gameData.houseThreeCards} />
            <VRailFrame VRailHeight={VRailHeight} boxColour={houseThreeColour} boxPosition={'VB'} seedData={seedData} />
            <HouseFrame houseHeight={houseHeight} houseColour={houseFourColour} position={"right"} houseCards={this.props.gameData.houseFourCards} />
          </div>
        </div>
        <SideBoard width={sideBoardWidth} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    gameData: state.gameData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setHouseColours,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFrame);