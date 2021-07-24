import React from "react"
import Menubar from '../components/Menubar';
import { navigate } from '@reach/router';


const Profile = () => {
  
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if(!user){
    navigate('/login');
  }
  return (
    <div className='top-container'>
      <Menubar page={'profile'}/>
      <main className={'main'}>

        <p>this is the profile page</p>

      </main>
    </div>
  )
}

export default Profile;
