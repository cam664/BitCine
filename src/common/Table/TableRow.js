import React from 'react';

const TableRow = ({ rowData, columns }) => {
  return (
    <tr>
      {columns.map(col =>
        <td style={{width: col.width}}>
          {rowData[col.field]}
        </td>  
      )}
    </tr>
  );
}

export default TableRow;