import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../common/Table';
import Spinner from '../../common/Spinner';

import { fetchList, fetchListNext } from './StarwarsListRedux';

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

// should be in a theme provider
const centerElem = `            
  position:fixed; 
  top:50%; 
  left:50%; 
  transform:translate(-50%,-50%);
`;

let canFetchFlag = true;

const StarwarsList = () => {
  const dispatch = useDispatch();

  const [initialLoad, setInitialLoad] = useState(true);
  const listData = useSelector(state => state.StarwarsList);
  useEffect(() => { 
    async function fetchData() {
      if (listData.list.status !== 'success') {
        await dispatch(fetchList());
        setInitialLoad(() => false);
      }
    }
    fetchData();
  }, [])
  
  const [listIsLoading, setListLoading] = useState(false);
  const onMore = async () => {
    if (canFetchFlag) {
      canFetchFlag = false;
      setListLoading(() => true);

      await dispatch(fetchListNext())

      if (listData.list.next) {
        canFetchFlag = true;
      }
      setListLoading(() => false);
    }
  }

  return (
    <>
      {(listData.list.status !== 'success' && initialLoad) 
      ? (
        <Spinner />
      ) : (
        <Table columns={columns} data={listData.list.data} onMore={onMore} isLoading={listIsLoading} />
      )}
    </>
  );
}

StarwarsList.serverFetch = fetchList;

export default StarwarsList;