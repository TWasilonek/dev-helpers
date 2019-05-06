import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import TopNav from './components/TopNav';
import Text from './components/Text';

const InlineStyle = () => (
  <style>{`
    .ui.container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `}
  </style>
)

const Routes = () => (
  <div>
    <InlineStyle />

    <Container>
      <TopNav />
      <Switch>
        <Route exact path="/" component={Text} />
      </Switch>
    </Container>      
  </div>
);

export default Routes;
