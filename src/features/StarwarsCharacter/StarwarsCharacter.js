import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from '../../common/Spinner';

import { fetchPerson } from './StarwarsCharacterRedux';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './StarwarsCharacterStyles';

const StarwarsCharacter = (props) => {
  const dispatch = useDispatch();

  const characterData = useSelector(state => state.StarwarsCharacter);
  useEffect(() => {
    const characterID = props.location.pathname.split('/').pop();
    dispatch(fetchPerson(characterID));
  }, []);

  return (
    <>
      {characterData.status !== 'success' 
      ? (
        <Spinner />
      ) : (
        <article>
          <h1>{characterData.data.name}</h1>
          <dl css={css`${styles.dl}`}>
            <dt>Birth Year</dt>
            <dd>{characterData.data.birth_year}</dd>
            <dt>Eye Color</dt>
            <dd>{characterData.data.eye_color}</dd>
            <dt>Gender</dt>
            <dd>{characterData.data.gender}</dd>
            <dt>Hair Colour</dt>
            <dd>{characterData.data.hair_color}</dd>
            <dt>Mass</dt>
            <dd>{characterData.data.mass}</dd>
            <dt>Skin Colour</dt>
            <dd>{characterData.data.skin_color}</dd>
          </dl>
        </article>
      )}
    </>
  );
}

export default withRouter(StarwarsCharacter);