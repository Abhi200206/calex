import { Aster, url } from "./Signin";
import { check } from "../check";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "../components/Slider";

export const Create = () => {
    const [amount, setAmount] = useState<any>(0);
    const [To, setTo] = useState("");
    const [label, setLabel] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate("/signin");
            }
        });
    }, []);

    const send = async () => {
        try {
            let amt = parseFloat(amount);
            let res = await axios.post(
                `${url}/api/expense/addexpense`,
                { amount: amt, To, label },
                {
                    headers: { authorization: localStorage.getItem("token") },
                }
            );
            if (res.data) {
                alert("Expense added successfully!!");
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
           
            <div className="p-4">
                <button
                    onClick={() => navigate("/home")}
                    className="px-4 cursor-pointer py-2 border border-gray-700 rounded-lg bg-black text-white hover:bg-white hover:text-black transition duration-300 shadow-md"
                >
                    ← Back
                </button>
            </div>

            <div className="flex justify-center items-center flex-grow">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-300">
                    <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
                        Add New Expense
                    </h2>

                    <Aster value="Amount" />
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="number"
                        placeholder="Enter Amount"
                    />

                    <Aster value="Label" />
                    <div
                        onClick={() => setFlag(true)}
                        className="my-2 cursor-pointer"
                    >
                        <input
                            className="w-full p-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none"
                            value={label}
                            readOnly
                        />
                        <p className="text-blue-500 text-sm text-right">
                            Select Label
                        </p>
                    </div>
                    {flag && <Slider cb1={setFlag} cb={setLabel} />}

                    <p className="my-2 font-medium">To:</p>
                    <input
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter recipient name"
                    />

                    <button
                        onClick={send}
                        className="cursor-pointer w-full text-center p-2 mt-4 rounded-lg bg-black text-white hover:text-black hover:bg-white transition duration-300 border border-gray-700 shadow-md"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};
