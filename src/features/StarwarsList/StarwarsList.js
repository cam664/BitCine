import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../common/Table';
import { fetchList } from './StarwarsListRedux';

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

  const listData = useSelector(state => state.StarwarsList);
  useEffect(() => {
    if (listData.list.data.length === 0) {
      dispatch(fetchList());
    }
  }, [])
  
  const [isLoading, setLoading] = useState(false);
  const onMore = () => {
    setLoading(() => true);
    // fetch next page here
  }

  return (
    <Table columns={columns} data={listData.list.data} onMore={onMore} isLoading={isLoading} />
  );
}

StarwarsList.serverFetch = fetchList;

export default StarwarsList;