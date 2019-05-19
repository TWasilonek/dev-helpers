import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import TopNav from './components/TopNav';
import Text from './components/Text';
import Translations from './components/Translations';

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
        <Route exact path="/translations" component={Translations} />
      </Switch>
    </Container>      
  </div>
);

export default Routes;
