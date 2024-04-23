import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const SingleBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  const handleInputChange = (value, key) => {
    const updatedBlog = { ...blogs };
    updatedBlog[key] = value;
    setBlogs(updatedBlog);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/getblog/${id}`);
        setBlogs(response.data);
       
      } catch (error) {
        toast.error(error.response.data.message  )
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdate = async (id, updatedBlog) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/blog/updateblog/${id}`, updatedBlog);
      console.log(response)
      if (response.data.success) {
        // console.log('Blog updated successfully');
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message || 'Failed to update blog');
      }
    } catch (error) {
        toast.error(error.response.data.message)
  
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-4">Blogs</h1>
        {/* {error && <p className="text-red-500">{error}</p>} */}

        <input
          type="text"
          value={blogs.heading}
          onChange={(e) => handleInputChange(e.target.value, 'heading')}
          className="w-full bg-gray-100 p-2 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <br />

        <button
          onClick={() => handleUpdate(blogs._id, blogs)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update
        </button>
      </div>
    </>
  )
}

export default SingleBlog