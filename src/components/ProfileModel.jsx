import React, { useContext } from 'react'
import { MdClose } from "react-icons/md";
import { context } from '../main';
import Attendance from './Attendance';
import toast from 'react-hot-toast';
import axios from 'axios';
import { myServerUrl } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';


const ProfileModel = () => {
  // const {isAuthenticated,setIsAuthenticated,loading,setLoading,userProfile,profilebtn, setProfilebtn }=useContext(context)
let navigate=useNavigate()
    const {loading,setLoading,isAuthenticated,setIsAuthenticated,userProfile,profilebtn, setProfilebtn} = useContext(context)


    const  logoutHandler = async() => {
      try {
        setLoading(true)
        const logout =  await axios.get(`${myServerUrl}api/user/logout `, {withCredentials: true} )
      toast.success(logout.data.message)
      setIsAuthenticated(false)
      navigate('/login')
      setProfilebtn(false)
      } catch (error) {
      setIsAuthenticated(true)
      }finally{
        setLoading(false)
      }}
  return (
    <div className='fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
    <section className='mt-10 flex flex-col gap-5 text-whte'>
     <button onClick={() => setProfilebtn(false)} className='place-self-end'><MdClose className='text-4xl text-red-600' /></button> 
     <article className='bg-green-100 rounded-xl px-20 py-10 flex flex-col  gap-5 items-center mx-4'>
       <img className='w-40 h-fit ' src={userProfile.image} style={{mixBlendMode:"multiply"}} alt="" />
        <h1>{userProfile.name}</h1>
        <p>{userProfile.email}</p>
        <p>{userProfile.phone}</p>
        <p>{userProfile.post}</p>
        <Attendance/>
        <button onClick={logoutHandler}>LogOut</button>
     </article>
     </section>
    </div>
  )
}

export default ProfileModel
