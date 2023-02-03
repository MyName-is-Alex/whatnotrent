import {useState} from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {Button, Col} from "reactstrap";
import authService from "../api-authorization/authenticationService";
import {Navigate, useParams} from "react-router-dom";

const Login = ({ onChangeAuthenticated }) => {
    const { isRedirected } = useParams();
    const redirectMessage = isRedirected === "true" ? "You need an account to perform this action" : "";
    const [validated, setValidated] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [userLoggedInSuccessfully, setUserLoggedInSuccessfully] = useState(false)

    const uploadForm = async (e) => {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return
        }

        e.preventDefault();
        setValidated(true);
        const formData = new FormData();

        for (let i = 0; i < e.target.length-1; i++) {
            formData.append(e.target[i].name, e.target[i].value)
        }
        try {
            const res = await authService.login(formData)
            if (res["isSuccess"]) {
                setUserLoggedInSuccessfully(true);
                onChangeAuthenticated(true)
            } else {
                setValidationMessage("Username or password is incorrect.")
            }
        }
        catch (exception) {
            setValidationMessage("Username or password is incorrect.")
        }
    }
    
    return  !userLoggedInSuccessfully ? renderLoginForm(uploadForm, validated, validationMessage, redirectMessage) : redirectToHomePage()
}

const redirectToHomePage = () => {
    return <Navigate replace={true} to={"/"}/>
}

const renderLoginForm = (uploadForm, validated, validationMessage, redirectMessage) => {
    return (
        <Form encType={"multipart/form-data"} onSubmit={uploadForm} noValidate validated={validated}>
            <FloatingLabel as={Col} label={"Email: "}>
                <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    name={"Email"}
                />
                <Form.Control.Feedback type={"invalid"}>
                    Let us know who you are.
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel as={Col} label={"Password: "}>
                <Form.Control
                    required
                    type="password"
                    placeholder="HaRd.Pas$word3"
                    name={"Password"}
                />
                <Form.Control.Feedback type={"invalid"}>
                    Proove it!
                </Form.Control.Feedback>
            </FloatingLabel>
            <div className={"bg-danger text-white text-center"}>{validationMessage}</div>
            <Button type="submit" className={"bg-primary"}>
                Login
            </Button>
            {redirectMessage ? <p>{redirectMessage}</p> : <p></p>}
        </Form>
    )
}

export default Login;