import React, { Component } from 'react';
import { Step, Container, Segment, Button, Icon } from 'semantic-ui-react'

import styles from './CreateGame.module.css';

class CreateGame extends Component {
  state = {
    activeBreadCrumb: 'players',
    disableSettings: false,
  };

  renderBreadCrumbs = () => {
    const { activeBreadCrumb } = this.state;
    const players = activeBreadCrumb === 'players';
    const houses = activeBreadCrumb === 'houses';
    const audience = activeBreadCrumb === 'audience';

    return (
      <Step.Group>
        <Step active={players} onClick={() => this.skipToSection('players')} as={players ? 'div' : 'a'}>
          <Icon name='users'/>
          <Step.Content>
            <Step.Title>Players</Step.Title>
            <Step.Description>Set Player options</Step.Description>
          </Step.Content>
        </Step>

        <Step active={houses} onClick={() => this.skipToSection('houses')} as={houses ? 'div' : 'a'}>
          <Icon name='square'/>
          <Step.Content>
            <Step.Title>Houses</Step.Title>
            <Step.Description>Set players starting positions</Step.Description>
          </Step.Content>
        </Step>

        <Step active={audience} onClick={() => this.skipToSection('audience')} as={audience ? 'div' : 'a'}>
          <Icon name='street view'/>
          <Step.Content>
            <Step.Title>Audience</Step.Title>
            <Step.Description>What kind of audience do you want?</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  };

  renderPlayerSettings = () => {
    return (
      <div>
        Players
      </div>
    );
  };

  renderHouseSettings = () => {
    return (
      <div>
        Houses
      </div>
    );
  };

  renderAudienceSettings = () => {
    return (
      <div>
        Audience
      </div>
    );
  };

  generateRoomId = () => {
    this.setState({ disableSettings: true });
  };

  skipToSection = (section) => {
    if (this.state.disableSettings) return;
    this.setState({ activeBreadCrumb: section });
  };

  nextStep = () => {
    const { activeBreadCrumb } = this.state;
    const steps = ['players', 'houses', 'audience'];
    const currentIndex = steps.indexOf(activeBreadCrumb);
    if (currentIndex === steps.length - 1) {
      return this.generateRoomId();
    }
    this.setState({ activeBreadCrumb: steps[currentIndex + 1] });
  };

  render() {
    const { activeBreadCrumb, disableSettings } = this.state;
    const lastSection = activeBreadCrumb === 'audience';
    return (
      <Container fluid textAlign="center" className={styles.container}>
        {this.renderBreadCrumbs()}
        <Segment padded size={'massive'} clearing>
          <Segment raised>
            {activeBreadCrumb === 'players' && this.renderPlayerSettings()}
            {activeBreadCrumb === 'houses' && this.renderHouseSettings()}
            {activeBreadCrumb === 'audience' && this.renderAudienceSettings()}
            <Button
              color={'blue'}
              onClick={this.nextStep}
              style={{ marginTop: '10px' }}
              disabled={disableSettings}>
              {lastSection ? 'Create Room' : 'Next'}
            </Button>
          </Segment>
          <Button color={'teal'} onClick={this.generateRoomId}>Start With Defaults</Button>
        </Segment>
        <Segment disabled={!disableSettings} secondary>
          RoomId: ''
          <Button>Join Room</Button>
        </Segment>
      </Container>
    );
  }
}

export default CreateGame;
