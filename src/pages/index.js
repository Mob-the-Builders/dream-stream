import * as React from "react";
import Menubar from '../components/Menubar';
import Content from '../content/Content';
import './index.scss';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../state/app';
// markup
const IndexPage = ({dark, dispatch, store}) => {
  console.log('doing', store)
  return (
    <div className='top-container'>
      <Menubar page={'home'}/>
      <Content />
      {/* <button style={dark ? {background: 'black', color:'white'} : null}
      onClick={() => dispatch(toggleDarkMode(!dark))}> Dark mode {dark ? 'on' : 'off'}
      </button> */}
    </div>
  )
}

// export default connect(state => ({
//   dark: state.app.dark
//   }), null)(IndexPage);
export default IndexPage;
