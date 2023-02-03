import {useEffect, useState} from "react";
import authenticationService from "./authenticationService";
import Loading from "../Loading";
import Login from "../AuthenticationForms/LoginForm";
import {Navigate} from "react-router-dom";
import {ApplicationPaths} from "./ApiAuthorizationConstants";


const AuthorizeRoute = ({ element }) => {
    const [ready, setReady] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => {
        populateAuthorizationState(setReady, setAuthenticated)
    }, [])
    
    if (!ready) {
        return <Loading />
    }
    return authenticated ? element : <Navigate replace={true} to={`/${ApplicationPaths.Login}/true`} />
}

const populateAuthorizationState = (setReady, setAuthenticated) => {
    setAuthenticated(authenticationService.isAuthenticated())
    setReady(true)
}

export default AuthorizeRoute;