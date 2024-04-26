
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Attendance = () => {
  const [checkInTime, setCheckInTime] = useState(localStorage.getItem('checkInTime'));
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [officeTime, setOfficeTime] = useState();
  const [currentDay, setCurrentDay] = useState();
  const [currentDate, setCurrentDate] = useState();

  const handleCheckIn = () => {
    const confirmation = confirm(`Are you sure you want to mark your attendance?`)
    if (!confirmation) {
      return;
    }
    const currentTime = new Date().toLocaleString();
    localStorage.setItem('checkInTime', currentTime);
    setCheckInTime(currentTime);
  };

  const handleCheckOut = () => {
    const currentTime = new Date().toLocaleString();
    const savedCheckInTime = localStorage.getItem('checkInTime');
    setCheckOutTime(savedCheckInTime);
    const confirmation = confirm(`Are you sure you want to mark your attendance? Today Your Total Office working time is ${officeTime}`)
    if (!confirmation) {
      return;
    }
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date1 = new Date(currentTime);
    const date2 = new Date(checkOutTime);
    const timeDifference = date1.getTime() - date2.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const year= new Date().getFullYear();
    const month= new Date().getMonth();
    const date= new Date().getDate();
    const currentday = new Date().getDay();
    setCurrentDay(daysOfWeek[currentday]);
    setCurrentDate(`${date}-${month}-${year}`);
    setOfficeTime(`${hours.toString()} : ${minutes.toString()} : ${seconds.toString()}`);

    axios.post(`http://localhost:8000/api/attendance/`, {
      checkInTime,checkOutTime,officeTime,currentDay, currentDate 
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    localStorage.removeItem('checkInTime');
    setCheckInTime(null);
  };

  useEffect(() => {
    // This effect will run only once when the component mounts
    window.onbeforeunload = () => {
      // Preserve check-in time in local storage before leaving the page
      localStorage.setItem('checkInTime', checkInTime);
    };

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.onbeforeunload = null;
    };
  }, [checkInTime]);

  return (
    <div>
      <h2>Check In/Out</h2>
      {checkInTime ? (
        <div>
          <p>Checked In at: {checkInTime}</p>
          <button onClick={handleCheckOut}>Check Out</button>
        </div>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
    </div>
  );
};

export default Attendance;










// thats old code 
// import  { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Attendance = () => {
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [checkOutTime, setCheckOutTime] = useState(null);
//   const [officeTime, setOfficeTime] = useState();
//   const [currentDay, setCurrentDay] = useState();
//   const [currentDate, setCurrentDate] = useState();
//   // const { id } = useParams();
//   const handleCheckIn = () => {
//     const confirmation = confirm(`Are you sure you want to mark your attendance?`)
//  if (!confirmation) {
//   return;
//  }
//     const currentTime = new Date().toLocaleString();
//     localStorage.setItem('checkInTime', currentTime);
//     setCheckInTime(currentTime);
//   };

//   const handleCheckOut = () => {
//     const currentTime = new Date().toLocaleString();
//     const savedCheckInTime = localStorage.getItem('checkInTime');
//     setCheckOutTime(savedCheckInTime);
//     const confirmation = confirm(`Are you sure you want to mark your attendance? Today Yours Total Office working time is ${officeTime}`)
//  if (!confirmation) {
//   return;
//  }
//  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const date1 = new Date(currentTime);
//     const date2 = new Date(checkOutTime);
//     const timeDifference = date1.getTime() - date2.getTime();
//     const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
//  const year= new Date().getFullYear();
//   const month= new Date().getMonth();
//   const date= new Date().getDate();
// const currentday = new Date().getDay();
// setCurrentDay(daysOfWeek[currentday]);
// setCurrentDate(`${date}-${month}-${year}`);
// setOfficeTime(`${hours.toString()} : ${minutes.toString()} : ${seconds.toString()}`);

//   axios.post(`http://localhost:8000/api/attendance/`, {
//        checkInTime,checkOutTime,officeTime,currentDay, currentDate })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//     localStorage.removeItem('checkInTime');
//     setCheckInTime(null);
//   };

//   return (
//     <div>
//       <h2>Check In/Out</h2>
//       {checkInTime ? (
//         <div>
//           <p>Checked In at: {checkInTime}</p>
//           <button onClick={handleCheckOut}>Check Out</button>
//         </div>
//       ) : (
//         <button onClick={handleCheckIn}>Check In</button>
//       )}
//     </div>
//   );
// };

// export default Attendance;
