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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post('http://localhost:8000/api/blog/createblog', blogData); // Adjust the endpoint according to your backend setup
      console.log(responce); 
      toast.success(responce.data.message)
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form  className="space-y-4">
        <input type="number" name="id" placeholder="ID" value={blogData.id} onChange={handleChange} required className="input" />
        <input type="text" name="heading" placeholder="Heading" value={blogData.heading} onChange={handleChange} required className="input" />
        <input type="text" name="p" placeholder="P" value={blogData.p} onChange={handleChange} required className="input" />
        <input type="text" name="text" placeholder="Text" value={blogData.text} onChange={handleChange} required className="input" />
        <input type="text" name="italic" placeholder="Italic" value={blogData.italic} onChange={handleChange} required className="input" />
        <input type="text" name="imageUrl" placeholder="Image URL" value={blogData.imageUrl} onChange={handleChange} required className="input" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isImageRight" checked={blogData.isImageRight} onChange={() => setBlogData({ ...blogData, isImageRight: !blogData.isImageRight })} />
          <span>Image is on the right</span>
        </label>
        <input type="text" name="img" placeholder="IMG" value={blogData.img} onChange={handleChange} className="input" />
        <input type="text" name="name" placeholder="Name" value={blogData.name} onChange={handleChange} className="input" />
        <input type="text" name="post" placeholder="Post" value={blogData.post} onChange={handleChange} className="input" />
        <input type="text" name="createdBy" placeholder="Created By" value={blogData.createdBy} onChange={handleChange} required className="input" />
        <button type="button" onClick={handleSubmit} className="btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
