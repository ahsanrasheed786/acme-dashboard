import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myServerUrl } from "../App";
import { context } from "../main";
import Notification from "../components/NavBar/notification/Notification";
import { MdNotificationAdd } from "react-icons/md";
import { CiAlarmOn } from "react-icons/ci";
import toast from "react-hot-toast";
import AttandanceConfermation from "../components/NavBar/AttandanceConfermation.jsx/AttandanceConfermination";

const Home = ({ userAuth }) => {
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationbtn,setNotificationBtn]=useState();
  const [confirmationAttandance, setConfirmationAttandance] = useState(false);
  const { userProfile } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth) return navigate('/login');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${myServerUrl}api/user/alluser`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const notificationHandler = async () => {
    try {
      const responce = await axios.get(`${myServerUrl}api/getfirstattendance`, {
      headers: { 'Content-Type': 'application/json' },
        withCredentials: true, })
        if (!responce.data) return
        setNotifications(responce.data.firstAttendance)
        setNotificationBtn(!notificationbtn)
        // console.log(responce.data.firstAttendance)
    } catch (error) {
      // llldfjal
    }
     
  }

const confirmationHandler = async () => {
  setConfirmationAttandance(!confirmationAttandance)  }




  return (
    <>
    <main >
      <div className="flex justify-end mr-8 mt-8 sticky z-10">
        <Link to={'/add/new/employee/signup'}>
          <div className={userProfile.isAdmin ? `bg-green-600 p-4 rounded-lg shadow-lg hover:bg-green-500 text-white` : 'hidden'}>+ Add New Employee</div>
        </Link>
      </div>

      <section className="flex justify-between absolute  w-[100vw]">
  <article className="flex pr-10 relative left-2">
    <MdNotificationAdd onClick={notificationHandler} className={`text-4xl ${notifications ? 'text-red-500' : 'text-green-400'}`} /> 
    <span className="text-xl text-red-500">{notifications.length}</span>
    {notificationbtn && <Notification notifications={notifications} />}
  </article>
  
  <article className="flex pr-10 relative right-2">
  {confirmationAttandance && <AttandanceConfermation />}
  <CiAlarmOn onClick={confirmationHandler} className={` font-bold text-4xl ${confirmationAttandance ? 'text-red-500' : 'text-green-400'}`} />
   
    </article>
     </section>



              {/* uper section is notifecation section  */}
{/* =========================================================================================================== */}

      <section className="flex flex-wrap justify-center items-center gap-16 h-[50vh]">

        {users.map((item) => (
          <Link key={item._id} to={userProfile.isAdmin || userProfile.isSubAdmin || userProfile._id === item._id ? `/profile/${item._id}` : "#"} disabled={!userProfile.isAdmin}>
            <div className={`bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row md:space-x-4 leading-10 border-4 ${userProfile._id === item._id ? 'border-red-400' : 'border-blue-400'}`}>
              <div className="flex-shrink-0">
                <img src={item.image} alt="User Image" className="w-full h-40 object-cover mb-4 rounded-lg md:h-full md:w-40" />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-800">{item.post}</p>
                <p className="text-gray-600">{item.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      </main>
    </>
  );
};

export default Home;
