import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateCaseStudy = () => {
  const [caseStudy, setCaseStudy] = useState({
    backgroundImage: '',
    moboImg: '',
    heading: '',
    text: '',
    path: '',
    bgColorfrom: '',
    bgColorTo: '',
    category: '',
    logImg1: '',
    logImg2: '',
    logImg3: '',
    detail: '',
    screenScreenshort: ['',''],
    appTestLink: '',
    webTestLink: '',
    isoTestLink: '',
    clientReview: [{ clientreview: '', clientImg: '', clientname: '' }],
    Process: [{ theProblem: '', theSoluction: '', theResult: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseStudy({ ...caseStudy, [name]: value });
  };

  const handleChangeArray = (e, index) => {
    const updatedArray = [...caseStudy.screenScreenshort];
    updatedArray[index] = e.target.value;
    setCaseStudy({ ...caseStudy, screenScreenshort: updatedArray });
  };

  const handleChangeClientReview = (e, index, field) => {
    const updatedClientReview = [...caseStudy.clientReview];
    updatedClientReview[index][field] = e.target.value;
    setCaseStudy({ ...caseStudy, clientReview: updatedClientReview });
  };

  const handleChangeProcess = (e, index, field) => {
    const updatedProcess = [...caseStudy.Process];
    updatedProcess[index][field] = e.target.value;
    setCaseStudy({ ...caseStudy, Process: updatedProcess });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/casestudy/create', caseStudy, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Input fields */}
      <div className="mb-4 flex gap-5">
        <label htmlFor="backgroundImage" className="block text-gray-700 font-bold mb-2">Background Image URL</label>
        <input type="text" name="backgroundImage" placeholder="Background Image URL" value={caseStudy.backgroundImage} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
     <img className='w-[50px] h-fit' src={caseStudy.backgroundImage} alt="" />
      </div>
      {/* ... */}
         <div className="mb-4 flex gap-5">
        <label htmlFor="heading" className="block text-gray-700 font-bold mb-2">Mobile Image</label>
        <input type="text" name="moboImg" placeholder="moboImg" value={caseStudy.moboImg} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <img className='w-[50px] h-fit ' src={caseStudy.moboImg} alt="" />
      </div>
      {/* ... */}
      <div className="mb-4">
        <label htmlFor="heading" className="block text-gray-700 font-bold mb-2">Heading</label>
        <input type="text" name="heading" placeholder="Heading" value={caseStudy.heading} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      {/* ... */}
       {/* ... */}
       <div className="mb-4">
        <label htmlFor="heading" className="block text-gray-700 font-bold mb-2">Text</label>
        <input type="text" name="text" placeholder="Text" value={caseStudy.text} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
          {/* ... */}
          <div className="mb-4">
        <label htmlFor="heading" className="block text-gray-700 font-bold mb-2">detail</label>
        <input type="text" name="detail" placeholder="Text" value={caseStudy.detail} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
          {/* ... */}

      <div className="mb-4">
        <label htmlFor="path" className="block text-gray-700 font-bold mb-2">Path</label>
        <input type="text" name="path" placeholder="Path" value={caseStudy.path} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
          {/* ... */}

      <div className="mb-4 ">
        <label htmlFor="bgColorfrom" className="block text-gray-700 font-bold mb-2">Background Color From</label>
        <input type="text" name="bgColorfrom" placeholder="Background Color From" value={caseStudy.bgColorfrom} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <input name="bgColorfrom" value={caseStudy.bgColorfrom}  onChange={handleChange} type="color" />
      </div>

                  {/* ... */}

      <div className="mb-4">
        <label htmlFor="bgColorTo" className="block text-gray-700 font-bold mb-2">Background Color To</label>
        <input type="text" name="bgColorTo" placeholder="Background Color To" value={caseStudy.bgColorTo} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <input name="bgColorTo" value={caseStudy.bgColorTo}  onChange={handleChange} type="color" />
      </div>
                {/* ... */}

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
        <input type="text" name="category" placeholder="Category" value={caseStudy.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
                {/* ... */}
                <div className="mb-4 flex gap-5">
        <label htmlFor="logImg1" className="block text-gray-700 font-bold mb-2">Log Image 1 URL</label>
        <input type="text" name="logImg1" placeholder="Log Image 1 URL" value={caseStudy.logImg1} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <img className='w-[50px] h-fit ' src={caseStudy.logImg1} alt="" />
      </div>
        {/* ... */}
      <div className="mb-4 flex gap-5">
        <label htmlFor="logImg2" className="block text-gray-700 font-bold mb-2">Log Image 2 URL</label>
        <input type="text" name="logImg2" placeholder="Log Image 2 URL" value={caseStudy.logImg2} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <img className='w-[50px] h-fit ' src={caseStudy.logImg2} alt="" />
      </div>
        {/* ... */}
      <div className="mb-4 flex gap-5">
        <label htmlFor="logImg3" className="block text-gray-700 font-bold mb-2">Log Image 3 URL</label>
        <input type="text" name="logImg3" placeholder="Log Image 3 URL" value={caseStudy.logImg3} onChange={handleChange} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        <img className='w-[50px] h-fit ' src={caseStudy.logImg3} alt="" />

      </div>
        {/* ... */}
        {/* <div className="mb-4">
        <label htmlFor="detail" className="block text-gray-700 font-bold mb-2">Detail</label>
        <input type="text" name="detail" placeholder="Detail" value={caseStudy.detail} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div> */}
              {/* ... */}

      {/* Add input fields for screenScreenshort array */}
      {caseStudy.screenScreenshort.map((item, index) => (
        <div key={index} className="mb-4 flex gap-5">
          <label htmlFor={`screenScreenshort-${index}`} className="block text-gray-700 font-bold mb-2">Screenshot URL {index + 1}</label>
          <input type="text" id={`screenScreenshort-${index}`} placeholder={`Screenshot URL ${index + 1}`} value={item} onChange={(e) => handleChangeArray(e, index)} className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          <img className='w-[50px] h-fit ' id={`screenScreenshort-${index}`} src={item} alt="" onChange={(e) => handleChangeArray(e, index)} />
        </div>
      ))}
{/* ... */}
<div className="mb-4">
        <label htmlFor="appTestLink" className="block text-gray-700 font-bold mb-2">App Test Link</label>
        <input type="text" name="appTestLink" placeholder="App Test Link" value={caseStudy.appTestLink} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      {/* ... */}
      <div className="mb-4">
        <label htmlFor="webTestLink" className="block text-gray-700 font-bold mb-2">Web Test Link</label>
        <input type="text" name="webTestLink" placeholder="Web Test Link" value={caseStudy.webTestLink} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      {/* ... */}
      <div className="mb-4">
        <label htmlFor="isoTestLink" className="block text-gray-700 font-bold mb-2">ISO Test Link</label>
        <input type="text" name="isoTestLink" placeholder="ISO Test Link" value={caseStudy.isoTestLink} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {/* Add input fields for clientReview array */}
      {caseStudy.clientReview.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label htmlFor={`clientReview-${index}`} className="block text-gray-700 font-bold mb-2">Client Review {index + 1}</label>
              <input type="text" id={`clientReview-${index}`} placeholder={`Client Review ${index + 1}`} value={item.clientreview} onChange={(e) => handleChangeClientReview(e, index, 'clientreview')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor={`clientImg-${index}`} className="block text-gray-700 font-bold mb-2">Client Image URL {index + 1}</label>
              <input type="text" id={`clientImg-${index}`} placeholder={`Client Image URL ${index + 1}`} value={item.clientImg} onChange={(e) => handleChangeClientReview(e, index, 'clientImg')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor={`clientname-${index}`} className="block text-gray-700 font-bold mb-2">Client Name {index + 1}</label>
              <input type="text" id={`clientname-${index}`} placeholder={`Client Name ${index + 1}`} value={item.clientname} onChange={(e) => handleChangeClientReview(e, index, 'clientname')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      ))}

      {/* Add input fields for Process array */}
      {caseStudy.Process.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor={`theProblem-${index}`} className="block text-gray-700 font-bold mb-2">The Problem {index + 1}</label>
              <input type="text" id={`theProblem-${index}`} placeholder={`The Problem ${index + 1}`} value={item.theProblem} onChange={(e) => handleChangeProcess(e, index, 'theProblem')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="col-span-1">
              <label htmlFor={`theSoluction-${index}`} className="block text-gray-700 font-bold mb-2">The Solution {index + 1}</label>
              <input type="text" id={`theSoluction-${index}`} placeholder={`The Solution ${index + 1}`} value={item.theSoluction} onChange={(e) => handleChangeProcess(e, index, 'theSoluction')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="col-span-1">
              <label htmlFor={`theResult-${index}`} className="block text-gray-700 font-bold mb-2">The Result {index + 1}</label>
              <input type="text" id={`theResult-${index}`} placeholder={`The Result ${index + 1}`} value={item.theResult} onChange={(e) => handleChangeProcess(e, index, 'theResult')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      ))}

      <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">Submit</button>
    </div>
  );
};

export default UpdateCaseStudy;











