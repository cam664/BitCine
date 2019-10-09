import React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './TableStyles';

const TableRow = ({ rowData, columns, arePlaceholders }) => {
  return (
    <tr>
      {columns.map(col =>
        <td style={{width: col.width}}>
          {arePlaceholders  
            ? <span css={css`${styles.rowPlaceholder}`}>&nbsp;</span> 
            : rowData[col.field]
          }
        </td>  
      )}
    </tr>
  );
}

export default TableRow;