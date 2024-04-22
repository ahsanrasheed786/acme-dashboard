import { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

import Footer from "./components/footer/Footer"
import NavBar from "./components/footer/NavBar/NavBar"
import { Toaster } from "react-hot-toast"


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
    <Route path="*" element={<Home />} />
  </Routes>
  {/* <Footer/> */}
  <Toaster/>
</Router>

  )
}

export default App
