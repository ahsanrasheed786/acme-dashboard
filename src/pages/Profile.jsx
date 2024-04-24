import  { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment';

const Profile = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null)
  const [isChecked, setIsChecked] = useState();
  const [isSubAdmin, setIsSubAdmin] = useState();



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
 

  const handleSubAdminToggle = async() => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/user/updateUser/${id}`, { isSubAdmin: !user.isSubAdmin });
      setUser(prevUser => ({...prevUser,isSubAdmin: response.data.user.isSubAdmin}));
       setIsSubAdmin(response.data.user.isSubAdmin);
       toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
      console.error(error.message);
    }
   
  }
const handlerdelete = async() => {

  try {
    const response = await axios.delete(`http://localhost:8000/api/user/deleteUser/${id}`)
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.message)
  }
}

const onTimeHandler = async() => {
  let a =confirm(`Are you sure you want to mark your attendance? at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
 
 if (!a) {
   return alert("Cancled")
 }
     const attendanceData = {
      onTime: '120',
      // offTime: '10',
       };
  try { 
    const response = await axios.post(`http://localhost:8000/api/user/attendance/${id}`, {
      attendance: attendanceData,
    });
    console.log(response.data)
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.message)
  }
  
}

const  offTimeHandler = async() => { 
  let a =confirm(`Are you sure you want to mark your attendance? at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
 
 if (!a) {
   return alert("Cancled")
 }
     const attendanceData = {
      // onTime: '120',
      offTime: '10',
       };
  try { 
    const response = await axios.post(`http://localhost:8000/api/user/attendance/${id}`, {
      attendance: attendanceData,
    });
    console.log(response.data)
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.message)
  }
}



    // const  handleAttendance = async (attendanceType) => {
    //   const confirmMessage = `Are you sure you want to mark your ${attendanceType} attendance?`;
    //   if (!window.confirm(confirmMessage)) {
    //     return;
    //   }

    //   try {
    //     setIsLoading(true);
    //     await axios.post(`http://localhost:7000/api/user/attendance/${id}`, {
    //       type: attendanceType
    //     });
    //     alert('Attendance marked successfully');
    //   } catch (error) {
    //     alert('Failed to mark attendance');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/getuser/${id}`)
        setUser(response.data.user)
        setIsChecked(response.data.user.isAdmin)
        setIsSubAdmin(response.data.user.isSubAdmin)
        toast.success("Sucessfully fetched data")
      } catch (error) {
        // console.log(error)
        toast.error(error.message)
        setUser("notFound")

      }
    }

    fetchData()
  }, [id, isChecked, isSubAdmin])

  if (!user) {
    return <div>Loading...</div>
  }
  if (user=='notFound') {
    return <div>User not found</div>
  }

  return ( 
    <>
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
              <strong>UserName:</strong>
               {user.username}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-gray-700">
              <strong>Post:</strong> {user.post}
            </p >

            <p className="text-gray-700">
        <strong>Today Date:</strong>
        {/* <input type="date" value={currDate} /> */}
       { moment().format("MMM Do YYYY")}
      </p>
      <p className="text-gray-700">
        <strong>Day:</strong>
        {/* <input type="text" value={currDay} /> */}
        {moment().format('dddd')=='Sunday'?'OFF':moment().format('dddd')}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong>
        {/* <input type="time" value={currTime} /> */}
        {moment().format(' h:mm: a')}
      </p>

      {/* <div className="attendace flex gap-8">
      <button onClick={onTimeHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>On Time </button>
     <button onClick={offTimeHandler} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Off Time </button>          
      </div> */}
    <div className="attendance flex gap-8">
      <button onClick={() => handleAttendance('onTime')} disabled={isLoading} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {isLoading ? 'Marking...' : 'Mark On Time'}
      </button>
      <button onClick={() => handleAttendance('offTime')} disabled={isLoading} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
        {isLoading ? 'Marking...' : 'Mark Off Time'}
      </button>
    </div>
          
          
            {/* adminaccess */}
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
            {/* subAdmin */}

            <p className="text-gray-700 flex gap-10 ">
              <strong>Sub Admin Acess:</strong> 
              
              
              {/* off on toggel button */}
              <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isSubAdmin}
          onChange={handleSubAdminToggle}
        />
        <div className={`toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner ${isSubAdmin ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${isSubAdmin ? 'translate-x-full bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium">{isSubAdmin? 'ON' : 'OFF'}</div>
             </label>
             </p>

            {/* subadmin ended */}
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

  </>
  )
}

export default Profile