import React, { useState } from "react"
import YourStreams from './YourStreams';
import PostList from './Postlist';
import axios from 'axios';

const Content = () => {
  const [name, setName] = useState('Kalle');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageSignature, setImageSignature] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  const fetchImage = async () => {
    console.log("upload handler");
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', "qxmdpdn1");
    const data = await axios.post("https://api.cloudinary.com/v1_1/dx50vyks7/image/upload", formData)
    setImageURL(data.data.secure_url);
    setImageSignature(data.data.signature);
  }
    // USE USEEFFECT !!!!!!!!!
    // test 2
      const onSubmit = e => {
        e.preventDefault();
        if (!tags) {
          alert('PleaseTag');
          return;
        }
        fetchImage();
        console.log(name)
        console.log(description)
        console.log(tags)
        console.log(imageURL)
        console.log(imageSignature)
    
        setDescription('');
        setTags('');
        
      };

  return (
      <>
      <form onSubmit={onSubmit}>

        <label>Name</label>
        <input type="text" id="Name"
          placeholder='Kalle'
          value={name}
          onChange={e => setName(e.target.value)} />

        <label>Description</label>
        <input  type="text" id="Name"
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)} />

        <label>Tags</label>
        <input required  type="text" id="Name"
          placeholder='tag'
          value={tags}
          onChange={e => setTags(e.target.value)} />
        <input required type='file' onChange={e=>setImage(e.target.files[0])} />
        <input type='submit' value='Create'/>
      </form>
      
      <PostList />
      </>
  )
}

        // // <label className="card--subtitle">Receiver</label>
        // <input className='card__input--sendName' type="text" id="title"
        // placeholder='Receiver'
        // value={receiver}
        // onChange={e => setReceiver(e.target.value)}></input>

export default Content