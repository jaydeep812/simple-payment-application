import Button from "./Button"
import { useNavigate } from "react-router-dom"

export default function User({user}){
    const navigate = useNavigate()
    return <div className="flex justify-between p-3">
                <div className="flex-start font-medium text-2xl">{user.firstName}</div>
                <div className="flex-end"><Button onClick={(e)=>{
                    navigate(`/send?id=${user._id}&name=${user.firstName}`)
                }} label={"Send Money"}></Button></div>
            </div>
}