import  { useState, useEffect } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom';
const AllBlogs = () => {
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
  return (
    <div>
    <h1 className="text-4xl font-bold mb-4">Blogs</h1>
    <ul>
      {blogs.map((blog,) => (
        <Link to={`/detailblog/${blog._id}`} key={blog._id}>
        <li key={blog._id} className="mb-4">
         {blog.heading}
         <br />
        {blog.p}
          <br />
         {blog.name}
          <br />
        </li>
        </Link>

      ))}
    </ul>
  </div>
  
  )
}

export default AllBlogs
