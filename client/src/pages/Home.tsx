import { useEffect, useState } from "react";
import { check } from "../check";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Expense } from "../components/Expense";
import { Loading } from "../components/Loading";
export const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [obj, setObj] = useState<any>({
        _sum: {
            amount: "0"
        },
        _count: {
            id: 0
        }
    });
    const [monobj, setMonobj] = useState<any>({
        _sum: {
            amount: "0"
        },
        _count: {
            id: 0
        }
    });
    const [latestobj, setLatestobj] = useState<any>({});
    const getdel = async () => {
        let res = await axios.get(`http://localhost:3000/api/expense/getstats`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setObj(res.data);
    };
    const getMonth = async () => {
        const date = new Date();
        const month = date.getMonth();

        const year = date.getFullYear();
        let res = await axios.post(`http://localhost:3000/api/expense/getstatslatest`, {
            month,
            year
        }, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setMonobj(res.data);
    }
    const getlatDet = async () => {
        let res = await axios.get(`http://localhost:3000/api/expense/getlatest`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setLatestobj(res.data.result);
    }
    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate('/signin');
            }
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
    }, [])
    if (loading) {
        return (
            <div className="flex justify-center h-screen items-center">
                <Loading />
            </div>
        )
    }
    return (
        <div className="">
            <div className="text-center font-sans bg-gradient-to-br from-purple-500 via-orange-200 py-2 to-pink-500">
                <div className="flex justify-between mx-4">
                    <div><p className="font-sans font-bold text-[30px]">Calex</p></div>
                    <div className="rounded p-2 cursor-pointer border-[1px] bg-black text-white hover:bg-white hover:text-black " onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/signin');
                    }}><p>Logout</p></div>
                </div>
            </div>
            <div className="md:grid h-full md:grid-cols-12 mb-18">
                <div className="col-span-6 flex justify-center">
                    <div>

                        <div onClick={() => {
                            navigate('/create');
                        }} className="px-5 hover:bg-green-800 text-center mx-20 my-10 p-2 rounded cursor-pointer text-white bg-green-500 font-sans">
                            <p>Create </p>
                        </div>
                        <div>
                            <p className="my-2 font-black font-sans">Last Transaction:</p>
                            <Expense obj={latestobj} />
                        </div>
                    </div>
                </div>
                <div className="md:col-span-6  md:mt-0">
                    <div className="mt-8">
                        <div className="ml-4 my-2 font-sans font-black">
                            <p>Life Time Transactions:</p>
                        </div>
                        <Card obj={obj} />
                        <div className="ml-4 my-2 font-sans font-black">
                            <p>This Month Transactions:</p>
                        </div>
                        <Card obj={monobj} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-8">

                <div className="flex gap-4">
                    <div onClick={() => {
                        navigate('/view')
                    }} className="rounded hover:border-[1px] p-2 bg-black text-white hover:text-black hover:bg-white cursor-pointer">View Transactions
                    </div>
                    <div onClick={() => {
                        navigate('/analyze')
                    }} className="rounded hover:border-[1px] p-2 bg-black text-white hover:text-black hover:bg-white cursor-pointer">{"Analyze ->"}
                    </div>
                </div>
            </div>
        </div>

    )
}