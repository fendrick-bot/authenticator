import axios from "axios";

export async function checkLogin() {
    const response = await axios.get("/api/me");
    const data = response.data;
    if (data) return data.user;
    else return "none"
}
