import  { useState, useEffect } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom';
import { myServerUrl } from '../App';
const CaseStudy = () => {
    const [casestudies, setCaseStudies] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`${myServerUrl}api/casestudy/get`);
          setCaseStudies(response.data);
          // backgroundImage
            // heading
            // text


          // console.log(response.data)
          console.log(casestudies)
        } catch (error) {
          setError(error.response.data.message || 'An error occurred while fetching blogs.');
        }
      };
  
      fetchBlogs();
    }, []);
  return (
    <>
        <h1 className="text-4xl font-bold mb-4 text-center my-10"> All Case Study</h1>
        <Link to={'/createCaseStudy/'}>
        <div className='flex justify-end mr-8'>
        <div className='fixed bg-green-500 z-10 hover:bg-green-700  text-white font-bold py-2 px-4 rounded'>+ Create New CaseStudy</div>
        </div> 
        </Link>

        
        <main className='flex flex-wrap justify-center items-center text-center gap-8 pt-8'> 

        
         {casestudies.map((item,i) => (
        <Link to={`/update/CaseStudy/${item._id}`} key={item._id}>
        


<div className='blog-cart max-w-80'>
<h3>{i+1}</h3>
<img className=' w-fit' src={item.backgroundImage} alt="" />
<h3 className='my-2'>{item.heading}</h3>
<p>{item.text}</p>
<div className="postman text-left">
{/* <img className='h-[30px] w-fit rounded-full' src={casestudies.img} alt="" />
<p>{casestudies.name}</p>
<p className='text-gray-600'>{casestudies.post}</p> */}
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

export default CaseStudy
