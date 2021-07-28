import { useSpring, animated } from 'react-spring' // Using hooks in V9

const Popup = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 1000, config: { duration: 3000}  })
  return (
    <animated.div style={props}>    
          <div>
            <div style={c1style}>
              <h1>
                <p>Something in here</p>
              </h1>
            </div>
          </div>
    </animated.div>

  )
}

const c1style = {
  background: 'steelblue',
  color: 'white',
  padding: '1.5rem'
}

export 
default Popup
