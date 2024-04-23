import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

// import Footer from "./components/footer/Footer"
import NavBar from "./components/footer/NavBar/NavBar"
import { Toaster } from "react-hot-toast"
// import BlogList from "./pages/BlogList"
import DisplayBlogs from "./pages/Testing"
import AllBlogs from "./pages/AllBlogs"
import SingleBlog from "./components/SingleBlog"
// import Blogs from "./pages/BlogList"
// import DisplayBlogs from "./pages/Testing"


function App() {
  // const server='http://localhost:8000/api'

  return (
    

<Router>
  <NavBar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile/:id" element={<Profile/>} />
    <Route path="login" element={<LogIn />} />
    <Route path="signup" element={<SignUp />} />
    {/* <Route path="/blog" element={<Blogs />} /> */}
    {/* <Route path="/testing" element={<BlogList/>} /> */}
    <Route path="/testing" element={<DisplayBlogs/>} />
    <Route path="/allblogs" element={<AllBlogs/>} />
    <Route path="/detailblog/:id" element={<SingleBlog/>} />



  </Routes>
  {/* <Footer/> */}
  <Toaster/>
</Router>

  )
}

export default App
