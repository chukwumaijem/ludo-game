import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { disableInactiveHouseSeed } from '../../actions';
import HouseFrame from '../House';
import { HRailFrame, VRailFrame } from '../Rails';
import { getLudoSeeds } from '../../utils/moveSeed';

class Houses extends Component {
  componentDidMount() {
    const playerTurn = this.props.gameData.playerTurn;
    this.props.disableInactiveHouseSeed(playerTurn);
  }

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
          <HouseFrame houseHeight={houseHeight} houseNumber={1} />
          <VRailFrame
            VRailHeight={VRailHeight}
            boxColour={houseTwoColour}
            boxPosition={'VT'}
            seedData={seedData}
          />
          <HouseFrame houseHeight={houseHeight} houseNumber={2} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HRailFrame
            HRailHeight={HRailHeight}
            position={"left"}
            boxColour={houseOneColour}
            boxPosition={'HL'}
            seedData={seedData}
          />
          <div className="home" style={{ width: HRailHeight, height: HRailHeight }}>
          </div>
          <HRailFrame
            HRailHeight={HRailHeight}
            position={"right"}
            boxColour={houseFourColour}
            boxPosition={'HR'}
            seedData={seedData}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HouseFrame houseHeight={houseHeight} houseNumber={3} />
          <VRailFrame
            VRailHeight={VRailHeight}
            boxColour={houseThreeColour}
            boxPosition={'VB'}
            seedData={seedData}
          />
          <HouseFrame houseHeight={houseHeight} position={"right"} houseNumber={4} />
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    disableInactiveHouseSeed,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Houses);