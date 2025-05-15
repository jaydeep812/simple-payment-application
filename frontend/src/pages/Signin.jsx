import Heading from "../components/Heading"
import Subheading from "../components/Subheading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signin(){
    const [username,setUserName] = useState('')
    const [password,setPassword] =useState('')
    const navigate = useNavigate()
     return <div className="bg-neutral-500 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="bg-neutral-50 w-80 rounded-lg text-center p-2 h-max px-4">
              <Heading label={"Sign In"}></Heading>
              <Subheading label={"Enter your credentials to access your account"}></Subheading>
              <InputBox onChange={(e)=>{
                setUserName(e.target.value)
              }} label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
              <InputBox onChange={e=>{
                setPassword(e.target.value)
              }} label={"Password"} placeholder={""}></InputBox>              
              <Button onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                  username,
                  password
                })
                localStorage.setItem("token",response.data.token)
                navigate('/dashboard')
              }} label={'Sign In'}></Button>

              <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
              </div>
            </div>
        </div>
}

export default Signin