import axios from "axios";

export async function checkLogin(){
    const response = await axios.get("/api/me");
    const data = response.data;
    console.log(data);
    if( data) return data.user.username;
    else return "none";
}