import { useEffect, useState } from "react";
import { check } from "../check";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
export const Home = () => {
    const navigate = useNavigate();
    const [obj,setObj]=useState<any>({
        _sum:{
            amount:"0"
        },
        _count:{
            id:2
        }
    });
    const getdel=async()=>{
        let res=await axios.get(`http://localhost:3000/api/expense/getstats`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        setObj(res.data);
    };
    useEffect(() => {
        check().then((res) => {
            if (!res) {
                navigate('/signin');
            }
        });
    }, []);
    useEffect(()=>{
        getdel();
    },[])
    return (
        <div className="md:h-screen">
            <div className="flex justify-center mt-2 mb-20 p-2 border-[1px] rounded">
                            <p className="font-sans font-bold text-[30px]">Calex</p>
                        </div>
            <div className="md:grid h-full md:grid-cols-12">
                <div className="col-span-6 flex justify-center">
                    <div>
                        
                        <div className="px-5 text-center mx-20 my-10 p-2 rounded cursor-pointer text-white bg-green-500 font-sans">
                            <p>Create </p>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-6  md:mt-0">
                    <div className="mt-8">
                        <Card obj={obj} />
                    </div>
                </div>
            </div>
        </div>

    )
}