import React from "react"

const TagButton = ({ buttonText, setTag}) => {

  return (
    <button onClick={() => setTag(buttonText)}>{buttonText}</button>
  )
}

export default TagButton;