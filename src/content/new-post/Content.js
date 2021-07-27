import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';

import axios from 'axios';
import './new-post.scss';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const [tagsState, setTags] = useState('');
  const [descriptionState, setDescription] = useState('');
  const [uploadedImageState, setUploadImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, updateLoading] = useState(false);

  const setImage = async (imageFile) => {
    setUploadImage(imageFile);

    setImagePreview(URL.createObjectURL(imageFile));
  };

  // Uploads post data to database
  const uploadPost = async (image, description, tags) => {
    await axios.post('/api/create-post', {
      userName: user,
      image: image.url,
      imageDelete: image.signature,
      description,
      tags,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Uploads image to cloudinary
  const uploadCloudinary = async (imageTemp) => {
    const formData = new FormData();
    formData.append('file', imageTemp);
    formData.append('upload_preset', 'qxmdpdn1');
    const data = await axios.post('https://api.cloudinary.com/v1_1/dx50vyks7/image/upload', formData);
    return {
      url: data.data.secure_url,
      signature: data.data.signature,
    };
  };

  // Helper functions
  const tagParser = (tags) => {
    const regex = /\w+/g;
    const tagsArray = tags.match(regex); // array with words without spaces

    if (tagsArray.length >= 3) {
      return [tagsArray[0], tagsArray[1], tagsArray[2]];
    }

    return tagsArray;
  };

  const clearStates = () => {
    setUploadImage('');
    setDescription('');
    setTags('');
  };

  // Handle submitting new post
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      const tagsParsed = tagParser(tagsState);
      const description = descriptionState;
      const uploadedImage = uploadedImageState;
      clearStates();
      updateLoading(true);

      const image = await uploadCloudinary(uploadedImage);
      await uploadPost(image, description, tagsParsed);

      navigate('/');
    }
  };

  return (
    <main className="main">

      {isLoading
        ? <section className="loading">Loading...</section>
        : (
          <form onSubmit={onSubmit}>
            <section className="newpost-card">

              <div className="description-area">
                <input
                  type="text"
                  id="Name"
                  placeholder="Add a description..."
                  value={descriptionState}
                  autoComplete="off"
                  onChange={(e) => { setDescription(e.target.value); }}
                  onFocus={(e) => { e.target.placeholder = ''; }}
                  onBlur={(e) => { e.target.placeholder = 'Add a description...'; }}
                />
                <div className="newpost_user">
                  <div className="newpost_user__pic">🐤</div>
                  {user}
                </div>
              </div>

              <div className="image-area">

                <img className={`imagePreview ${imagePreview ? '' : 'imagePreview--hide'}`} src={imagePreview} alt="Preview" />

                <div className={`file-input-wrapper ${imagePreview ? 'file-input-wrapper--hide' : ''}`}>
                  <div className="file-input">
                    <input
                      required
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      name="file-input"
                      id="file-input"
                      className="file-input__input"
                    />
                    <label className="file-input__label" htmlFor="file-input">
                      <svg width="134" height="88" viewBox="0 0 134 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M54.906 9.40171H79.3504V22.5641H83.1111V9.40171C83.1111 7.32769 81.4244 5.64102 79.3504 5.64102H54.906C52.832 5.64102 51.1453 7.32769 51.1453 9.40171V31.9658C51.1453 34.0398 52.832 35.7265 54.906 35.7265H69.9487V31.9658H54.906V9.40171Z" fill="#28628C" fillOpacity="0.85" />
                        <path d="M62.4274 20.6838L56.7863 28.2051H77.4701L69.9487 16.9231L64.3077 24.4444L62.4274 20.6838Z" fill="#59AFED" />
                        <path d="M83.1111 26.3248H79.3504V31.9658H73.7094V35.7265H79.3504V41.3675H83.1111V35.7265H88.7521V31.9658H83.1111V26.3248Z" fill="#59AFED" />
                        <path d="M8.07327 59.9307H10.3838V67.62C10.3838 68.0636 10.4022 68.5134 10.4392 68.9693C10.4885 69.4253 10.6117 69.8381 10.8089 70.2077C11.0184 70.5651 11.3264 70.8608 11.7331 71.095C12.152 71.3291 12.7374 71.4462 13.4891 71.4462C14.2407 71.4462 14.8199 71.3291 15.2265 71.095C15.6455 70.8608 15.9536 70.5651 16.1507 70.2077C16.3602 69.8381 16.4834 69.4253 16.5204 68.9693C16.5697 68.5134 16.5943 68.0636 16.5943 67.62V59.9307H18.9048V68.3778C18.9048 69.2281 18.7754 69.9675 18.5167 70.5959C18.2579 71.2244 17.8882 71.7542 17.4076 72.1855C16.9394 72.6045 16.3725 72.9187 15.7071 73.1282C15.0417 73.3377 14.3023 73.4424 13.4891 73.4424C12.6758 73.4424 11.9364 73.3377 11.271 73.1282C10.6056 72.9187 10.0326 72.6045 9.55198 72.1855C9.08372 71.7542 8.72021 71.2244 8.46143 70.5959C8.20266 69.9675 8.07327 69.2281 8.07327 68.3778V59.9307ZM21.3203 63.572H23.3166V64.8659H23.3535C23.6493 64.3114 24.0621 63.9171 24.5919 63.6829C25.1218 63.4365 25.6948 63.3133 26.311 63.3133C27.0626 63.3133 27.7157 63.4488 28.2702 63.7199C28.8371 63.9787 29.3053 64.3422 29.675 64.8105C30.0447 65.2664 30.322 65.8024 30.5068 66.4186C30.6916 67.0347 30.7841 67.6939 30.7841 68.3963C30.7841 69.0371 30.6978 69.6594 30.5253 70.2632C30.3651 70.867 30.1125 71.403 29.7674 71.8713C29.4347 72.3272 29.0096 72.6969 28.4921 72.9803C27.9745 73.2514 27.3645 73.387 26.6621 73.387C26.3541 73.387 26.046 73.3562 25.738 73.2946C25.4299 73.2453 25.1341 73.159 24.8507 73.0358C24.5673 72.9126 24.3024 72.7585 24.0559 72.5737C23.8218 72.3765 23.6246 72.1486 23.4644 71.8898H23.4275V76.6586H21.3203V63.572ZM28.6769 68.3594C28.6769 67.9281 28.6214 67.5091 28.5105 67.1025C28.3996 66.6958 28.2333 66.3385 28.0115 66.0304C27.7897 65.71 27.5124 65.4574 27.1797 65.2725C26.847 65.0754 26.465 64.9768 26.0337 64.9768C25.1465 64.9768 24.4749 65.2849 24.0189 65.901C23.5753 66.5171 23.3535 67.3366 23.3535 68.3594C23.3535 68.8399 23.409 69.2897 23.5199 69.7087C23.6431 70.1153 23.8218 70.4665 24.0559 70.7623C24.29 71.058 24.5673 71.2921 24.8877 71.4647C25.2204 71.6372 25.6024 71.7234 26.0337 71.7234C26.5143 71.7234 26.9209 71.6248 27.2536 71.4277C27.5863 71.2305 27.8574 70.9779 28.0669 70.6698C28.2887 70.3495 28.4428 69.9921 28.529 69.5978C28.6276 69.1911 28.6769 68.7783 28.6769 68.3594ZM32.62 59.9307H34.7272V73.1282H32.62V59.9307ZM41.4038 73.387C40.6398 73.387 39.9559 73.2638 39.3521 73.0173C38.7606 72.7585 38.2553 72.4073 37.8364 71.9637C37.4297 71.5201 37.1155 70.9902 36.8937 70.3741C36.6842 69.758 36.5795 69.0802 36.5795 68.3409C36.5795 67.6138 36.6842 66.9423 36.8937 66.3261C37.1155 65.71 37.4297 65.1801 37.8364 64.7365C38.2553 64.2929 38.7606 63.9479 39.3521 63.7014C39.9559 63.4426 40.6398 63.3133 41.4038 63.3133C42.1678 63.3133 42.8455 63.4426 43.437 63.7014C44.0408 63.9479 44.546 64.2929 44.9527 64.7365C45.3716 65.1801 45.6859 65.71 45.8954 66.3261C46.1172 66.9423 46.2281 67.6138 46.2281 68.3409C46.2281 69.0802 46.1172 69.758 45.8954 70.3741C45.6859 70.9902 45.3716 71.5201 44.9527 71.9637C44.546 72.4073 44.0408 72.7585 43.437 73.0173C42.8455 73.2638 42.1678 73.387 41.4038 73.387ZM41.4038 71.7234C41.872 71.7234 42.2787 71.6248 42.6237 71.4277C42.9687 71.2305 43.2522 70.9718 43.474 70.6514C43.6958 70.331 43.856 69.9736 43.9545 69.5793C44.0655 69.1727 44.1209 68.7598 44.1209 68.3409C44.1209 67.9342 44.0655 67.5276 43.9545 67.1209C43.856 66.7143 43.6958 66.3569 43.474 66.0489C43.2522 65.7285 42.9687 65.4697 42.6237 65.2725C42.2787 65.0754 41.872 64.9768 41.4038 64.9768C40.9355 64.9768 40.5289 65.0754 40.1838 65.2725C39.8388 65.4697 39.5554 65.7285 39.3336 66.0489C39.1118 66.3569 38.9454 66.7143 38.8345 67.1209C38.7359 67.5276 38.6866 67.9342 38.6866 68.3409C38.6866 68.7598 38.7359 69.1727 38.8345 69.5793C38.9454 69.9736 39.1118 70.331 39.3336 70.6514C39.5554 70.9718 39.8388 71.2305 40.1838 71.4277C40.5289 71.6248 40.9355 71.7234 41.4038 71.7234ZM55.9834 71.0026C55.9834 71.2613 56.0142 71.4462 56.0758 71.5571C56.1497 71.668 56.2853 71.7234 56.4824 71.7234C56.5441 71.7234 56.618 71.7234 56.7042 71.7234C56.7905 71.7234 56.8891 71.7111 57 71.6865V73.1467C56.9261 73.1713 56.8275 73.196 56.7042 73.2206C56.5933 73.2576 56.4763 73.2884 56.3531 73.313C56.2298 73.3377 56.1066 73.3562 55.9834 73.3685C55.8601 73.3808 55.7554 73.387 55.6691 73.387C55.2379 73.387 54.8805 73.3007 54.5971 73.1282C54.3137 72.9557 54.1288 72.6538 54.0426 72.2225C53.6236 72.6291 53.106 72.9249 52.4899 73.1097C51.8861 73.2946 51.3008 73.387 50.7339 73.387C50.3027 73.387 49.8899 73.3254 49.4955 73.2021C49.1012 73.0912 48.75 72.9249 48.4419 72.7031C48.1462 72.4689 47.9059 72.1794 47.7211 71.8343C47.5486 71.477 47.4623 71.0642 47.4623 70.5959C47.4623 70.0044 47.567 69.5238 47.7765 69.1542C47.9983 68.7845 48.2818 68.4949 48.6268 68.2854C48.9841 68.0759 49.3785 67.9281 49.8098 67.8418C50.2534 67.7432 50.697 67.6693 51.1406 67.62C51.5226 67.5461 51.8861 67.4968 52.2311 67.4721C52.5762 67.4352 52.8781 67.3797 53.1369 67.3058C53.408 67.2318 53.6174 67.1209 53.7653 66.9731C53.9255 66.8129 54.0056 66.5787 54.0056 66.2707C54.0056 65.9996 53.9378 65.7778 53.8023 65.6053C53.679 65.4327 53.5189 65.3034 53.3217 65.2171C53.1369 65.1185 52.9274 65.0569 52.6932 65.0323C52.4591 64.9953 52.2373 64.9768 52.0278 64.9768C51.4363 64.9768 50.9496 65.1 50.5676 65.3465C50.1856 65.5929 49.9699 65.9749 49.9207 66.4925H47.8135C47.8505 65.8764 47.9983 65.365 48.2571 64.9583C48.5159 64.5517 48.8424 64.2251 49.2368 63.9787C49.6434 63.7322 50.0993 63.5597 50.6046 63.4611C51.1098 63.3625 51.6273 63.3133 52.1572 63.3133C52.6255 63.3133 53.0876 63.3625 53.5435 63.4611C53.9994 63.5597 54.4061 63.7199 54.7634 63.9417C55.1331 64.1635 55.4289 64.4531 55.6507 64.8105C55.8725 65.1555 55.9834 65.5806 55.9834 66.0858V71.0026ZM53.8762 68.3409C53.5558 68.5504 53.1615 68.6797 52.6932 68.729C52.225 68.766 51.7567 68.8276 51.2885 68.9139C51.0667 68.9508 50.851 69.0063 50.6415 69.0802C50.432 69.1418 50.2472 69.2343 50.087 69.3575C49.9268 69.4684 49.7974 69.6224 49.6989 69.8196C49.6126 70.0044 49.5695 70.2324 49.5695 70.5035C49.5695 70.7376 49.6372 70.9348 49.7728 71.095C49.9083 71.2552 50.0685 71.3846 50.2534 71.4831C50.4505 71.5694 50.66 71.631 50.8818 71.668C51.1159 71.7049 51.3254 71.7234 51.5103 71.7234C51.7444 71.7234 51.997 71.6926 52.2681 71.631C52.5392 71.5694 52.7918 71.4647 53.026 71.3168C53.2724 71.1689 53.4757 70.9841 53.6359 70.7623C53.7961 70.5281 53.8762 70.2447 53.8762 69.912V68.3409ZM67.2523 73.1282H65.2561V71.8343H65.2191C64.9357 72.3888 64.5229 72.7893 63.9807 73.0358C63.4385 73.2699 62.8655 73.387 62.2617 73.387C61.51 73.387 60.8508 73.2576 60.2839 72.9988C59.7294 72.7277 59.2673 72.3642 58.8976 71.9083C58.5279 71.4523 58.2507 70.9163 58.0658 70.3002C57.881 69.6717 57.7886 69.0001 57.7886 68.2854C57.7886 67.4228 57.9057 66.6773 58.1398 66.0489C58.3739 65.4204 58.682 64.9029 59.064 64.4962C59.4583 64.0896 59.9019 63.7938 60.3948 63.609C60.9 63.4118 61.4114 63.3133 61.929 63.3133C62.2247 63.3133 62.5266 63.3441 62.8347 63.4057C63.1428 63.455 63.4385 63.5412 63.7219 63.6645C64.0053 63.7877 64.2641 63.9479 64.4982 64.145C64.7447 64.3299 64.948 64.5517 65.1082 64.8105H65.1452V59.9307H67.2523V73.1282ZM59.8958 68.4518C59.8958 68.8584 59.945 69.2589 60.0436 69.6532C60.1545 70.0476 60.3147 70.3987 60.5242 70.7068C60.746 71.0149 61.0233 71.2613 61.356 71.4462C61.6887 71.631 62.083 71.7234 62.5389 71.7234C63.0072 71.7234 63.4077 71.6248 63.7404 71.4277C64.0854 71.2305 64.3627 70.9718 64.5722 70.6514C64.794 70.331 64.9542 69.9736 65.0528 69.5793C65.1637 69.1727 65.2191 68.7598 65.2191 68.3409C65.2191 67.2811 64.9788 66.4555 64.4982 65.864C64.03 65.2725 63.3892 64.9768 62.5759 64.9768C62.083 64.9768 61.664 65.0815 61.319 65.291C60.9863 65.4882 60.709 65.7531 60.4872 66.0858C60.2778 66.4062 60.1237 66.7759 60.0251 67.1949C59.9389 67.6015 59.8958 68.0205 59.8958 68.4518ZM74.9906 59.9307H77.3011V73.1282H74.9906V59.9307ZM79.8393 63.572H81.8355V64.9029H81.891C82.0512 64.6687 82.2237 64.4531 82.4086 64.2559C82.5934 64.0588 82.7967 63.8924 83.0185 63.7569C83.2526 63.6213 83.5176 63.5166 83.8133 63.4426C84.1091 63.3564 84.4479 63.3133 84.8299 63.3133C85.4091 63.3133 85.9451 63.4426 86.438 63.7014C86.9433 63.9602 87.3006 64.3607 87.5101 64.9029C87.8675 64.41 88.2803 64.0218 88.7485 63.7384C89.2168 63.455 89.8021 63.3133 90.5045 63.3133C91.5149 63.3133 92.2974 63.5597 92.852 64.0526C93.4188 64.5455 93.7022 65.3711 93.7022 66.5295V73.1282H91.595V67.5461C91.595 67.1641 91.5827 66.819 91.5581 66.511C91.5334 66.1906 91.4595 65.9195 91.3363 65.6977C91.2254 65.4635 91.0529 65.2849 90.8187 65.1616C90.5846 65.0384 90.2642 64.9768 89.8576 64.9768C89.1428 64.9768 88.6253 65.1986 88.3049 65.6422C87.9845 66.0858 87.8243 66.7143 87.8243 67.5276V73.1282H85.7172V66.9916C85.7172 66.3261 85.5939 65.8271 85.3475 65.4944C85.1134 65.1493 84.6759 64.9768 84.0351 64.9768C83.764 64.9768 83.4991 65.0323 83.2403 65.1432C82.9939 65.2541 82.7721 65.4143 82.5749 65.6237C82.3901 65.8332 82.236 66.092 82.1128 66.4001C82.0019 66.7081 81.9465 67.0593 81.9465 67.4536V73.1282H79.8393V63.572ZM103.926 71.0026C103.926 71.2613 103.957 71.4462 104.018 71.5571C104.092 71.668 104.228 71.7234 104.425 71.7234C104.487 71.7234 104.561 71.7234 104.647 71.7234C104.733 71.7234 104.832 71.7111 104.943 71.6865V73.1467C104.869 73.1713 104.77 73.196 104.647 73.2206C104.536 73.2576 104.419 73.2884 104.296 73.313C104.172 73.3377 104.049 73.3562 103.926 73.3685C103.803 73.3808 103.698 73.387 103.612 73.387C103.18 73.387 102.823 73.3007 102.54 73.1282C102.256 72.9557 102.071 72.6538 101.985 72.2225C101.566 72.6291 101.049 72.9249 100.433 73.1097C99.8287 73.2946 99.2434 73.387 98.6765 73.387C98.2453 73.387 97.8325 73.3254 97.4381 73.2021C97.0438 73.0912 96.6926 72.9249 96.3845 72.7031C96.0888 72.4689 95.8485 72.1794 95.6637 71.8343C95.4912 71.477 95.4049 71.0642 95.4049 70.5959C95.4049 70.0044 95.5096 69.5238 95.7191 69.1542C95.9409 68.7845 96.2244 68.4949 96.5694 68.2854C96.9267 68.0759 97.3211 67.9281 97.7524 67.8418C98.196 67.7432 98.6396 67.6693 99.0832 67.62C99.4652 67.5461 99.8287 67.4968 100.174 67.4721C100.519 67.4352 100.821 67.3797 101.079 67.3058C101.351 67.2318 101.56 67.1209 101.708 66.9731C101.868 66.8129 101.948 66.5787 101.948 66.2707C101.948 65.9996 101.88 65.7778 101.745 65.6053C101.622 65.4327 101.461 65.3034 101.264 65.2171C101.079 65.1185 100.87 65.0569 100.636 65.0323C100.402 64.9953 100.18 64.9768 99.9704 64.9768C99.3789 64.9768 98.8922 65.1 98.5102 65.3465C98.1282 65.5929 97.9125 65.9749 97.8633 66.4925H95.7561C95.7931 65.8764 95.9409 65.365 96.1997 64.9583C96.4585 64.5517 96.785 64.2251 97.1794 63.9787C97.586 63.7322 98.0419 63.5597 98.5472 63.4611C99.0524 63.3625 99.5699 63.3133 100.1 63.3133C100.568 63.3133 101.03 63.3625 101.486 63.4611C101.942 63.5597 102.349 63.7199 102.706 63.9417C103.076 64.1635 103.371 64.4531 103.593 64.8105C103.815 65.1555 103.926 65.5806 103.926 66.0858V71.0026ZM101.819 68.3409C101.498 68.5504 101.104 68.6797 100.636 68.729C100.168 68.766 99.6993 68.8276 99.2311 68.9139C99.0093 68.9508 98.7936 69.0063 98.5841 69.0802C98.3746 69.1418 98.1898 69.2343 98.0296 69.3575C97.8694 69.4684 97.74 69.6224 97.6415 69.8196C97.5552 70.0044 97.5121 70.2324 97.5121 70.5035C97.5121 70.7376 97.5798 70.9348 97.7154 71.095C97.8509 71.2552 98.0111 71.3846 98.196 71.4831C98.3931 71.5694 98.6026 71.631 98.8244 71.668C99.0585 71.7049 99.268 71.7234 99.4529 71.7234C99.687 71.7234 99.9396 71.6926 100.211 71.631C100.482 71.5694 100.734 71.4647 100.969 71.3168C101.215 71.1689 101.418 70.9841 101.579 70.7623C101.739 70.5281 101.819 70.2447 101.819 69.912V68.3409ZM115.029 72.6291C115.029 74.0709 114.622 75.1429 113.809 75.8453C113.008 76.56 111.849 76.9174 110.334 76.9174C109.853 76.9174 109.366 76.8681 108.873 76.7695C108.393 76.671 107.949 76.5046 107.543 76.2705C107.148 76.0363 106.816 75.7283 106.544 75.3463C106.273 74.9643 106.113 74.496 106.064 73.9415H108.171C108.233 74.2372 108.337 74.4775 108.485 74.6624C108.633 74.8472 108.806 74.9889 109.003 75.0875C109.212 75.1984 109.44 75.2662 109.687 75.2908C109.933 75.3278 110.192 75.3463 110.463 75.3463C111.313 75.3463 111.936 75.1368 112.33 74.7178C112.724 74.2989 112.921 73.695 112.921 72.9064V71.4462H112.884C112.589 71.976 112.182 72.3888 111.665 72.6846C111.159 72.9803 110.611 73.1282 110.019 73.1282C109.255 73.1282 108.602 72.9988 108.06 72.74C107.53 72.4689 107.087 72.1054 106.729 71.6495C106.384 71.1812 106.132 70.6452 105.971 70.0414C105.811 69.4376 105.731 68.7907 105.731 68.1006C105.731 67.4598 105.83 66.8498 106.027 66.2707C106.224 65.6915 106.508 65.1863 106.877 64.755C107.247 64.3114 107.697 63.9602 108.227 63.7014C108.769 63.4426 109.379 63.3133 110.056 63.3133C110.66 63.3133 111.215 63.4426 111.72 63.7014C112.225 63.9479 112.613 64.3422 112.884 64.8844H112.921V63.572H115.029V72.6291ZM110.352 71.4647C110.82 71.4647 111.215 71.3722 111.535 71.1874C111.868 70.9902 112.133 70.7376 112.33 70.4296C112.539 70.1092 112.687 69.7518 112.774 69.3575C112.872 68.9508 112.921 68.5442 112.921 68.1376C112.921 67.7309 112.872 67.3366 112.774 66.9546C112.675 66.5726 112.521 66.2337 112.311 65.938C112.114 65.6422 111.849 65.4081 111.517 65.2356C111.196 65.0631 110.808 64.9768 110.352 64.9768C109.884 64.9768 109.49 65.0754 109.169 65.2725C108.849 65.4697 108.59 65.7285 108.393 66.0489C108.196 66.3569 108.054 66.7143 107.968 67.1209C107.881 67.5153 107.838 67.9096 107.838 68.3039C107.838 68.6982 107.888 69.0864 107.986 69.4684C108.085 69.8381 108.233 70.1708 108.43 70.4665C108.639 70.7623 108.898 71.0026 109.206 71.1874C109.527 71.3722 109.909 71.4647 110.352 71.4647ZM123.712 67.5091C123.687 67.1764 123.613 66.856 123.49 66.5479C123.379 66.2399 123.219 65.9749 123.009 65.7531C122.812 65.519 122.566 65.3342 122.27 65.1986C121.987 65.0507 121.666 64.9768 121.309 64.9768C120.939 64.9768 120.6 65.0446 120.292 65.1801C119.997 65.3034 119.738 65.482 119.516 65.7162C119.306 65.938 119.134 66.2029 118.998 66.511C118.875 66.819 118.807 67.1517 118.795 67.5091H123.712ZM118.795 68.8954C118.795 69.2651 118.844 69.6224 118.943 69.9675C119.054 70.3125 119.214 70.6144 119.424 70.8732C119.633 71.1319 119.898 71.3414 120.218 71.5016C120.539 71.6495 120.921 71.7234 121.364 71.7234C121.98 71.7234 122.473 71.594 122.843 71.3353C123.225 71.0642 123.508 70.6637 123.693 70.1338H125.69C125.579 70.6514 125.388 71.1135 125.117 71.5201C124.845 71.9268 124.519 72.2718 124.137 72.5552C123.755 72.8263 123.324 73.0296 122.843 73.1652C122.375 73.313 121.882 73.387 121.364 73.387C120.613 73.387 119.947 73.2638 119.368 73.0173C118.789 72.7708 118.296 72.4258 117.889 71.9822C117.495 71.5386 117.193 71.0087 116.984 70.3926C116.787 69.7765 116.688 69.0987 116.688 68.3594C116.688 67.6816 116.793 67.0408 117.002 66.437C117.224 65.8209 117.532 65.2849 117.926 64.8289C118.333 64.3607 118.82 63.991 119.387 63.7199C119.953 63.4488 120.594 63.3133 121.309 63.3133C122.061 63.3133 122.732 63.4735 123.324 63.7938C123.927 64.1019 124.427 64.5147 124.821 65.0323C125.215 65.5498 125.499 66.1475 125.671 66.8252C125.856 67.4906 125.905 68.1807 125.819 68.8954H118.795Z" fill="#28628C" fillOpacity="0.83" />
                      </svg>
                    </label>
                  </div>
                </div>
              </div>

              <div className="tag-area">
                <input
                  required
                  type="text"
                  id="Name"
                  placeholder="Select streams..."
                  value={tagsState}
                  autoComplete="off"
                  onChange={(e) => { setTags(e.target.value); }}
                  onFocus={(e) => { e.target.placeholder = ''; }}
                  onBlur={(e) => { e.target.placeholder = 'Select streams...'; }}
                />
                <input type="submit" value="Post" />
              </div>
            </section>
          </form>
        )}

    </main>
  );
};

export default Content;
