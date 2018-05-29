import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class PageHeader extends Component {
  handleUserAuth = () => {
    const { currenUser } = this.props;
    if (currenUser) {
      // this.props.logout()
    }
  }

  render() {
    const { currenUser } = this.props;
    return (
      <Menu attached="top" borderless color="brown" fluid size={'massive'}>
        <Menu.Item href="/">DazeLudo</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="how-to-play">How to Play</Menu.Item>
          <Menu.Item href="rooms">Public Rooms</Menu.Item>
          {
            currenUser ?
              <Menu.Item name='Log Out' onClick={this.handleUserAuth} />
              :
              <Menu.Item name='Login' href="login" onClick={this.handleUserAuth} />
          }
        </Menu.Menu>
      </Menu>
    );
  }
};
export default PageHeader;
