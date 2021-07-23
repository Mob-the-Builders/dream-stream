import React from "react"

const TagButton = ({ tag, buttonText, setTag}) => {

  let selected = false;

  if(buttonText == tag) {
    selected = true;
  }


  return (
    <button onClick={() => setTag(buttonText)} className={`tagbutton ${selected ? 'tagbutton--selected' : ''}`}>{buttonText}</button>
  )
}

export default TagButton;