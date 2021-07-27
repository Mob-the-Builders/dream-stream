import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FilterButton = ({ currentStream }) => {
  const { tags } = useSelector((state) => state.postList);
  const dispatch = useDispatch();
  let selected = false;

  if (currentStream === tags[0]) {
    selected = true;
  }

  // Updates current stream filtered by
  const onClick = () => {
    let payload = [currentStream];

    if (currentStream === tags[0]) {
      payload = [];
    }
    dispatch({
      type: 'POSTS_FILTERED_TAG', payload,
    });
  };

  return (
    <button onClick={onClick} className={`tagbutton ${selected ? 'tagbutton--selected' : ''}`}>{currentStream}</button>
  );
};

export default FilterButton;
