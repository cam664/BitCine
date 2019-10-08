import React from 'react';
import StarwarsList from '../../features/StarwarsList';
import Table from '../../common/Table';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './HomeStyles';

export const Home = () => {
  return (
    <main css={css`${styles.main}`}>
      <StarwarsList />
    </main>
  );
}


