import  { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";

import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [isChecked, setIsChecked] = useState();

  const handleToggle = async() => {

    try {
      const response = await axios.patch(`http://localhost:8000/api/user/updateUser/${id}`, { isAdmin: !user.isAdmin });
      setUser(prevUser => ({...prevUser,isAdmin: response.data.user.isAdmin}));
       setIsChecked(response.data.user.isAdmin);
       console.log(response.data.message);
       toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
      console.error(error.message);
    }
   
  };

const handlerdelete = async() => {

  try {
    const response = await axios.delete(`http://localhost:8000/api/user/deleteUser/${id}`)
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.message)
  }
}



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/getuser/${id}`)
        setUser(response.data.user)
        setIsChecked(response.data.user.isAdmin)
        toast.success("Sucessfully fetched data")
      } catch (error) {
        toast.error(error.response.data.message)
        setUser("notFound")

      }
    }


    fetchData()
  }, [id])

  if (!user) {
    {console.log(user)}
    return <div>Loading...</div>
  }
  if (user=='notFound') {
    return <div>User not found</div>
  }

  return (
    <div className='w-[100vw] flex justify-center align-center'>
    <main className="bg-white shadow-xl my-6 max-w-[60vw] leading-10 flex justify-center">
      <section className='flex flex-col justify-center items-center'>
  
        <article>
          <div className="flex items-center mb-4">
            <img
              src={user.image}
              alt={`${user.name} profile picture`}
              className="w-[80vw] md:w-[30vw] xl:w-[20vw] h-fit mr-4"
            />
          </div>
        </article>
  
  
        <article>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Name:{user.name}</h2>
            <p className="text-gray-800">
              <strong>UserName:</strong> {user.username}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-gray-700">
              <strong>Post:</strong> {user.post}
            </p>
            <p className="text-gray-700 flex gap-10 ">
              <strong>Admin Acess:</strong> 
              
              
              {/* off on toggel button */}
              <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div className={`toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner ${isChecked ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${isChecked ? 'translate-x-full bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{isChecked? 'ON' : 'OFF'}</div>
             </label>
              {/* off on toggel button */}

              
            </p>
            <p className="text-gray-700">
              <strong>Join Date:</strong> {user.JoiningDate}
            </p>
          </div>
          <button onClick={handlerdelete} className='flex justify-center items-center gap-1 text-red-600'>
            Delete the Employee
          <MdDelete className='text-2xl' />
          </button>
        </article>
  
      </section>
    </main>
  </div>
  )
}

export default Profile