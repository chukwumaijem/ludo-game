import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { disableInactiveHouseSeed, setDisabled } from '../../actions';
import HouseFrame from '../House';
import { HRailFrame, VRailFrame } from '../Rails';
import { getLudoSeeds } from '../../utils/moveSeed';
import { disableEmptyHouses } from '../..//helpers';

class Houses extends Component {
  componentDidMount() {
    // const playerTurn = this.props.gameData.playerTurn;
    // this.props.disableInactiveHouseSeed(playerTurn);
    const { numberOfPlayers } = this.props;
    disableEmptyHouses(this.props.setDisabled, numberOfPlayers);
  }

  render() {
    const { setDisabledHousesComplete, gameBoardHeight, disabledHouses } = this.props;
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
          <HouseFrame houseHeight={houseHeight} houseNumber={1} disabled={disabledHouses['blue']} />
          <VRailFrame
            VRailHeight={VRailHeight}
            boxColour={houseTwoColour}
            boxPosition={'VT'}
            seedData={seedData}
            disabled={disabledHouses['red']}
          />
          <HouseFrame houseHeight={houseHeight} houseNumber={2} disabled={disabledHouses['red']} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HRailFrame
            HRailHeight={HRailHeight}
            position={"left"}
            boxColour={houseOneColour}
            boxPosition={'HL'}
            seedData={seedData}
            disabled={disabledHouses['blue']}
          />
          <div className="home" style={{ width: HRailHeight, height: HRailHeight }}>
          </div>
          <HRailFrame
            HRailHeight={HRailHeight}
            position={"right"}
            boxColour={houseFourColour}
            boxPosition={'HR'}
            seedData={seedData}
            disabled={disabledHouses['green']}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HouseFrame houseHeight={houseHeight} houseNumber={3} disabled={disabledHouses['yellow']} />
          <VRailFrame
            VRailHeight={VRailHeight}
            boxColour={houseThreeColour}
            boxPosition={'VB'}
            seedData={seedData}
            disabled={disabledHouses['yellow']}
          />
          <HouseFrame houseHeight={houseHeight} position={"right"} houseNumber={4} disabled={disabledHouses['green']} />
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
    disabledHouses: gameData.disabledHouses,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    disableInactiveHouseSeed,
    setDisabled
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
