import { Aster } from "./Signin"
import { check } from "../check"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Slider } from "../components/Slider"
export const Create = () => {
    const [amount, setAmount] = useState<any>(0);
    const [To, setTo] = useState("");
    const [label, setLabel] = useState("");
    const [flag, setFalg] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate('/signin');
            }
        });
    }, []);
    const send = async () => {
        try {
            let amt = parseFloat(amount);
            let res = await axios.post(`http://localhost:3000/api/expense/addexpense`, {
                amount: amt,
                To,
                label
            }, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });
            if (res.data) {
                alert('expense added successfully!!');
                navigate('/home');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className="flex justify-items-start ml-4 my-2">
                <div onClick={() => {
                    navigate('/home');
                }} className="font-sans text rounded border-[1px] cursor-pointer text-white bg-black hover:bg-white hover:text-black p-2">back</div>
            </div>

            <div className="flex justify-center items-center h-screen">
                <div className="rounded  p-4 border-[1px]">
                    <Aster value="Amount" />
                    <input onChange={(e: any) => setAmount(e.target.value)} className="p-2 rounded border-[1px]" type="number" placeholder="enter Amount" />
                    <Aster value="Label" />
                    <div onClick={() => {
                        setFalg(true);
                    }} className="my-1">
                        <input className="p-2 rounded border-[1px]" value={label} />
                        <p className="text-slate-500 cursor-pointer">select</p>
                    </div>
                    {flag && <Slider cb1={setFalg} cb={setLabel} />}
                    <p className="my-1">To: </p>
                    <input onChange={(e: any) => setTo(e.target.value)} className="p-2 rounded border-[1px]" type="text" placeholder="enter to name" />
                    <div onClick={send} className="text-center p-2 cursor-pointer rounded bg-black text-white hover:text-black hover:bg-white my-4 border-[1px]">
                        <p>Add</p>
                    </div>
                </div>
            </div>
        </div>
    )
}