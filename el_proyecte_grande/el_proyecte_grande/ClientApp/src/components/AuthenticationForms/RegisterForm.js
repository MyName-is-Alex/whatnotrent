import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Button, Col} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";
import authService from "../api-authorization/authenticationService";
import LogoutSuggestion from "./LogoutSuggestion";

const Register = () => {
    const [validationMessage, setValidationMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [userRegisteredSuccessfully, setUserRegisteredSuccessfully] = useState(false)
    
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
            const res = await authService.register(formData)
            if (res["isSuccess"]){
                setUserRegisteredSuccessfully(true)
            }
        } catch (exception) {
            setValidationMessage(exception.response.data)
        }
    }
    return authService.isAuthenticated() ? <LogoutSuggestion /> : userRegisteredSuccessfully ? renderRedirectMessage() :
        renderRegisterForm(uploadForm, validated, validationMessage);
}

const renderRedirectMessage = () => {
    return (
        <div>
            <h3>Congrats! You just created a new account.</h3>
            <Link replace={true} to={`/${ApplicationPaths.Login}`}>Now go on and log in!</Link>
        </div>
    )
}

const renderRegisterForm = (uploadForm, validated, validationMessage) => {
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
                    We may ask you to proove it later
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel as={Col} label={"Confirm Password: "}>
                <Form.Control
                    required
                    type="password"
                    placeholder="HaRd.Pas$word3"
                    name={"ConfirmPassword"}
                />
                <Form.Control.Feedback type={"invalid"}>
                    Everybody does mistakes.
                </Form.Control.Feedback>
            </FloatingLabel>
            <div className={"bg-danger text-white text-center"}>{validationMessage}</div>
            <Button type="submit" className={"bg-primary"}>
                Register
            </Button>
        </Form>
    )
}

export default Register;