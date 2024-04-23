import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blog/getallblogs');
        setBlogs(response.data);
      } catch (error) {
        setError(error.response.data.message || 'An error occurred while fetching blogs.');
      }
    };

    fetchBlogs();
  }, []);

  const handleInputChange = (value, key, index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index][key] = value;
    setBlogs(updatedBlogs);
  };

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/blog/updateblog/${id}`, updatedBlog);
      console.log(response)
      if (response.data.success) {
        console.log('Blog updated successfully');
      } else {
        setError(response.data.message || 'Failed to update blog');
      }
    } catch (error) {
      setError('An error occurred while updating the blog');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Blogs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {blogs.map((blog, index) => (
          <li key={blog._id} className="mb-4">
            <input
              type="text"
              value={blog.heading}
              onChange={(e) => handleInputChange(e.target.value, 'heading', index)}
              className="w-full bg-gray-100 p-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <br />
            <input
              type="text"
              value={blog.p}
              onChange={(e) => handleInputChange(e.target.value, 'p', index)}
              className="w-full bg-gray-100 p-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <br />
            <input
              type="text"
              value={blog.name}
              onChange={(e) => handleInputChange(e.target.value, 'name', index)}
              className="w-full bg-gray-100 p-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <br />
            <button
              onClick={() => handleUpdate(blog._id, blogs[index])}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;