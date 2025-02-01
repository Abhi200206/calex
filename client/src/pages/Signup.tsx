import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"   
import { check } from "../check"
import { Loading } from "../components/Loading"
export const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
     useEffect(() => {
                check().then((res) => {
                    if (res) {
                        navigate('/home');
                    }
                });
            }, []);
    const submit = async () => {
        setLoading(true);
        try {
            const data = await axios.post(`http://localhost:3000/api/user/signup`, {
                email,
                password,
                name
            });
            if (data.data.result) {
                localStorage.setItem('token', data.data.token);
                alert('signup successfull');
                setLoading(false);
                navigate('/home');
            }
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            setPassword("");
            alert("incorrect input types or invalid data provided");
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div >
                <div className="border-[1px] p-2 rounded ">
                    <p className="text-center my-2 text-2xl font-bold">Signup</p>
                    <Aster value="Email" />
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full p-1 border-[1px] border-black rounded my-1" type="text" placeholder="enter email" />
                    <Aster value="Password" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full p-1 border-[1px] border-black rounded  my-1" type="password" placeholder="enter password" />
                    <Aster value="Name" />
                    <input onChange={(e) => setName(e.target.value)} className="w-full p-1 border-[1px] border-black rounded  my-1" type="text" placeholder="enter name" />
                    <div onClick={submit} className="rounded bg-black text-white text-center p-1 cursor-pointer my-2 hover:bg-slate-500">
                        {loading ? <Loading /> : <p>signup</p>}
                    </div>
                    <div className="flex gap-1"><p className="text-slate-700">Already have an account?</p> <p onClick={() => navigate('/signin')} className="underline cursor-pointer">Signin</p></div>

                </div>
            </div>
        </div>
    )
}

function Aster({ value }: { value: string }) {
    return (
        <div className="flex">
            <div> <p className="text-sm my-1">{value}: </p></div>
            <div><p className="text-red-500">*</p> </div>
        </div>
    )
}