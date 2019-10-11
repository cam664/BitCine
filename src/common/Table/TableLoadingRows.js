import React from 'react';
import TableRow from './TableRow';

export const TableLoadingRows = ({ columns, numOfRows }) => {
  
  return (
    <>
      {Array(numOfRows).fill(
        <TableRow arePlaceholders columns={columns} />
      )}
    </>
  );
}