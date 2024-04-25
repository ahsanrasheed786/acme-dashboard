
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateNewBlog = () => {
  const [blogData, setBlogData] = useState({
    id: '',
    heading: '',
    p: '',
    text: '',
    italic: '',
    imageUrl: '',
    isImageRight: false,
    img: '',
    name: '',
    post: '',
    detail: [],
    createdBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleDetailChange = (e, index, key) => {
    const updatedDetail = [...blogData.detail];
    updatedDetail[index][key] = e.target.value;
    setBlogData(prevData => ({
      ...prevData,
      detail: updatedDetail
    }));
  };

  const addDetail = () => {
    setBlogData(prevData => ({
      ...prevData,
      detail: [...prevData.detail, { heading: '', text: '' }]
    }));
  };

  const removeDetail = (index) => {
    const updatedDetail = [...blogData.detail];
    updatedDetail.splice(index, 1);
    setBlogData(prevData => ({
      ...prevData,
      detail: updatedDetail
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/blog/createblog', blogData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.response.data.message);
    }
  };



  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold my-8">Create New Case Study</h2>
      <label htmlFor="heading" className="block mb-2">Heading:</label>
      <input type="text" id="heading" name="heading" placeholder="Heading" value={blogData.heading} onChange={handleChange} required className="input" />

      {/* Other input fields... */}
      <label htmlFor="p" className="block mb-2">P:</label>
  <input type="text" id="p" name="p" placeholder="P" value={blogData.p} onChange={handleChange} required className="input" />

  <label htmlFor="text" className="block mb-2">Text:</label>
  <input type="text" id="text" name="text" placeholder="Text" value={blogData.text} onChange={handleChange} required className="input" />

  <label htmlFor="italic" className="block mb-2">Italic:</label>
  <input type="text" id="italic" name="italic" placeholder="Italic" value={blogData.italic} onChange={handleChange} required className="input" />

  <label htmlFor="imageUrl" className="block mb-2">Image URL:</label>
  <input type="text" id="imageUrl" name="imageUrl" placeholder="Image URL" value={blogData.imageUrl} onChange={handleChange} required className="input" />

  
   <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
        id="isImageRight" name="isImageRight"
          type="checkbox"
          className="hidden"
          checked={blogData.isImageRight}
          onChange={() => setBlogData({ ...blogData, isImageRight: !blogData.isImageRight })} 
        />
        <div className={`toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner ${blogData.isImageRight ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${blogData.isImageRight ? 'translate-x-full bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{blogData.isImageRight? 'ON' : 'OFF'}</div>
             </label>

  <label htmlFor="img" className="block mb-2">IMG:</label>
  <input type="text" id="img" name="img" placeholder="IMG" value={blogData.img} onChange={handleChange} className="input" />

  <label htmlFor="name" className="block mb-2">Name:</label>
  <input type="text" id="name" name="name" placeholder="Name" value={blogData.name} onChange={handleChange} className="input" />

  <label htmlFor="post" className="block mb-2">Post:</label>
  <input type="text" id="post" name="post" placeholder="Post" value={blogData.post} onChange={handleChange} className="input" />

      {/* Detail section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Details:</h3>
        {blogData.detail.map((detail, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={detail.heading}
              onChange={(e) => handleDetailChange(e, index, 'heading')}
              placeholder="Heading"
              className="input"
            />
            <input
              type="text"
              value={detail.text}
              onChange={(e) => handleDetailChange(e, index, 'text')}
              placeholder="Text"
              className="input"
            />
            <button type="button" onClick={() => removeDetail(index)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addDetail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Detail</button>
      </div>

      <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
    </div>
  );
};

export default CreateNewBlog;

