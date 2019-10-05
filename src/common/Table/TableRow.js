import React from 'react';

const TableRow = ({ rowData, columns }) => {
  return (
    <tr>
      {columns.map(col =>
        <td>
          {rowData[col.field]}
        </td>  
      )}
    </tr>
  );
}

export default TableRow;