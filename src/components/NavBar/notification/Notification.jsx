
const Notification = ({notifications}) => {
  return (
    <div className="">  
  <article className={`relative min-h-[50vh] ml-4 p-10 gap-5 rounded-xl bg-gray-700 bg-opacity-30 backdrop-blur-sm text-black` }  >
{
  notifications.map((item,index) => (
  <div className=" " key={index}>
 <h2 >{item.userName}</h2>
    <p >{item.checkInTime}</p>
  </div>
   
  ))
}
  </article>
    </div>
  )
}

export default Notification
