import { Link } from 'react-router-dom';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './HeaderStyles';

import starWarsLogo from '../../assets/img/logo-star-wars.png';

const Header = () => {
  return (
    <header css={css`${styles.header}`}>
      <Link to='/'>
        <img src={starWarsLogo} />
      </Link>
    </header>
  );
}

export default Header;

