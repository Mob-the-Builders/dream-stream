import React from "react"
import Menubar from '../components/Menubar';


const Profile = () => {
  

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
