import React from "react"
import Menubar from '../components/Menubar';
import { navigate } from 'gatsby';


const Streams = () => {
  
  if (!localStorage.getItem('user')) navigate('/login');


  return (
    <div className='top-container'>
      <Menubar page={'streams'}/>
      <main className={'main'}>

        <p>this is the streams page</p>

      </main>
    </div>
  )
}

export default Streams;
