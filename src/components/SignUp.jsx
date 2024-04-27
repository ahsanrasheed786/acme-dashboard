import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { myServerUrl } from "../App";


const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [post,setPost] = useState("");
  const [image,setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
try {
  // http://localhost:8000/api/user/register
  const responce=await axios.post(`${myServerUrl}api/user/register`,
  {name, username,phone ,email, password,post,image},
  {headers: { 'Content-Type': 'application/json' }},
  {withCredentials: true} )  
  toast.success(responce.data.message)

  navigate('/')
  setLoading(false)
} catch (error) {
  toast.success(error.response.data.message) 
  // console.log(error)
  setLoading(false)
}
  };

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Add up
          </h2>
          <p className="text-xl text-gray-600">Add A New Employee</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md flex flex-col gap-5 shadow-sm -space-y-px">
{/* name */}
          <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              <input
                id="name-address"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your Name"
              />
            </div>
{/* usename */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your Username"
              />
            </div>
{/* phone */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                autoComplete="email"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="+92 0000 0000"
              />
            </div>
{/* email */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
{/* password */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {/* post */}
            <div>
              <label htmlFor="post" className="sr-only">
                Post
              </label>
              <input
                id="post"
                name="post"
                type="text"
                required
                value={post}
                onChange={(e) => setPost(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="employee , CEO"
              />
            </div>

            
            {/* img src */}
            <div>
              <label htmlFor="image" className="sr-only">
               Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Image url"
              />
            </div>

            {/*  */}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l6 6a1 1 0 010 1.42l-6 6a1 1 0 01-1.41-1.42L14.59 13H12a6 6 0 100 12 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1v-2a1 1 0 011-1 4 4 0 110-8h-2.59l-2.3 2.29a1 1 0 01-1.41-1.42l4-4a1 1 0 011.42 0l4 4a1 1 0 01-1.42 1.42L11 13.41V16a1 1 0 01-2 0v-4a1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1V9.17A8 8 0 014 12z"></path>
                </svg>
              ) : null}
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;