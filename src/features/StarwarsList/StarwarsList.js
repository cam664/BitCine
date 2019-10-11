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

let canFetchFlag = true;

const StarwarsList = () => {
  const dispatch = useDispatch();

  const [isLoadingFromClient, setIsLoadingFromClient] = useState(false);
  const listData = useSelector(state => state.StarwarsList);
  useEffect(() => { 
    async function fetchData() {
      if (listData.list.status !== 'success') {
        setIsLoadingFromClient(() => true);
        await dispatch(fetchList());
        setIsLoadingFromClient(() => false);
      }
    }
    fetchData();
  }, [])
  
  const [listIsLoading, setListLoading] = useState(false);
  const onMore = async () => {
    if (canFetchFlag) {
      canFetchFlag = false;

      if (!listData.list.next) return;

      setListLoading(() => true);
      await dispatch(fetchListNext())
      setListLoading(() => false);
      canFetchFlag = true;
    }
  }

  return (
    <>
      {(listData.list.status !== 'success' && isLoadingFromClient) 
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