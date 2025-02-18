import { useEffect, useState } from "react";
import axios from "axios";
import { check } from "../check";
import { Expense } from "../components/Expense";
import { useNavigate } from "react-router-dom";
import { url } from "./Signin";

export const View = () => {
    const navigate = useNavigate();
    const [arr, setArr] = useState<any[]>([]);

    const get = async () => {
        let res = await axios.get(`${url}/api/expense/getexpenses`, {
            headers: {
                "authorization": localStorage.getItem("token"),
            },
        });
        setArr(res.data.result);
    };

    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate("/signin");
            }
        });
    }, []);

    useEffect(() => {
        get();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            
            <div className="flex items-center  p-4">
                <button
                    onClick={() => navigate("/home")}
                    className="cursor-pointer px-4 py-2 border border-gray-700 rounded-lg bg-black text-white hover:bg-white hover:text-black transition duration-300 shadow-md"
                >
                    ← Back
                </button>
            </div>

            <div className="flex justify-center mt-4">
                <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
                        Your Transactions
                    </h2>
                    <div className="space-y-4">
                        {arr.length > 0 ? (
                            arr.map((m, index) => <Expense key={index} obj={m} />)
                        ) : (
                            <p className="text-center text-gray-500">No transactions found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
