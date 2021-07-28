import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring' // Using hooks in V9

const Popup = ({delay}) => {
    
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setVisible(true);
      }, delay);
    }, [delay]);

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: { duration: 1000}  })
  return (
    visible ?    
    <animated.div style={props}>    
    <div>
      <div style={c1style}>
        <h1>
          <p>Something in here</p>
        </h1>
      </div>
    </div>
    </animated.div>
    :
    <></>
  )
}

const c1style = {
  background: 'steelblue',
  color: 'white',
  padding: '1.5rem',
  position:'absolute'
}

export default Popup;
