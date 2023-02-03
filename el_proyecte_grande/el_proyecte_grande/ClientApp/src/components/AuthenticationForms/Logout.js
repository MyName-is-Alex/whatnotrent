import {Navigate} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";
import authService from "../api-authorization/authenticationService";
import {useEffect} from "react";

const Logout = ({ onChangeAuthenticated }) => {
    authService.logout()
    useEffect(() => {
        onChangeAuthenticated(false)
    }, [])
    return (
        <Navigate replace={true} to={`/${ApplicationPaths.Login}/false`} />
    )    
}

export default Logout;