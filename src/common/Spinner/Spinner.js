import spinner from '../../assets/img/spinner.gif';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './SpinnerStyles';

const Spinner = () => <img css={css`${styles.center}`} src={spinner} />

export default Spinner;