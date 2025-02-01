import { useEffect, useState } from "react"
import axios from "axios";
import { check } from "../check";
import { Expense } from "../components/Expense";
import { useNavigate } from "react-router-dom";
export const View = () => {
    const navigate = useNavigate();
    const [arr, setArr] = useState<any[]>([]);
    const get = async () => {
        let res = await axios.get(`http://localhost:3000/api/expense/getexpenses`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setArr(res.data.result);
    }
    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate('/signin');
            }
        });
    }, []);
    useEffect(() => {
        get();
    }, [])
    return (
        <div>
            <div className="flex justify-items-start ml-4 my-2">
                <div onClick={() => {
                    navigate('/home');
                }} className="font-sans text rounded border-[1px] cursor-pointer text-white bg-black hover:bg-white hover:text-black p-2">back</div>
            </div>
            <div className="my-4">
                {arr.map((m) => {
                    return <Expense obj={m} />
                })}
            </div>
        </div >
    )
}