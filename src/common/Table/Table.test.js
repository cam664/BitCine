import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Table from './Table';
import { BrowserRouter as Router  } from 'react-router-dom';

const columns = [
  {
    label: 'Column 1',
    field: 'model',
    width: '40%'
  },
  {
    label: 'Column 2',
    field: 'name',
    width: '20%'
  }
];
const data = [
  {
    model: 'Data Placeholder',
    name: 'Data Placeholder'
  },
  {
    model: 'Data Placeholder',
    name: 'Data Placeholder'
  }
]

describe('Table', () => {
  it('renders a snapshot', () => {
    const component = renderer.create(
      <Router>
        <Table columns={columns} data={data} />
      </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('header columns', () => {
    it('should render a table header cell for each column', () => {
      const component = mount(
        <Router>
          <Table columns={columns} data={data} />
        </Router>
      )

      expect(
        component.find('th')
      ).toHaveLength(columns.length)
    })

    it('should use the label property as a title', () => {
      const columns = [
        {
          label: 'Column Label',
          field: 'model'
        }
      ]
      const data = [
        {
          model: 'First row',
        },
        {
          model: 'Second row',
        }
      ]
      const component = mount(
        <Router>
          <Table columns={columns} data={data} />
        </Router>
      )
  
      const cell = component.find('th')
  
      expect(cell.text()).toEqual('Column Label')
    })
  });

  it('should update the table when data is added', () => {
    const columns = [
      {
        label: 'Column Label',
        field: 'model'
      }
    ]
    const data = [
      {
        model: 'First row',
      },
      {
        model: 'Second row',
      }
    ]

    const component = mount(
      React.createElement(
        props => (
          <Router>
            <Table {...props} />
          </Router>
        ),
        { columns, data }
      )
    )

    const cellsText = component
      .find('tbody td')
      .map(element => element.text())

    const dataText = data.map(item => item.model)

    expect(cellsText).toEqual(dataText)

    data.push({
      model: 'Third row'
    })

    component.setProps({ data })

    const updatedCellsText = component
      .find('tbody td')
      .map(element => element.text())

    const updatedDataText = data.map(item => item.model)

    expect(updatedCellsText).toEqual(updatedDataText)
  })

});

