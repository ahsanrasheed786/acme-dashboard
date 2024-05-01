import axios from "axios";
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { useEffect, useState } from "react";
import { myServerUrl } from "../../../App";

const AttendanceConfirmation = () => {
  const deleteApi = `${myServerUrl}api/attendance/delete/`;
  const updateApi = `${myServerUrl}api/attendance/update/`;
  const confirmApi = `${myServerUrl}api/attendance/updateanddelete/`;

  const officeRules = {
    openingTime: '09:00', // 9:00 AM
    closingTime: '06:00', // 6:00 PM
    totalDutyMinutes: 540, // 9 hours
    leave: ["Saturday", "Sunday"],
  };

  const [allAttendance, setAllAttendance] = useState([]);
  const [updateAndDelete, setUpdateAndDelete] = useState([]);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${myServerUrl}api/attendance/all`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setAllAttendance(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [updateAndDelete, update]);

  return (
    <div className="">
      <article className={`relative min-h-[50vh] ml-4 p-14 gap-5 rounded-xl bg-gray-700 bg-opacity-30 backdrop-blur-sm text-black max-h-[70vh] overflow-y-auto`}>
        <h2>Attendance</h2>
        {allAttendance.map((item, index) => {


const checkOutTimeParts = item.checkOutTime.split(/[/, :]/).map(String);
const checkOutHours = checkOutTimeParts[4];
const checkOutMinutes = checkOutTimeParts[5];
// const checkIntotalMinutes = +(checkOutHours) * 60 + (checkOutMinutes);

// console.log(`${checkOutHours}:${checkIntotalMinutes}`)




          // check in time
          // ====================================================================
          const checkInTimeParts = item.checkInTime.split(/[/, :]/).map(String);
          const checkInHours = checkInTimeParts[4]; 
          const checkInMinutes = +(checkInTimeParts[5]); 
          const checkIntotalMinutes =  checkInHours * 60 + checkInMinutes;
          // {console.log(`${checkIntotalMinutes}`)}

          // ==================================================================
          // spliting office rules
          const officeOpeningTimeParts = officeRules.openingTime.split(':').map(Number);
          const officeOpeningTotalMinutes = officeOpeningTimeParts[0] * 60 + officeOpeningTimeParts[1];

          const lateMinutes = checkIntotalMinutes-officeOpeningTotalMinutes
          return (
            <div key={index} className="bg-gray-800 p-4 mt-3 rounded-xl bg-opacity-30">
              <h3>{item.userName}</h3>
              <p>{item.currentDay}</p>
              {/* Display check-in time and highlight if late */}
              <p className={`${checkIntotalMinutes+10 <= officeOpeningTotalMinutes ? 'text-green-600' : 'text-red-600'}`}>{item.checkInTime}</p>
              <p>{item.checkOutTime}</p>
              <p>{item.officeTime}</p>
              <p>{lateMinutes > 0 ? `Late for ${lateMinutes} minutes` : 'On time'}</p>

              <div className="flex justify-evenly">
                <button
                  onClick={async () => {
                    const response = await axios.patch(`${updateApi}${item._id}`, {
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true
                    });
                    setUpdate(response.data.foundedAndUpdated);
                  }}
                  className="text-blue-600 text-xl"
                >
                  <MdOutlineSecurityUpdateGood />
                </button>
                <button
                  onClick={async () => {
                    const response = await axios.post(`${confirmApi}${item._id}`, {
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true
                    });
                    setUpdateAndDelete(response.data.deleted);
                  }}
                  className="text-green-600 text-xl"
                >
                  <GiConfirmed />
                </button>
                <button
                  onClick={async () => {
                    const x = confirm('Are you sure?');
                    if (!x) return;
                    const response = await axios.delete(`${deleteApi}${item._id}`, {
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true
                    });
                    console.log(response.data);
                  }}
                  className="text-red-600 text-xl"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default AttendanceConfirmation;
