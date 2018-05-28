import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from 'semantic-ui-react';

import styles from './HomePage.module.css';

const HomePage = () => <Container fluid>
  <Grid columns={2} relaxed divided>
    <div className={styles.description}>
      <Grid.Column>
        <div className={styles.section}>
          Simple Game Description
        </div>
      </Grid.Column>
      <Grid.Column>
        <div className={styles.section}>
          <Link to='/create'>
            <Button primary>Create Game Room</Button>
          </Link>
        </div>
      </Grid.Column>
    </div>
  </Grid>
</Container>;

export default HomePage;
