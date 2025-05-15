import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import { useSearchParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const [amount,setAmount] = useState(0)
    return <div className="bg-neutral-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-neutral-50 w-80 rounded-lg text-center p-2 h-max px-4">
                <Heading label={'Send Money'}></Heading>
                <br />
                <br />
                <div className="text-left font-medium text-xl">{name}</div>
                <br />
                <InputBox onChange={(e)=>{
                    setAmount(Number(e.target.value))
                }} placeholder={'Enter Amount'} label={'Amount (in Rs)'}></InputBox>
                <button onClick={()=>{
                    axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount :amount
                    },{
                        headers:{
                            Authorization:'Bearer '+localStorage.getItem('token')
                        }
                    })
                }} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full my-4">Initiate Transfer</button>
            </div>
        </div>
    </div>
}

export default SendMoney