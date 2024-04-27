import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { myServerUrl } from '../../App';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [deleted, setDeleted] = useState();

  const handleInputChange = (value, key) => {
    if (typeof value === 'boolean') {
      setBlog({ ...blog, [key]: value });
    } else {
      setBlog({ ...blog, [key]: value });
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${myServerUrl}api/blog/getblog/${id}`);
        setBlog(response.data.blog);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchBlog();
  }, []);

  const handleUpdate = async (id, updatedBlog) => {
const confirmation = await  confirm("Are you sure you want to update this blog?")
if (!confirmation) {
  return;
}

    try {
      const response = await axios.patch(`${myServerUrl}api/blog/updateblog/${id}`, updatedBlog);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Failed to update blog');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    const confirmation = await  confirm("Are you sure you want to update this blog?")
    if (!confirmation) {
      return;
    }
    
        try {
          const response = await axios.delete(`${myServerUrl}api/blog/deleteblog/${id}`);
           
          setDeleted(!response.data.success)
          if (response.data.success) {
            toast.success(response.data.message);
            window.history.back ();
          } else {
            toast.error(response.data.message || 'Failed to Delete Blog');
            window.history.back ();
          }
        } catch (error) {
          toast.error(error.response.data.message);
          window.history.back ();
        }
      };

  return (
    <>
      <main className={`p-8  `}>
        <article className='flex flex-col  items-center justify-center'>
        <h1 className=" mb-8  ">Blog</h1>
        <img src={blog.imageUrl} alt="" className="w-full lg:max-w-[50vw] mb-10 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer" title='image src' />
        </article>
        <div className="flex items-center mb-4">
          <label className="mr-2">Image src:</label>
          <input
            type="text"
            value={blog.imageUrl}
            onChange={(e) => handleInputChange(e.target.value, 'imageUrl')}
            className="flex-1 p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-2">Toggle:</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={blog.isImageRight}
              onChange={(e) => handleInputChange(e.target.checked, 'isImageRight')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Heading:</label>
          <input
            type="text"
            value={blog.heading}
            onChange={(e) => handleInputChange(e.target.value, 'heading')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">P:</label>
          <input
            type="text"
            value={blog.p}
            onChange={(e) => handleInputChange(e.target.value, 'p')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Text:</label>
          <input
            type="text"
            value={blog.text}
            onChange={(e) => handleInputChange(e.target.value, 'text')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Italic:</label>
          <input
            type="text"
            value={blog.italic}
            onChange={(e) => handleInputChange(e.target.value, 'italic')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <div className="detail">
          {blog.detail &&
            blog.detail.map((item, i) => (
              <div key={item._id} className="mb-4">
                <label className="block mb-2">Head:</label>
                <input
                  type="text"
                  value={item.head}
                  onChange={(e) => handleInputChange(e.target.value, `detail[${i}].head`)}
                  className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <label className="block mb-2">Text:</label>
                <input
                  type="text"
                  value={item.txt}
                  onChange={(e) => handleInputChange(e.target.value, `detail[${i}].txt`)}
                  className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
              </div>
            ))}
        </div>
        <div className="postman">
          <img src={blog.img} alt="" className="w-[100px] rounded-full h-fit mb-4" />
          <label className="block mb-2">Image:</label>
          <input
            type="text"
            value={blog.img}
            onChange={(e) => handleInputChange(e.target.value, 'img')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={blog.name}
            onChange={(e) => handleInputChange(e.target.value, 'name')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
          <label className="block mb-2">Post:</label>
          <input
            type="text"
            value={blog.post}
            onChange={(e) => handleInputChange(e.target.value, 'post')}
            className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </div>
        <button
          onClick={() => handleUpdate(blog._id, blog)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-6 mt-4 ">
          Update
        </button>

        <button
          onClick={() => handleDelete(blog._id, blog)}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mx-6 mt-4 ">
          Delete
        </button>
      </main>
    </>
  );
};

export default SingleBlog;