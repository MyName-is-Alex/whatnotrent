import axios from "axios";
import jwt from 'jwt-decode'

const API_URL = "api/auth"

const register = (formData) => {
    return axios
        .post(API_URL + "/register", formData)
        .then((response) => {
            return response.data;
        });
}

const login = (formData) => {
    return axios
        .post(API_URL + "/login", formData)
        .then((response) => {
            if (response.data["isSuccess"]) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    if (user)
        return jwt(JSON.parse(localStorage.getItem("user"))["message"]);
    else 
        return "";
}

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user !== null) {
        if (Date.parse(user["expireDate"]) < Date.now()) {
            localStorage.removeItem("user");
        }
    }
    return user !== null;
}

const getAccessToken = () => {
    const accessToken = localStorage.getItem("user")
    return JSON.parse(accessToken)["message"];
}

const authService = {
    register,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    getAccessToken
};

export default authService;