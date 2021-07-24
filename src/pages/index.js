import * as React from "react";
import Menubar from '../components/Menubar';
import Content from '../content/Content';
import './index.scss';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../state/app';
// markup
const IndexPage = ({isDarkMode, dispatch}) => {

  return (
    <div className='top-container'>
      <Menubar page={'home'}/>
      <Content />
      <button style={isDarkMode ? {background: 'black', color:'white'} : null}
      onClick={() => dispatch(toggleDarkMode(!isDarkMode))}> Dark mode {isDarkMode ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default connect(state => ({
  isDarkMode: state.app.isDarkMode
  }), null)(IndexPage);
