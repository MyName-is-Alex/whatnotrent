import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";


const AddedProductMessage = () => {
    return (
        <Card className="text-center mt-5">
            <Card.Header>Congrats!</Card.Header>
            <Card.Body>
                <Card.Title>Your posted a new article.</Card.Title>
                <Card.Text>
                    Your job is done now, we're sending some customers on your way ;).<br />
                    If you encounter any problems please contact us at "<Link to={"#"}>support@email.com"</Link>
                </Card.Text>
                <Link
                    replace={true}
                    to={`/`}
                    className={"p-2 bg-primary text-light rounded text-decoration-none fw-bold"}
                >
                    Go to Home Page
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted">right now</Card.Footer>
        </Card>
    )    
}

export default AddedProductMessage;