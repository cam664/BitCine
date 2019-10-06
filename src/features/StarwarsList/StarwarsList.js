import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../common/Table';
import { fetchPeople } from './';

const columns = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Birth Year',
    field: 'birth_year'
  },
  {
    label: 'Height',
    field: 'height'
  },
  {
    label: 'Mass',
    field: 'mass'
  },
]

const StarwarsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch])
  const peopleData = useSelector(state => state.StarwarsList);
  
  return (
    <Table columns={columns} data={peopleData.data} />
  );
}

export default StarwarsList;