import Heading from "../components/Heading"
import Subheading from "../components/Subheading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
 
function Signup(){
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  return <div className="bg-neutral-500 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="bg-neutral-50 w-80 rounded-lg text-center p-2 h-max px-4">
              <Heading label={"Sign Up"}></Heading>
              <Subheading label={"Enter your information to create an account"}></Subheading>
              <InputBox onChange={(e)=>{
                setFirstName(e.target.value)
              }} label={"First Name"} placeholder={"John"}></InputBox>
              <InputBox onChange={(e)=>{
                setLastName(e.target.value)
              }} label={"Last Name"} placeholder={"Doe"}></InputBox>
              <InputBox onChange={(e)=>{
                setUserName(e.target.value)
              }} label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
              <InputBox onChange={(e)=>{
                setPassword(e.target.value)
              }} label={"Password"} placeholder={""}></InputBox>              
              <Button onClick={async()=>{
                const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                  username,
                  firstName,
                  lastName,
                  password
                },{
                  headers:{
                    'Content-Type':'application/json'
                  }
                });
                localStorage.setItem("token",response.data.token)
                navigate('/dashboard')
              }} label={'Sign Up'}></Button>
              <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
              </div>
            </div>
        </div>
}

export default Signup