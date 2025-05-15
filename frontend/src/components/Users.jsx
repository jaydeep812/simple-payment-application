import InputBox from "./InputBox"
import User from "./User";
import { useEffect, useState } from "react"
import axios from "axios";

export default function Users(){
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(response=>{
            setUsers(response.data.user)
        })
    },[filter])
    return <div>
                <div className="font-medium text-2xl pt-10">
                    Users
                </div>
                <InputBox onChange={(e)=>{
                    setFilter(e.target.value)
                }} placeholder={"Search Users..."}></InputBox>
                <div>
                    {users.map(user=><User user={user} />)}
                </div>
            </div>
}