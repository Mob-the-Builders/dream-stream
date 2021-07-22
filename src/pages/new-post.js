import React, { useState, useEffect } from "react"
import axios from 'axios';
import { navigate } from 'gatsby';
import Menubar from '../components/Menubar';
import './new-post.scss';

// Remove filename after upload
// How to break multiple tags (Tag parser)
// upload fetchimage/cloudinary to heroku ----> future
const NewPost = () => {
  if (!localStorage.getItem('user')) navigate('/login');

  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [image, setImage] = useState({
    url: null,
    signature: null,
  });

  const newPost = {};

  const onSubmit = (e) => {
    e.preventDefault();
    fetchImage(); 
  };

  const tagParser = () => {
    const multipleSpacesRegex = /\s\s+/g;
    tags.replace(multipleSpacesRegex, ' ');
    return tags.split(' ', 3);
  }

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
      serverCall();
    };
  }, [image]);

  const serverCall = async () => {
  await axios.post("/api/create-post", {
      "userName": localStorage.getItem('user'),
      "image": image.url,
      "imageDelete": image.signature,
      "description": description,
      "tags": tagParser(),
    },
    { 
      headers: { 
      "Content-Type": "application/json"
      } 
    });
    cleanup();
  }

  const cleanup = () => {
    setImage({
      url: null,
      signature: null,
    })
    setDescription('');
    setTags('');
    navigate('/');
  }

  return (
    <>
      <Menubar />
      <main className={'main'}>
        <form onSubmit={onSubmit}>
          <section className={'newpost-card'}>
            <div className={'description-area'}>
              <input
                type="text" id="Name"
                placeholder='Add a description...'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div><span >🐤</span>{localStorage.getItem('user')}</div>
            </div>
            <div className={'image-area'}>

              <div class="file-input">
                <input
                  required type='file' onChange={e=>setUploadImage(e.target.files[0])}
                  name="file-input"
                  id="file-input"
                  className="file-input__input"
                />
                <label class="file-input__label" for="file-input">

                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"/><path d="m8 11-3 4h11l-4-6-3 4z"/><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"/></svg>
                  <span className={'uploadLabel'}>Upload Image</span></label>
              </div>
            </div>

            <div className={'tag-area'}>
              <input required  type="text" id="Name" placeholder='Select streams...'
                value={tags}
                onChange={e => setTags(e.target.value)} />
              <input type='submit' value='Post'/>
            </div>
          </section>
        </form>


      </main>
    </>
  )
}

export default NewPost
