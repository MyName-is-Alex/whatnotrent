import axios from "axios";
import authHeader from "../components/api-authorization/authHeader";

const fetchUserInfo = async () => {
    const response = await axios.get("api/auth/user-info", authHeader())
    return response["data"]
}

const userStore = {
    fetchUserInfo
}

export default userStore;