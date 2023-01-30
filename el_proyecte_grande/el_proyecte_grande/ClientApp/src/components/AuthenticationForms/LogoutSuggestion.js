import {Link} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";

const LogoutSuggestion = () => {
    return (
        <div>
            <h3>You're allready logged in.</h3>
            <Link replace={true} to={`/${ApplicationPaths.Logout}`}>Please logout before creating a new account!</Link>
        </div>
    )
}

export default LogoutSuggestion;