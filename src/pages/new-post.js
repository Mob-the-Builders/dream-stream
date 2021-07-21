import React, { useState, useEffect } from "react"
import axios from 'axios';
import Menubar from '../components/Menubar';
import './new-post.scss';

// Remove filename after upload
// How to break multiple tags (Tag parser)
// upload fetchimage/cloudinary to heroku ----> future
const NewPost = () => {
  const [name, setName] = useState('Kalle');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [image, setImage] = useState({
    url: null,
    signature: null,
  });
  
  const fetchImage = async () => {
    const formData = new FormData();
    formData.append('file', uploadImage);
    formData.append('upload_preset', "qxmdpdn1");
    const data = await axios.post("https://api.cloudinary.com/v1_1/dx50vyks7/image/upload", formData)
    setImage({
      url: data.data.secure_url,
      signature: data.data.signature
    })
  }

  useEffect(() => {
    if (image.url && image.signature) {
      serverCall()
    };
  }, [image]);

  const resetValues = () => {
    setDescription('');
    setTags('');
    setImage({
      url: null,
      signature: null,
    })
  }

  const serverCall = async () => {
  const response = await axios.post("/api/create-post", {
      "userName": name,
      "image": image.url,
      "imageDelete": image.signature,
      "description": description,
      "tags": [tags],
    },
    { 
      headers: { 
      "Content-Type": "application/json"
      } 
    });
    
    resetValues();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!tags) {
      alert('PleaseTag');
      return;
    }
   fetchImage(); 
  };

  return (
      <>
      <Menubar />
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
        <input required type='file' onChange={e=>setUploadImage(e.target.files[0])} />
        <input type='submit' value='Create'/>
      </form>
      
      </>
  )
}

export default NewPost
