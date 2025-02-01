import axios from "axios";
import { url } from "./pages/Signin";
export const check = async () => {
    try{
        await axios.get(`${url}/api/user/me`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        });
        return true;
    }
    catch(err)
    {
        return false;
    }
}