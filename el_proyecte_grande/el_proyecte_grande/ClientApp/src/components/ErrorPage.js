import {Link} from "react-router-dom";


const ErrorPage = ({ redirectUrl, setBugFree }) => {
    
    return (
        <div>
            <p>Something went wrong.</p>
            <p>Clik <Link onClick={() => {setBugFree(true)}} replace={true} to={redirectUrl}>here</Link> to try again, if the problem persists, please contact our support team.</p>
        </div>
    )    
}

export default ErrorPage;