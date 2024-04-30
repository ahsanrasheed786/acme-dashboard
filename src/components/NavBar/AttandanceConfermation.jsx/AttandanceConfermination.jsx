import axios from "axios";
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { useEffect, useState } from "react"
import { myServerUrl } from "../../../App";

const AttandanceConfermation = () => {
const deleteApi=`${myServerUrl}api/attendance/delete/`
const updateApi=`${myServerUrl}api/attendance/update/`
// const deleteApi=`${myServerUrl}{}api/attendance/delete/`


// const deletehandler=async(id)=>{

//     const response = await axios.delete(`${myServerUrl}api/attendance/${id}`);
// }


    const [allAttandance,setAllAttandance] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${myServerUrl}api/attendance/all`, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            });
            setAllAttandance(response.data);
            // console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData()
    },[allAttandance])
  return (
    <div className="">  
  <article  className={`relative min-h-[50vh] ml-4 p-14  gap-5 rounded-xl bg-gray-700 bg-opacity-30 backdrop-blur-sm text-black max-h-[70vh] overflow-y-auto` }   >
  <h2>Attandance</h2>
{
  allAttandance.map((item,index) => (
 
    <div key={index} className="bg-gray-800 p-4 mt-3 rounded-xl bg-opacity-30">
      
 <h3>{item.userName}</h3>
 <p>{item.currentDay}</p>
<p >{item.checkInTime}</p>
<p >{item.checkOutTime}</p>
<p>{item.officeTime}</p>
<div className="flex justify-evenly">
<button onClick={()=>{axios.patch(`${updateApi}${item._id}`,{headers: { 'Content-Type': 'application/json' }, withCredentials: true})}} className="text-blue-600 text-xl"><MdOutlineSecurityUpdateGood /></button>
<button className="text-green-600 text-xl"><GiConfirmed /></button>
{/* {console.log(item._id)} */}
<button onClick={()=>{axios.delete(`${deleteApi}${item._id}`,{headers: { 'Content-Type': 'application/json' }, withCredentials: true})}} className="text-red-600 text-xl"><MdDelete /></button>
</div>

    </div>
   
  ))
}

  </article>
    </div>
  )
}

export default AttandanceConfermation
