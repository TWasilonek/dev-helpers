import React, { SFC, Fragment } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const InlineStyle = () => (
  <style>{`
    .ui.horizontal.list.top-nav {
      margin-top: 30px;
      margin-bottom: 50px;
    }
  `}
  </style>
)

const TopNav: SFC = () => {
  return (
    <Fragment>
      <InlineStyle />

      <List horizontal relaxed className="top-nav">
        <List.Item active>
          <Link to="/">Text</Link>
        </List.Item>
        <List.Item>
          <Link to="/translations">Translations</Link>
        </List.Item>
      </List>
    </Fragment>
  )
};

export default TopNav;

