import React, { Suspense } from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"

function App() {

  return (
    <>
    <BrowserRouter>
    {/* <AppBar></AppBar> */}
      <Routes>
        <Route path="/signup" element={<Suspense fallback='loading...'><Signup></Signup></Suspense>}></Route>
        <Route path="/signin" element={<Suspense fallback='loading...'><Signin></Signin></Suspense>}></Route>
        <Route path="/dashboard" element={<Suspense fallback='loading...'><Dashboard></Dashboard></Suspense>}></Route>
        <Route path="/send" element={<Suspense fallback='loading...'><SendMoney></SendMoney></Suspense>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

// function AppBar(){
//   const navigate = useNavigate()
//   return <div>
//     <button onClick={()=>navigate('/signup')}>Signup</button>
//     <button onClick={()=>navigate('/signin')}>Signin</button>
//     <button onClick={()=>navigate('/dashboard')}>Dashboard</button>
//     <button onClick={()=>navigate('/send')}>Send</button>
//   </div>
// }


export default App
