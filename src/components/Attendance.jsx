import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { myServerUrl } from '../App';
import toast from 'react-hot-toast';

const Attendance = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  useEffect(() => {
    const getSavedCheckInTime = async () => {
      try {
        const savedCheckInTime = localStorage.getItem('checkInTime');
        if (savedCheckInTime) {
          setCheckInTime(savedCheckInTime);
        }
      } catch (error) {
        console.error('Error retrieving check-in time:', error);
      }
    };
    getSavedCheckInTime();
  }, []);

  const handleCheckIn = async () => {
    try {
    const confirmation = window.confirm(`Are you sure you want to mark your attendance at ${new Date().toLocaleString()} ?`);
      if (!confirmation) return;
      const currentTime = new Date().toLocaleString();
     const responce=await axios.post(`${myServerUrl}api/firstattendance/`,{checkInTime:currentTime},{withCredentials: true})
     console.log(responce)

     localStorage.setItem('checkInTime', currentTime);
      setCheckInTime(currentTime);
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentTime = new Date().toLocaleString();
      const savedCheckInTime = localStorage.getItem('checkInTime');
      const checkInDate = new Date(savedCheckInTime);
      const checkOutDate = new Date(currentTime);
      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = daysOfWeek[checkOutDate.getDay()];
      
      setCurrentDay(currentDay);
      const currentDate = `${checkOutDate.getDate()}/${checkOutDate.getMonth() + 1}/${checkOutDate.getFullYear()}`;
      const officeTime= `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

      if (!savedCheckInTime) {
        toast.error('No check-in time found');
        return;
      }
      const confirmation = window.confirm(`Are you sure you want to mark your attendance at ${new Date().toLocaleString()} and your office time is ${officeTime} ?`);
      if (!confirmation) return;
      if (currentDay === 'Saturday' || currentDay === 'Sunday') return
      await axios.post(`${myServerUrl}api/attendance/`, {
        checkInTime: savedCheckInTime,
        checkOutTime: currentTime,
        officeTime,
        currentDay,
        currentDate
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      toast.success('Attendance submitted successfully');
      localStorage.removeItem('checkInTime');
      setCheckInTime(null);
    } catch (error) {
      console.error('Error during check-out:', error);
    }
  };

  return (
    <div className="p-4">
     <h2 className="text-2xl font-bold mb-4">Attandance</h2>
     <p>
      {currentDay== 'Saturday' || currentDay== 'Sunday' ? 'Today is a holiday' : '' }
     </p>
      {checkInTime ? (
        <div>
          <p>Checked In at: {checkInTime}</p>
          <button disabled={currentDay== 'Saturday' || currentDay== 'Sunday'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      ) : (
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckIn}>
          Check In
        </button>
      )}
    </div>
  );
};

export default Attendance;