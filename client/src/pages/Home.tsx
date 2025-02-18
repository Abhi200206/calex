import { useEffect, useState } from "react";
import { check } from "../check";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Expense } from "../components/Expense";
import { Loading } from "../components/Loading";
import { url } from "./Signin";

export const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [obj, setObj] = useState<any>({
        _sum: { amount: "0" },
        _count: { id: 0 }
    });
    const [monobj, setMonobj] = useState<any>({
        _sum: { amount: "0" },
        _count: { id: 0 }
    });
    const [latestobj, setLatestobj] = useState<any>({});

    const getdel = async () => {
        let res = await axios.get(`${url}/api/expense/getstats`, {
            headers: { "authorization": localStorage.getItem("token") }
        });
        setObj(res.data);
    };

    const getMonth = async () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        let res = await axios.post(`${url}/api/expense/getstatslatest`, { month, year }, {
            headers: { "authorization": localStorage.getItem("token") }
        });
        setMonobj(res.data);
    };

    const getlatDet = async () => {
        let res = await axios.get(`${url}/api/expense/getlatest`, {
            headers: { "authorization": localStorage.getItem("token") }
        });
        setLatestobj(res.data.result);
    };

    useEffect(() => {
        check().then((res) => {
            if (!res) navigate('/signin');
        });
    }, []);

    async function call() {
        await getdel();
        await getlatDet();
        await getMonth();
        setLoading(false);
    }

    useEffect(() => {
        call();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-100 pb-10">
            {/* Header */}
            <div className="text-center font-sans bg-gradient-to-br from-purple-500 via-orange-200 to-pink-500 py-4">
                <div className="flex justify-between mx-6 items-center">
                    <p className="text-3xl font-bold text-white">Calex</p>
                    <button 
                        className="cursor-pointer rounded-md px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition duration-300" 
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/signin');
                        }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:grid md:grid-cols-12 gap-8 p-6">
                {/* Left Section */}
                <div className="md:col-span-6 flex flex-col items-center">
                    <button 
                        onClick={() => navigate('/create')} 
                        className="w-3/4 cursor-pointer max-w-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 mb-6">
                        Create Transaction
                    </button>

                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
                        <p className="text-lg font-bold text-gray-700 mb-2">Last Transaction:</p>
                        {latestobj ? <Expense obj={latestobj} /> : <p className="text-gray-500">NA</p>}
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:col-span-6">
                    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                        <p className="text-lg font-bold text-gray-700 mb-2">Lifetime Transactions:</p>
                        <Card obj={obj} />
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-lg font-bold text-gray-700 mb-2">This Month Transactions:</p>
                        <Card obj={monobj} />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
                <button 
                    onClick={() => navigate('/view')} 
                    className="cursor-pointer px-6 py-2 bg-black text-white rounded-lg border border-transparent hover:border-black hover:bg-white hover:text-black transition duration-300">
                    View Transactions
                </button>

                <button 
                    onClick={() => navigate('/analyze')} 
                    className="cursor-pointer px-6 py-2 bg-black text-white rounded-lg border border-transparent hover:border-black hover:bg-white hover:text-black transition duration-300 flex items-center space-x-2">
                    <span>Analyze</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
