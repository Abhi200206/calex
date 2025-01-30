import axios from "axios";
export const check = async () => {
    try{
        await axios.get(`http://localhost:3000/api/user/me`, {
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