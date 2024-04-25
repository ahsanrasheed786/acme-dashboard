import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
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




function App() {
  return (
    

<Router>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile/:id" element={<Profile/>} />
    <Route path="/login" element={<LogIn />} />
    <Route path="/add/new/employee/signup" element={<Signup />} />
    <Route path="/casestudy" element={<CaseStudy />} />
    <Route path="/allblogs" element={<AllBlogs/>} />
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
