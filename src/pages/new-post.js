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
    <div className='top-container'>
      <Menubar />
      <main className={'main'}>
        <form onSubmit={onSubmit}>
          <section className={'newpost-card'}>
            <div className={'description-area'}>
              <input
                type="text" id="Name"
                placeholder='Add a description...'
                value={description}
                autocomplete='off'
                onChange={e => setDescription(e.target.value)}
              />
              <div><span >🐤</span>{localStorage.getItem('user')}</div>
            </div>

            <div className={'image-area'}>
              <div className={'file-input-wrapper'}>
                <div class="file-input">
                  <input
                    required type='file' onChange={e=>setUploadImage(e.target.files[0])}
                    name="file-input"
                    id="file-input"
                    className="file-input__input"
                  />
                  <label class="file-input__label" for="file-input">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"/><path d="m8 11-3 4h11l-4-6-3 4z"/><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"/></svg>
                    <span className={'uploadLabel'}>Upload Image</span> */}
                    {/* <svg width="500" height="146" viewBox="0 0 266 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M121.667 8.33333H143.333V20H146.667V8.33333C146.667 6.495 145.172 5 143.333 5H121.667C119.828 5 118.333 6.495 118.333 8.33333V28.3333C118.333 30.1717 119.828 31.6667 121.667 31.6667H135V28.3333H121.667V8.33333Z" fill="#28628C" fill-opacity="0.85"/>
                      <path d="M128.333 18.3333L123.333 25H141.667L135 15L130 21.6667L128.333 18.3333Z" fill="#59AFED"/>
                      <path d="M146.667 23.3333H143.333V28.3333H138.333V31.6667H143.333V36.6667H146.667V31.6667H151.667V28.3333H146.667V23.3333Z" fill="#59AFED"/>
                      <path d="M81.1559 53.3022H83.2038V60.1177C83.2038 60.5109 83.2202 60.9096 83.2529 61.3137C83.2966 61.7178 83.4058 62.0837 83.5806 62.4114C83.7663 62.7282 84.0393 62.9903 84.3998 63.1978C84.7711 63.4053 85.2899 63.5091 85.9562 63.5091C86.6225 63.5091 87.1358 63.4053 87.4962 63.1978C87.8676 62.9903 88.1407 62.7282 88.3154 62.4114C88.5011 62.0837 88.6103 61.7178 88.6431 61.3137C88.6868 60.9096 88.7086 60.5109 88.7086 60.1177V53.3022H90.7566V60.7895C90.7566 61.5431 90.6419 62.1984 90.4125 62.7555C90.1831 63.3125 89.8555 63.7822 89.4295 64.1644C89.0144 64.5358 88.512 64.8143 87.9222 65C87.3324 65.1857 86.6771 65.2785 85.9562 65.2785C85.2353 65.2785 84.58 65.1857 83.9902 65C83.4004 64.8143 82.8925 64.5358 82.4665 64.1644C82.0515 63.7822 81.7293 63.3125 81.4999 62.7555C81.2705 62.1984 81.1559 61.5431 81.1559 60.7895V53.3022ZM92.8975 56.5298H94.6669V57.6766H94.6997C94.9619 57.1851 95.3277 56.8356 95.7974 56.6281C96.2671 56.4096 96.775 56.3004 97.3211 56.3004C97.9873 56.3004 98.5662 56.4205 99.0577 56.6608C99.5601 56.8902 99.9752 57.2124 100.303 57.6274C100.631 58.0316 100.876 58.5067 101.04 59.0528C101.204 59.5989 101.286 60.1833 101.286 60.8058C101.286 61.3738 101.209 61.9254 101.056 62.4606C100.915 62.9958 100.691 63.4709 100.385 63.8859C100.09 64.2901 99.7131 64.6177 99.2543 64.8689C98.7956 65.1092 98.2549 65.2294 97.6324 65.2294C97.3593 65.2294 97.0862 65.2021 96.8132 65.1475C96.5401 65.1038 96.278 65.0273 96.0268 64.9181C95.7756 64.8089 95.5407 64.6723 95.3223 64.5085C95.1148 64.3337 94.94 64.1317 94.798 63.9023H94.7652V68.1292H92.8975V56.5298ZM99.4181 60.7731C99.4181 60.3908 99.369 60.0194 99.2707 59.659C99.1724 59.2986 99.0249 58.9818 98.8283 58.7088C98.6317 58.4248 98.386 58.2009 98.0911 58.037C97.7962 57.8623 97.4576 57.7749 97.0753 57.7749C96.2889 57.7749 95.6936 58.048 95.2895 58.5941C94.8963 59.1402 94.6997 59.8665 94.6997 60.7731C94.6997 61.199 94.7489 61.5977 94.8472 61.9691C94.9564 62.3295 95.1148 62.6408 95.3223 62.9029C95.5298 63.1651 95.7756 63.3726 96.0595 63.5255C96.3544 63.6784 96.693 63.7549 97.0753 63.7549C97.5013 63.7549 97.8617 63.6675 98.1566 63.4927C98.4515 63.318 98.6918 63.0941 98.8775 62.821C99.0741 62.537 99.2106 62.2203 99.2871 61.8708C99.3745 61.5103 99.4181 61.1444 99.4181 60.7731ZM102.913 53.3022H104.781V65H102.913V53.3022ZM110.699 65.2294C110.022 65.2294 109.415 65.1201 108.88 64.9017C108.356 64.6723 107.908 64.361 107.537 63.9678C107.176 63.5746 106.898 63.105 106.701 62.5589C106.516 62.0128 106.423 61.412 106.423 60.7567C106.423 60.1123 106.516 59.517 106.701 58.9709C106.898 58.4248 107.176 57.9551 107.537 57.5619C107.908 57.1687 108.356 56.8629 108.88 56.6444C109.415 56.4151 110.022 56.3004 110.699 56.3004C111.376 56.3004 111.977 56.4151 112.501 56.6444C113.036 56.8629 113.484 57.1687 113.844 57.5619C114.216 57.9551 114.494 58.4248 114.68 58.9709C114.877 59.517 114.975 60.1123 114.975 60.7567C114.975 61.412 114.877 62.0128 114.68 62.5589C114.494 63.105 114.216 63.5746 113.844 63.9678C113.484 64.361 113.036 64.6723 112.501 64.9017C111.977 65.1201 111.376 65.2294 110.699 65.2294ZM110.699 63.7549C111.114 63.7549 111.474 63.6675 111.78 63.4927C112.086 63.318 112.337 63.0886 112.534 62.8046C112.73 62.5206 112.872 62.2039 112.96 61.8544C113.058 61.4939 113.107 61.128 113.107 60.7567C113.107 60.3963 113.058 60.0358 112.96 59.6754C112.872 59.3149 112.73 58.9982 112.534 58.7251C112.337 58.4412 112.086 58.2118 111.78 58.037C111.474 57.8623 111.114 57.7749 110.699 57.7749C110.284 57.7749 109.923 57.8623 109.617 58.037C109.312 58.2118 109.06 58.4412 108.864 58.7251C108.667 58.9982 108.52 59.3149 108.422 59.6754C108.334 60.0358 108.29 60.3963 108.29 60.7567C108.29 61.128 108.334 61.4939 108.422 61.8544C108.52 62.2039 108.667 62.5206 108.864 62.8046C109.06 63.0886 109.312 63.318 109.617 63.4927C109.923 63.6675 110.284 63.7549 110.699 63.7549ZM123.622 63.1159C123.622 63.3453 123.649 63.5091 123.704 63.6074C123.769 63.7057 123.889 63.7549 124.064 63.7549C124.119 63.7549 124.184 63.7549 124.261 63.7549C124.337 63.7549 124.424 63.7439 124.523 63.7221V65.0164C124.457 65.0382 124.37 65.0601 124.261 65.0819C124.162 65.1147 124.059 65.142 123.949 65.1638C123.84 65.1857 123.731 65.2021 123.622 65.213C123.512 65.2239 123.42 65.2294 123.343 65.2294C122.961 65.2294 122.644 65.1529 122.393 65C122.142 64.8471 121.978 64.5795 121.901 64.1972C121.53 64.5576 121.071 64.8198 120.525 64.9836C119.99 65.1475 119.471 65.2294 118.969 65.2294C118.586 65.2294 118.221 65.1748 117.871 65.0655C117.522 64.9672 117.21 64.8198 116.937 64.6232C116.675 64.4157 116.462 64.159 116.298 63.8532C116.145 63.5364 116.069 63.1705 116.069 62.7555C116.069 62.2312 116.162 61.8052 116.347 61.4776C116.544 61.1499 116.795 60.8932 117.101 60.7075C117.418 60.5219 117.767 60.3908 118.15 60.3143C118.543 60.227 118.936 60.1614 119.329 60.1177C119.668 60.0522 119.99 60.0085 120.296 59.9867C120.602 59.9539 120.869 59.9047 121.099 59.8392C121.339 59.7737 121.525 59.6754 121.656 59.5443C121.798 59.4023 121.869 59.1948 121.869 58.9217C121.869 58.6814 121.809 58.4848 121.688 58.3319C121.579 58.179 121.437 58.0643 121.262 57.9879C121.099 57.9005 120.913 57.8459 120.705 57.824C120.498 57.7913 120.301 57.7749 120.116 57.7749C119.591 57.7749 119.16 57.8841 118.821 58.1026C118.483 58.321 118.292 58.6596 118.248 59.1183H116.38C116.413 58.5722 116.544 58.119 116.773 57.7585C117.003 57.3981 117.292 57.1086 117.642 56.8902C118.002 56.6717 118.406 56.5188 118.854 56.4315C119.302 56.3441 119.761 56.3004 120.23 56.3004C120.645 56.3004 121.055 56.3441 121.459 56.4315C121.863 56.5188 122.224 56.6608 122.54 56.8574C122.868 57.054 123.13 57.3107 123.327 57.6274C123.523 57.9333 123.622 58.3101 123.622 58.7579V63.1159ZM121.754 60.7567C121.47 60.9424 121.12 61.057 120.705 61.1007C120.29 61.1335 119.875 61.1881 119.46 61.2646C119.264 61.2973 119.072 61.3465 118.887 61.412C118.701 61.4666 118.537 61.5486 118.395 61.6578C118.253 61.7561 118.139 61.8926 118.051 62.0674C117.975 62.2312 117.937 62.4333 117.937 62.6736C117.937 62.8811 117.997 63.0558 118.117 63.1978C118.237 63.3398 118.379 63.4545 118.543 63.5419C118.718 63.6183 118.903 63.6729 119.1 63.7057C119.307 63.7385 119.493 63.7549 119.657 63.7549C119.864 63.7549 120.088 63.7276 120.329 63.6729C120.569 63.6183 120.793 63.5255 121 63.3944C121.219 63.2634 121.399 63.0995 121.541 62.9029C121.683 62.6954 121.754 62.4442 121.754 62.1493V60.7567ZM133.61 65H131.841V63.8532H131.808C131.557 64.3447 131.191 64.6996 130.71 64.9181C130.23 65.1256 129.722 65.2294 129.187 65.2294C128.52 65.2294 127.936 65.1147 127.433 64.8853C126.942 64.645 126.532 64.3228 126.205 63.9187C125.877 63.5146 125.631 63.0394 125.467 62.4933C125.304 61.9363 125.222 61.341 125.222 60.7075C125.222 59.943 125.325 59.2822 125.533 58.7251C125.741 58.1681 126.014 57.7094 126.352 57.3489C126.702 56.9885 127.095 56.7264 127.532 56.5625C127.98 56.3878 128.433 56.3004 128.892 56.3004C129.154 56.3004 129.421 56.3277 129.694 56.3823C129.967 56.426 130.23 56.5025 130.481 56.6117C130.732 56.7209 130.961 56.8629 131.169 57.0376C131.387 57.2015 131.568 57.3981 131.71 57.6274H131.742V53.3022H133.61V65ZM127.089 60.855C127.089 61.2154 127.133 61.5704 127.22 61.9199C127.319 62.2694 127.461 62.5807 127.646 62.8538C127.843 63.1268 128.089 63.3453 128.384 63.5091C128.679 63.6729 129.028 63.7549 129.432 63.7549C129.847 63.7549 130.202 63.6675 130.497 63.4927C130.803 63.318 131.049 63.0886 131.234 62.8046C131.431 62.5206 131.573 62.2039 131.66 61.8544C131.759 61.4939 131.808 61.128 131.808 60.7567C131.808 59.8174 131.595 59.0856 131.169 58.5613C130.754 58.037 130.186 57.7749 129.465 57.7749C129.028 57.7749 128.657 57.8677 128.351 58.0534C128.056 58.2282 127.81 58.463 127.614 58.7579C127.428 59.0419 127.291 59.3696 127.204 59.7409C127.128 60.1013 127.089 60.4727 127.089 60.855ZM140.469 53.3022H142.517V65H140.469V53.3022ZM144.767 56.5298H146.536V57.7094H146.585C146.727 57.5018 146.88 57.3107 147.044 57.1359C147.208 56.9612 147.388 56.8137 147.585 56.6936C147.792 56.5734 148.027 56.4806 148.289 56.4151C148.551 56.3386 148.852 56.3004 149.19 56.3004C149.704 56.3004 150.179 56.4151 150.616 56.6444C151.063 56.8738 151.38 57.2288 151.566 57.7094C151.883 57.2725 152.248 56.9284 152.663 56.6772C153.079 56.426 153.597 56.3004 154.22 56.3004C155.116 56.3004 155.809 56.5188 156.301 56.9557C156.803 57.3926 157.054 58.1244 157.054 59.1511V65H155.187V60.0522C155.187 59.7136 155.176 59.4078 155.154 59.1347C155.132 58.8507 155.066 58.6105 154.957 58.4139C154.859 58.2063 154.706 58.048 154.498 57.9387C154.291 57.8295 154.007 57.7749 153.646 57.7749C153.013 57.7749 152.554 57.9715 152.27 58.3647C151.986 58.7579 151.844 59.3149 151.844 60.0358V65H149.977V59.5607C149.977 58.9709 149.867 58.5285 149.649 58.2336C149.441 57.9278 149.054 57.7749 148.486 57.7749C148.245 57.7749 148.011 57.824 147.781 57.9223C147.563 58.0207 147.366 58.1626 147.191 58.3483C147.028 58.534 146.891 58.7634 146.782 59.0364C146.684 59.3095 146.634 59.6208 146.634 59.9703V65H144.767V56.5298ZM166.116 63.1159C166.116 63.3453 166.144 63.5091 166.198 63.6074C166.264 63.7057 166.384 63.7549 166.559 63.7549C166.613 63.7549 166.679 63.7549 166.755 63.7549C166.832 63.7549 166.919 63.7439 167.017 63.7221V65.0164C166.952 65.0382 166.864 65.0601 166.755 65.0819C166.657 65.1147 166.553 65.142 166.444 65.1638C166.335 65.1857 166.225 65.2021 166.116 65.213C166.007 65.2239 165.914 65.2294 165.838 65.2294C165.455 65.2294 165.139 65.1529 164.887 65C164.636 64.8471 164.472 64.5795 164.396 64.1972C164.025 64.5576 163.566 64.8198 163.02 64.9836C162.485 65.1475 161.966 65.2294 161.463 65.2294C161.081 65.2294 160.715 65.1748 160.366 65.0655C160.016 64.9672 159.705 64.8198 159.432 64.6232C159.17 64.4157 158.957 64.159 158.793 63.8532C158.64 63.5364 158.563 63.1705 158.563 62.7555C158.563 62.2312 158.656 61.8052 158.842 61.4776C159.039 61.1499 159.29 60.8932 159.596 60.7075C159.912 60.5219 160.262 60.3908 160.644 60.3143C161.037 60.227 161.431 60.1614 161.824 60.1177C162.162 60.0522 162.485 60.0085 162.79 59.9867C163.096 59.9539 163.364 59.9047 163.593 59.8392C163.833 59.7737 164.019 59.6754 164.15 59.5443C164.292 59.4023 164.363 59.1948 164.363 58.9217C164.363 58.6814 164.303 58.4848 164.183 58.3319C164.074 58.179 163.932 58.0643 163.757 57.9879C163.593 57.9005 163.407 57.8459 163.2 57.824C162.992 57.7913 162.796 57.7749 162.61 57.7749C162.086 57.7749 161.654 57.8841 161.316 58.1026C160.977 58.321 160.786 58.6596 160.742 59.1183H158.875C158.907 58.5722 159.039 58.119 159.268 57.7585C159.497 57.3981 159.787 57.1086 160.136 56.8902C160.497 56.6717 160.901 56.5188 161.349 56.4315C161.796 56.3441 162.255 56.3004 162.725 56.3004C163.14 56.3004 163.549 56.3441 163.954 56.4315C164.358 56.5188 164.718 56.6608 165.035 56.8574C165.363 57.054 165.625 57.3107 165.821 57.6274C166.018 57.9333 166.116 58.3101 166.116 58.7579V63.1159ZM164.248 60.7567C163.965 60.9424 163.615 61.057 163.2 61.1007C162.785 61.1335 162.37 61.1881 161.955 61.2646C161.758 61.2973 161.567 61.3465 161.381 61.412C161.196 61.4666 161.032 61.5486 160.89 61.6578C160.748 61.7561 160.633 61.8926 160.546 62.0674C160.469 62.2312 160.431 62.4333 160.431 62.6736C160.431 62.8811 160.491 63.0558 160.611 63.1978C160.732 63.3398 160.873 63.4545 161.037 63.5419C161.212 63.6183 161.398 63.6729 161.594 63.7057C161.802 63.7385 161.988 63.7549 162.151 63.7549C162.359 63.7549 162.583 63.7276 162.823 63.6729C163.063 63.6183 163.287 63.5255 163.495 63.3944C163.713 63.2634 163.894 63.0995 164.035 62.9029C164.177 62.6954 164.248 62.4442 164.248 62.1493V60.7567ZM175.957 64.5576C175.957 65.8356 175.597 66.7858 174.876 67.4084C174.166 68.0419 173.139 68.3586 171.796 68.3586C171.37 68.3586 170.938 68.3149 170.501 68.2275C170.075 68.1402 169.682 67.9927 169.322 67.7852C168.972 67.5777 168.677 67.3046 168.437 66.966C168.197 66.6274 168.055 66.2124 168.011 65.7209H169.879C169.934 65.983 170.026 66.196 170.157 66.3598C170.288 66.5237 170.441 66.6493 170.616 66.7366C170.802 66.8349 171.004 66.895 171.222 66.9169C171.441 66.9496 171.67 66.966 171.91 66.966C172.664 66.966 173.216 66.7803 173.565 66.409C173.915 66.0376 174.089 65.5024 174.089 64.8034V63.5091H174.057C173.795 63.9788 173.434 64.3447 172.975 64.6068C172.528 64.8689 172.042 65 171.517 65C170.84 65 170.261 64.8853 169.781 64.6559C169.311 64.4157 168.918 64.0934 168.601 63.6893C168.295 63.2743 168.071 62.7992 167.929 62.264C167.787 61.7288 167.716 61.1554 167.716 60.5437C167.716 59.9757 167.804 59.4351 167.978 58.9217C168.153 58.4084 168.404 57.9606 168.732 57.5783C169.06 57.1851 169.458 56.8738 169.928 56.6444C170.409 56.4151 170.949 56.3004 171.55 56.3004C172.085 56.3004 172.577 56.4151 173.025 56.6444C173.472 56.8629 173.816 57.2124 174.057 57.693H174.089V56.5298H175.957V64.5576ZM171.812 63.5255C172.227 63.5255 172.577 63.4436 172.861 63.2797C173.156 63.105 173.39 62.8811 173.565 62.608C173.751 62.324 173.882 62.0073 173.958 61.6578C174.046 61.2973 174.089 60.9369 174.089 60.5765C174.089 60.216 174.046 59.8665 173.958 59.5279C173.871 59.1893 173.734 58.889 173.549 58.6268C173.374 58.3647 173.139 58.1572 172.844 58.0043C172.56 57.8514 172.216 57.7749 171.812 57.7749C171.397 57.7749 171.048 57.8623 170.764 58.037C170.48 58.2118 170.25 58.4412 170.075 58.7251C169.901 58.9982 169.775 59.3149 169.699 59.6754C169.622 60.0249 169.584 60.3744 169.584 60.7239C169.584 61.0734 169.628 61.4175 169.715 61.7561C169.802 62.0837 169.934 62.3786 170.108 62.6408C170.294 62.9029 170.523 63.1159 170.796 63.2797C171.08 63.4436 171.419 63.5255 171.812 63.5255ZM183.654 60.0194C183.632 59.7245 183.566 59.4405 183.457 59.1675C183.359 58.8944 183.217 58.6596 183.031 58.463C182.856 58.2555 182.638 58.0916 182.376 57.9715C182.125 57.8404 181.841 57.7749 181.524 57.7749C181.196 57.7749 180.896 57.835 180.623 57.9551C180.361 58.0643 180.131 58.2227 179.935 58.4302C179.749 58.6268 179.596 58.8617 179.476 59.1347C179.367 59.4078 179.307 59.7027 179.296 60.0194H183.654ZM179.296 61.2482C179.296 61.5759 179.339 61.8926 179.427 62.1984C179.525 62.5043 179.667 62.7719 179.853 63.0012C180.038 63.2306 180.273 63.4163 180.557 63.5583C180.841 63.6893 181.18 63.7549 181.573 63.7549C182.119 63.7549 182.556 63.6402 182.884 63.4108C183.222 63.1705 183.473 62.8155 183.637 62.3459H185.407C185.308 62.8046 185.139 63.2142 184.899 63.5746C184.659 63.9351 184.369 64.2409 184.03 64.4921C183.692 64.7324 183.31 64.9126 182.884 65.0328C182.469 65.1638 182.032 65.2294 181.573 65.2294C180.907 65.2294 180.317 65.1201 179.804 64.9017C179.29 64.6833 178.853 64.3774 178.493 63.9842C178.143 63.591 177.876 63.1214 177.69 62.5752C177.515 62.0291 177.428 61.4284 177.428 60.7731C177.428 60.1723 177.521 59.6044 177.706 59.0692C177.903 58.5231 178.176 58.048 178.526 57.6438C178.886 57.2288 179.318 56.9011 179.82 56.6608C180.322 56.4205 180.89 56.3004 181.524 56.3004C182.19 56.3004 182.785 56.4424 183.31 56.7264C183.845 56.9994 184.287 57.3653 184.637 57.824C184.986 58.2828 185.237 58.8125 185.39 59.4132C185.554 60.003 185.598 60.6147 185.521 61.2482H179.296Z" fill="#28628C" fill-opacity="0.83"/>
                    </svg> */}
                  </label>
                </div>
              </div>
            </div>

            <div className={'tag-area'}>
              <input required  type="text" id="Name" placeholder='Select streams...'
                value={tags}
                autocomplete='off'
                onChange={e => setTags(e.target.value)} />
              <input type='submit' value='Post'/>
            </div>
          </section>
        </form>


      </main>
    </div>
  )
}

export default NewPost
