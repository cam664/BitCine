import React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './HeaderStyles';

import starWarsLogo from '../../assets/img/logo-star-wars.png';

const Header = () => {
  return (
    <header css={css`${styles.header}`}>
      <img src={starWarsLogo} />
    </header>
  );
}

export default Header;

