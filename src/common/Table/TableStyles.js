export default {
  tableMainWrap: `
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        width: 100%;
      }
      th, td {
        padding: 15px 7.5px;
        &:first-child {
          padding-left: 15px;
        }
        &:last-child {
          padding-right: 15px;
        }
      }
      th {
        text-align: left;
      }
    }
  `,
  tableHeadWrap: `
    position: relative;
  `,
  tableBodyWrap: `
    max-height: 450px;
    overflow: hidden scroll;
    tr {
      background: #fff;
      border-bottom: 1px solid #f2f3f3;
    }
  `,

}