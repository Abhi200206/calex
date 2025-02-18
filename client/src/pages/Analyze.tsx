import { useEffect, useState, useRef } from "react";
import { Aster } from "../pages/Signin";
import ExpensePieChart from "../components/Chart";
import { check } from "../check";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Slidermonth } from "../components/Slider";
import { url } from "./Signin";

export const Analyze = () => {
    const [expenses, setExpenses] = useState([]);
    const [flag, setFlag] = useState(false);
    const [monexpenses, setMonexpenses] = useState([]);
    const [month, setMonth] = useState("Select Month");
    const [loading, setLoading] = useState<boolean>(false);
    const [year, setYear] = useState<any>();
    const [val, setVal] = useState<boolean>(true);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getData = async () => {
        setLoading(true);
        let res = await axios.get(`${url}/api/expense/getgroup`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        setExpenses(res.data.result);
        setLoading(false);
    };

    const getDatamonth = async () => {
        setVal(false);
        setLoading(true);
        const y = parseInt(year);
        const num = parseInt(month);
        let res = await axios.post(
            `${url}/api/expense/getmonthgroup`,
            {
                month: num - 1,
                year: y,
            },
            {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            }
        );
        setMonexpenses(res.data.result);
        setLoading(false);
    };

    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate("/signin");
            }
        });
    }, []);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setFlag(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col py-10">
            <div className="p-4">
                <button
                    onClick={() => navigate("/home")}
                    className="cursor-pointer px-4 py-2 border border-gray-700 rounded-lg bg-black text-white hover:bg-white hover:text-black transition duration-300 shadow-md"
                >
                    ← Back
                </button>
            </div>
            <div className="flex justify-center my-10">
                {loading ? <Loading /> : <ExpensePieChart groupedExpenses={val ? expenses : monexpenses} />}
            </div>

            <div className="flex justify-center items-center flex-col text-center">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Month and Year</h2>

                <div className="relative w-full max-w-xs" ref={dropdownRef}>
                    <div
                        onClick={() => setFlag(!flag)}
                        className="p-2 border border-gray-300 rounded-lg bg-white cursor-pointer text-gray-700 text-center hover:bg-gray-200"
                    >
                        {month}
                    </div>
                    {flag && (
                        <div className="absolute left-0 w-full bg-white shadow-lg border border-gray-300 rounded-lg p-2 mt-1 z-10">
                            <Slidermonth cb1={setFlag} cb={setMonth} />
                        </div>
                    )}
                </div>

                <div className="mt-3">
                    <Aster value="Year" />
                    <input
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                        placeholder="Enter Year"
                        className="p-2 border bg-white border-gray-300 rounded-lg text-center w-full max-w-xs"
                    />
                </div>

                <button
                    onClick={getDatamonth}
                    className="cursor-pointer mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-gray-700 transition duration-300 shadow-md"
                >
                    GET
                </button>
            </div>
        </div>
    );
};
