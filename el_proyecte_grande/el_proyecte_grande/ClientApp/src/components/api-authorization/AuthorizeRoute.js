import {useEffect, useState} from "react";
import authenticationService from "./authenticationService";
import Loading from "../Loading";
import Login from "../AuthenticationForms/LoginForm";


const AuthorizeRoute = ({ element }) => {
    const [ready, setReady] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    useEffect(() => {
        populateAuthorizationState(setReady, setAuthenticated)
    }, [])
    
    if (!ready) {
        return <Loading />
    }
    return authenticated ? element : <Login redirectMessage={"You need to be logged in to access this page."} />
}

const populateAuthorizationState = (setReady, setAuthenticated) => {
    setAuthenticated(authenticationService.isAuthenticated())
    setReady(true)
}

export default AuthorizeRoute;