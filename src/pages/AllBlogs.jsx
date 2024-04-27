import  { useState, useEffect } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom';
import { myServerUrl } from '../App';
const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`${myServerUrl}api/blog/getallblogs`);
          setBlogs(response.data);
        } catch (error) {
          setError(error.response.data.message || 'An error occurred while fetching blogs.');
        }
      };
  
      fetchBlogs();
    }, []);
  return (
    <>
        <h1 className="text-4xl font-bold mb-4 text-center my-10"> AllBlogs</h1>
        <Link to={'/createblog'}>
        <div className='flex justify-end mr-8'>
        <div className='fixed bg-green-500 z-10 hover:bg-green-700  text-white font-bold py-2 px-4 rounded'>+ Create New Blog</div>
        </div> 
        </Link>

        
        <main className='flex flex-wrap justify-center items-center text-center gap-8 pt-8'> 

        
         {blogs.map((blog,i) => (
        <Link to={`/blogdetail/${blog._id}`} key={blog._id}>
        


<div className='blog-cart max-w-80'>
<h3>{i+1}</h3>
<img className=' w-fit' src={blog.imageUrl} alt="" />
<h3 className='my-2'>{blog.heading}</h3>
<p>{blog.p}</p>
<div className="postman text-left">
<img className='h-[30px] w-fit rounded-full' src={blog.img} alt="" />
<p>{blog.name}</p>
<p className='text-gray-600'>{blog.post}</p>
<p className="postdate text-gray-600"></p>
</div>
</div>





         <br />
          <br />
          <br />
        </Link>

      ))}
  </main>
  </>
  )
}

export default AllBlogs
