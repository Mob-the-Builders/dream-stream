import React from "react"
import { useSelector, useDispatch } from 'react-redux';

const TagButton = ({ tag, buttonText }) => {
  const { tags } = useSelector(state => state.postList);
  const dispatch = useDispatch();
  let selected = false;

  if(buttonText == tag) {
    selected = true;
  }

  const onClick = (tag) => {
    if (tag === tags[0]){
      dispatch({
        type:  'POSTS_GET_TAG', payload: []
      })
    } else {
      dispatch({
        type:  'POSTS_GET_TAG', payload: [tag]
      })
    }
  }

  return (
    <button onClick={() => onClick(buttonText)} className={`tagbutton ${selected ? 'tagbutton--selected' : ''}`}>{buttonText}</button>
  )
}

export default TagButton;