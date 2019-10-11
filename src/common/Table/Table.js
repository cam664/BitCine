import React, { useRef } from 'react';
import TableRow from './TableRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './TableStyles';
import { TableLoadingRows } from './TableLoadingRows';

const Table = ({ data, columns, isLoading, onMore }) => {
  const scrollWrapRef = useRef();

  const handleScroll = (e) => {
    const scrollPos = e.currentTarget.scrollTop;
    const scrollEnd = (scrollWrapRef.current.scrollHeight - scrollWrapRef.current.clientHeight);
    if (scrollPos >= scrollEnd) {
      onMore();
    }
  }

  return (
    <section css={css`${styles.tableMainWrap}`}>
      <table>
        <thead>
          <tr>
            {columns.map(col => 
              <th key={col.label} style={{width: col.width}}><div>{col.label}</div></th>
            )}
          </tr>
        </thead>
      </table>
      
      <div onScroll={handleScroll} ref={scrollWrapRef} css={css`${styles.tableBodyWrap}`}>
        <table>
          <tbody>
            {data.map((rowData, i) => 
              <TableRow key={i} isClickable={rowData.model ? false : true} rowData={rowData} columns={columns} />
            )}
            {isLoading && 
              <>
                <TableLoadingRows columns={columns} numOfRows={3} />
              </>
            }
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Table;