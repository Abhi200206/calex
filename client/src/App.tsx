import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Home } from "./pages/Home"
import { Analyze } from "./pages/Analyze"
import { Create } from "./pages/Create"
import LandingPage from "./pages/Landging"
import { View } from "./pages/View"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/view" element={<View/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
