import React, { Component } from 'react';
import { Breadcrumb, Container, Segment, Button } from 'semantic-ui-react'

import styles from './CreateGame.module.css';

class CreateGame extends Component {
  renderBreadCrumbers = () => {
    return (
      <Breadcrumb size="massive">
        <Breadcrumb.Section active>Players</Breadcrumb.Section>
        <Breadcrumb.Divider icon='long arrow right'
          style={{ margin: '5px 20px' }} />
        <Breadcrumb.Section link>House Settings</Breadcrumb.Section>
        <Breadcrumb.Divider icon='long arrow right'
          style={{ margin: '5px 20px' }} />
        <Breadcrumb.Section link>Audience</Breadcrumb.Section>
      </Breadcrumb>
    );
  }

  render() {
    return (
      <Container fluid textAlign="center" className={styles.container}>
        {this.renderBreadCrumbers()}
        <Segment padded="very" secondary>
          Hello
        </Segment>
      </Container>
    );
  }
};

export default CreateGame;
