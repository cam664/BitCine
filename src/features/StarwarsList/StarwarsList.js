import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../common/Table';
import { fetchPeople } from './StarwarsListRedux';

const columns = [
  {
    label: 'Name',
    field: 'name',
    width: '40%'
  },
  {
    label: 'Birth Year',
    field: 'birth_year',
    width: '20%'
  },
  {
    label: 'Height',
    field: 'height',
    width: '20%',
  },
  {
    label: 'Mass',
    field: 'mass',
    width: '20%'
  },
]

const StarwarsList = () => {
  const dispatch = useDispatch();

  const peopleData = useSelector(state => state.StarwarsList);
  useEffect(() => {
    if (peopleData.data.length === 0) {
      dispatch(fetchPeople());
    }
  }, [])
  
  return (
    <Table columns={columns} data={peopleData.data} />
  );
}

StarwarsList.serverFetch = fetchPeople;

export default StarwarsList;