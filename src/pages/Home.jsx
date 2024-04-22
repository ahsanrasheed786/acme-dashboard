import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




const Home = () => {
const [users, setUsers] = useState([])
useEffect( ()  => {

const fetchData = async () =>  {
  try {
    const response = await axios.get(`http://localhost:8000/api/user/alluser`)
    setUsers(response.data)
    // console.log(response.data)
  } catch (error) {
    console.error(error.response.data.message);
  }
 
}

fetchData()
}, [])



  return (
    <>
   <main className="flex flex-wrap justify-center items-center gap-16">

{
  users.map((item) => {
    return (
      <Link key={item._id} to={`/profile/${item._id}`}>
      <div >
<div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row md:space-x-4 leading-10">
  <div className="flex-shrink-0">
    <img src={item.image } alt="Image Name" className="w-full h-40 object-cover mb-4 rounded-lg md:h-full md:w-40" />
  </div>
  <div className="flex-grow">
    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
    <p className="text-gray-800">{item.post}</p>
    <p className="text-gray-600"> {item.email}</p>
  </div>
</div>
</div>
</Link>
)})}


  




   </main>
    </>
  )
}

export default Home
