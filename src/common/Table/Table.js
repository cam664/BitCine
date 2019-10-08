import React from 'react';
import TableRow from './TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './TableStyles';

const Table = ({ data, columns, isLoading, onMore }) => {
  return (
    <section css={css`${styles.tableMainWrap}`}>
      <div css={css`${styles.tableHeadWrap}`}>
        <table>
          <thead>
            <tr>
              {columns.map(col => 
                <th style={{width: col.width}}>{col.label}</th>
              )}
            </tr>
          </thead>
        </table>
      </div>
      
      <div css={css`${styles.tableBodyWrap}`}>
        <table>
          <tbody>
            {data.map((rowData, i) =>
              <TableRow key={i} rowData={rowData} columns={columns} />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

Table.serverFetch = () => { return { type: 'test'} }

export default Table;