import React from 'react';
import TableRow from './TableRow';

const Table = ({ data, columns, isLoading, onMore }) => {

  return (
    <table>
      <thead>
        {columns.map(col => 
          <td>{col.label}</td>
        )}
      </thead>
      <tbody>
        {data.map(rowData =>
          <TableRow rowData={rowData} columns={columns} />
        )}
      </tbody>
    </table>
  );
}

export default Table;