import React from 'react';
import { Link } from 'react-router-dom';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './TableStyles';

const TableRow = ({ rowData, columns, arePlaceholders, isClickable }) => {

  const renderRowOptions = () => {
    if (isClickable) {
      let urlSplit = rowData.url.split('/');
      const characterID = urlSplit[urlSplit.length - 2];
      return (
        <tr css={css`${styles.isClickable}`}>
          {columns.map(col =>
            <td style={{width: col.width}}>
              <Link to={`/character/${characterID}`}>
                {rowData[col.field]}
              </Link>
            </td>
          )}
        </tr>
      );
    } else if (arePlaceholders) {
      return (
        <tr>
          {columns.map(col =>
            <td style={{width: col.width}}>
              <div><span css={css`${styles.rowPlaceholder}`}>&nbsp;</span></div>
            </td>
          )}
        </tr>
      );
    } else {
      return (
        <tr>
          {columns.map(col =>
            <td style={{width: col.width}}>
              <div>{rowData[col.field]}</div>
            </td>
          )}
        </tr>
      );
    }
  }
  
  return renderRowOptions();
}

export default TableRow;




