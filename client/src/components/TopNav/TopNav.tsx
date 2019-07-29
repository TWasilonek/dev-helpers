import React, { SFC } from 'react';
import { List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import styles from './TopNav.module.css';

const links = [
  {
    href: '/',
    text: 'Text',
    exact: true
  },
  {
    href: '/translations',
    text: 'Translations'
  }
];

const TopNav: SFC = () => {
  return (
    <div className={styles.topNav}>
      <List horizontal relaxed>
        {links.map(({ href, text, ...otherProps }) => (
          <List.Item key={text}>
            <NavLink
              to={href}
              className={styles.link}
              activeClassName={styles.active}
              {...otherProps}
            >
              {text}
            </NavLink>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default TopNav;
