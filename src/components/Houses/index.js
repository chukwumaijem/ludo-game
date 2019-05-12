import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { disableInactiveHouseSeed, setDisabled } from '../../actions';
import HouseFrame from '../House';
import { HRailFrame, VRailFrame } from '../Rails';
import { getLudoSeeds } from '../../utils/moveSeed';

class Houses extends Component {
  state = {
    disabled: {
      red: false,
      green: false,
      blue: false,
      yellow: false,
    }
  }

  componentDidMount() {
    const playerTurn = this.props.gameData.playerTurn;
    this.props.disableInactiveHouseSeed(playerTurn);
    this.disableEmptyHouses();
  }

  disableEmptyHouses = () => {
    const { numberOfPlayers } = this.props;
    const disabled = { ...this.state.disabled };
    const colors = ['red', 'green', 'blue', 'yellow'];
    if (numberOfPlayers === 3) {
      const color = colors[Math.floor(Math.random() * 4)];
      disabled[color] = true;
      return this.props.setDisabled({ disabled });
    } else if (numberOfPlayers === 2) {
      const overide = [
        { green: true, blue: true },
        { red: true, yellow: true }
      ][Math.floor(Math.random() * 2)];
      return this.props.setDisabled({ disabled: { ...disabled, ...overide } });
    }

    this.props.setDisabled(this.state.disabled);
  }

  render() {
    const { setDisabledHousesComplete, gameBoardHeight } = this.props;
    const houseHeight = gameBoardHeight * 0.4;
    const VRailHeight = gameBoardHeight * 0.4;
    const HRailHeight = gameBoardHeight * 0.2;
    const houseOneColour = this.props.houseOneCards["H1-Colour"];
    const houseTwoColour = this.props.houseTwoCards["H2-Colour"];
    const houseThreeColour = this.props.houseThreeCards["H3-Colour"];
    const houseFourColour = this.props.houseFourCards["H4-Colour"];
    const seedData = getLudoSeeds(this.props.gameData);
    if (!setDisabledHousesComplete) return (<h5>Loading...</h5>);
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
    gameBoardHeight: gameSettings.gameBoardHeight,
    numberOfPlayers: gameData.numberOfPlayers,
    setDisabledHousesComplete: gameData.setDisabledHousesComplete,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    disableInactiveHouseSeed,
    setDisabled
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
