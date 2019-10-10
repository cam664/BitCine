export default {
  tableMainWrap: `
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        width: 100%;
      }
      th, td {
        div, a {
          padding: 15px 7.5px;
        }
      }
      tr td, tr th {
        &:first-of-type div,
        &:first-of-type a {
          padding-left: 15px;
        }
        &:last-of-type div,
        &:last-of-type a {
          padding-right: 15px;
        }
      }
      th {
        text-align: left;
      }
    }
  `,
  tableBodyWrap: `
    max-height: 450px;
    overflow: hidden scroll;
    tr {
      background: #fff;
      border-bottom: 1px solid #f2f3f3;
    }
  `,
  rowPlaceholder: `
    display: inline-block;
    width: 25%;
    height: 100%;
    border-radius: 6px;
    min-width: 30px;
    background-image: linear-gradient(to top, #f2f3f3, #f6f6f6);
  `,
  isClickable: `
    a {
      display: block;
      text-decoration: none;
      color: #000;
    }
    &:hover {
      cursor: pointer;
      background-color: rgba(187,221,255,0.3);
    }
  `
}