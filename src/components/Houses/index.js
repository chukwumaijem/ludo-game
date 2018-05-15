import React, { Component } from 'react';
import { connect } from 'react-redux';

import HouseFrame from '../House';
import { HRailFrame, VRailFrame } from '../Rails';
import { getLudoSeeds } from '../../utils/moveSeed';

class Houses extends Component {

  render() {
    const gameBoardHeight = this.props.gameBoardHeight;
    const houseHeight = gameBoardHeight * 0.4;
    const VRailHeight = gameBoardHeight * 0.4;
    const HRailHeight = gameBoardHeight * 0.2;
    const houseOneColour = this.props.houseOneCards["H1-Colour"];
    const houseTwoColour = this.props.houseTwoCards["H2-Colour"];
    const houseThreeColour = this.props.houseThreeCards["H3-Colour"];
    const houseFourColour = this.props.houseFourCards["H4-Colour"];
    const seedData = getLudoSeeds(this.props.gameData);
    return (
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
    );
  }
}

function mapStateToProps({ gameData, gameSettings }) {
  return {
    houseOneCards: gameData.houseOneCards,
    houseTwoCards: gameData.houseTwoCards,
    houseThreeCards: gameData.houseThreeCards,
    houseFourCards: gameData.houseFourCards,
    gameData,
    gameBoardHeight: gameSettings.gameBoardHeight
  }
}
export default connect(mapStateToProps)(Houses);