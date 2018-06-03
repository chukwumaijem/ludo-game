import React, { Component } from 'react';
import { Step, Container, Segment, Button, Icon, Message, Input, Grid, Form, Select } from 'semantic-ui-react'

import styles from './CreateGame.module.css';

class CreateGame extends Component {
  state = {
    activeBreadCrumb: 'players',
    disableSettings: false,
    isMessageVisible: false,
    houseAssignment: 'roundRobin',
    gameStarter: 'playerOne',
    numberOfPlayers: 4,
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

  handleChange = ({ type, value }) => {
    this.setState({ [type]: value });
  };

  renderPlayerSettings = () => {
    const { houseAssignment, gameStarter, numberOfPlayers } = this.state;
    const options = [
      // { key: '1', text: 'One', value: 1 }, playing with COM not supported ATM
      { key: '2', text: 'Two', value: 2 },
      { key: '3', text: 'Three', value: 3 },
      { key: '4', text: 'Four', value: 4 },
    ];
    return (
      <Form>
        <Form.Group inline>
          <Form.Field
            control={Select}
            label='Number of players'
            options={options}
            onChange={(e, values) => this.handleChange({ type: 'numberOfPlayers', value: values.value })}
            value={numberOfPlayers}
          />
        </Form.Group>
        <Form.Group width="8" inline>
          <label>Assign Player Houses</label>
          <Form.Radio
            label='Round Robin'
            value='roundRobin'
            checked={houseAssignment === 'roundRobin'}
            onChange={() => this.handleChange({ type: 'houseAssignment', value: 'roundRobin' })}
          />
          <Form.Radio
            label='Random'
            value='random'
            checked={houseAssignment === 'random'}
            onChange={() => this.handleChange({ type: 'houseAssignment', value: 'random' })}
          />
        </Form.Group>
        <Form.Group width="8" inline>
          <label>Which Player starts the game</label>
          <Form.Radio
            label='Player One'
            value='playerOne'
            checked={gameStarter === 'playerOne'}
            onChange={() => this.handleChange({ type: 'gameStarter', value: 'playerOne' })}
          />
          <Form.Radio
            label='Random'
            value='md'
            checked={gameStarter === 'random'}
            onChange={() => this.handleChange({ type: 'gameStarter', value: 'random' })}
          />
          <Form.Radio
            label='First To Join'
            value='md'
            checked={gameStarter === 'firstToJoin'}
            onChange={() => this.handleChange({ type: 'gameStarter', value: 'firstToJoin' })}
          />
        </Form.Group>
      </Form>
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

  copyGameLink = () => {
    const roomLink = 'some really long link';
    const link = document.getElementById('gameLink');
    link.value = roomLink;
    link.select();
    document.execCommand('copy');
    this.setState({ isMessageVisible: true });
    setTimeout(() => this.setState({ isMessageVisible: false }), 3000);
  };

  render() {
    const { activeBreadCrumb, disableSettings, isMessageVisible } = this.state;
    const lastSection = activeBreadCrumb === 'audience';
    const roomLink = '';
    return (
      <Container fluid textAlign="center" className={styles.container}>
        {this.renderBreadCrumbs()}
        <Segment padded size={'massive'} clearing className={styles.formContainer}>
          <Segment raised compact size='massive'>
            <div className={styles.formInputs}>
              {activeBreadCrumb === 'players' && this.renderPlayerSettings()}
              {activeBreadCrumb === 'houses' && this.renderHouseSettings()}
              {activeBreadCrumb === 'audience' && this.renderAudienceSettings()}
            </div>
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
        <Segment disabled={!disableSettings} padded>
          <Grid textAlign={'left'}>
            <Grid.Row columns={3}>
              <Grid.Column width={8}>
                <span>
                GameLink: <Input as="span" id="gameLink" value={roomLink} type="text" transparent/>
                </span>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button disabled={!disableSettings} onClick={this.copyGameLink}>Copy</Button>
                <Message info size="mini" hidden={!isMessageVisible} compact>
                  Copied!
                </Message>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button disabled={!disableSettings}>Join Room</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default CreateGame;
