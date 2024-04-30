import { BrowserRouter as Router , Routes, Route,  } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import LogIn from "./components/LogIn"
import Profile from "./pages/Profile"
// import Footer from "./components/footer/Footer"
import NavBar from "./components/NavBar/NavBar"
import { Toaster } from "react-hot-toast"
import AllBlogs from "./pages/AllBlogs"
import SingleBlog from "./components/Blog/SingleBlog"
import CreateNewBlog from "./components/Blog/CreateNewBlog"
import Signup from "./components/SignUp"
import CaseStudy from "./pages/CaseStudy"
import UpdateCaseStudy from "./components/casestudy/UpdateCase"
import CreateCaseStudy from "./components/casestudy/CreateCaseStudy.jsx"
import { context } from "./main.jsx"
import { useContext } from "react"
import ProfileModel from "./components/ProfileModel.jsx"


// export const myServerUrl ="https://acme-backend-server.onrender.com/"
export const myServerUrl ="http://localhost:8000/"


function App() {
  const {isAuthenticated,profilebtn} = useContext(context)
  return (
    

<Router>

  <Routes>
  <Route path="/login" element={<LogIn userAuth={isAuthenticated} />} />
  </Routes>
  
  <NavBar/>
  { profilebtn &&< ProfileModel/>}
  <Routes>
    <Route path="/" element={ <Home userAuth={isAuthenticated} /> } />
    <Route path="/about" element={<About />} />
    <Route path="/profile/:id" element={<Profile  userAuth={isAuthenticated}/>} />
    <Route path="/add/new/employee/signup" element={<Signup />} />
    <Route path="/casestudy" element={<CaseStudy  userAuth={isAuthenticated} />} />
    <Route path="/allblogs" element={<AllBlogs  userAuth={isAuthenticated}/>} />
    <Route path="/blogdetail/:id" element={<SingleBlog/>} />
    <Route path="/createblog/" element={<CreateNewBlog/>} />
    <Route path="/update/CaseStudy/:id" element={<UpdateCaseStudy/>} />
    <Route path="/createCaseStudy/" element={<CreateCaseStudy/>} />
  </Routes>
  {/* <Footer/> */}
  <Toaster/>
</Router>

  )
}

export default App
