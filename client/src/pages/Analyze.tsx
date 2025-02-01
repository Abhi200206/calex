import { useEffect, useState } from "react"
import ExpensePieChart from "../components/Chart"
import { check } from "../check"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/Loading";
import { Slidermonth } from "../components/Slider"
export const Analyze = () => {
    const [expenses, setExpenses] = useState([]);
    const [flag, setFalg] = useState(false);
    const [monexpenses, setMonexpenses] = useState([]);
    const [month, setMonth] = useState("enter month");
    const [loading, setLoading] = useState<boolean>(false);
    const [year, setYear] = useState<any>();
    const [val, setVal] = useState<boolean>(true);
    const navigate = useNavigate();
    const getData = async () => {
        let res = await axios.get(`http://localhost:3000/api/expense/getgroup`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setExpenses(res.data.result);
    }
    const getDatamonth = async () => {
        setVal(false);
        setLoading(true);
        const y = parseInt(year);
        let res = await axios.post(`http://localhost:3000/api/expense/getmonthgroup`, {
            month: month - 1,
            year: y
        }, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setMonexpenses(res.data.result);
        setLoading(false);
    }
    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate('/signin');
            }
        });
    }, []);
    useEffect(() => {
        getData();
    }, []);
    return (
        <div >
            <div className="flex justify-items-start ml-4 my-2">
                <div onClick={() => {
                    navigate('/home');
                }} className="font-sans text rounded border-[1px] cursor-pointer text-white bg-black hover:bg-white hover:text-black p-2">back</div>
            </div>
            <div className="flex justify-center my-10">
                {loading ? <Loading /> : <ExpensePieChart groupedExpenses={val ? expenses : monexpenses} />}
            </div>
            <div className="text-center ">
                <p>select below month and year to get data</p>
                <p></p>
                <div className="">
                    <div onClick={() => {
                        setFalg(true);
                    }} className="my-1">
                        <div>
                            <input className="p-2 rounded border-[1px]" value={month} />
                            <p className="text-slate-500 cursor-pointer">select</p>
                        </div>

                    </div>
                    {flag && <Slidermonth cb1={setFalg} cb={setMonth} />}
                    <input className="m-2 border-[1px] p-2 rounded" onChange={(e: {
                        target: {
                            value: any
                        }
                    }) => setYear(e.target.value)} type="number" placeholder="year" />
                    <div onClick={getDatamonth} className="m-2 border-[1px] p-2 rounded cursor-pointer bg-black text-white hover:bg-white hover:text-black" ><p>GET</p></div>
                </div>
            </div>
        </div>
    )
}