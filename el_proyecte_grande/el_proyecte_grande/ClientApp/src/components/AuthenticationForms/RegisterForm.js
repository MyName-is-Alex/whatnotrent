import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Button, Col} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";
import authService from "../api-authorization/authenticationService";
import LogoutSuggestion from "./LogoutSuggestion";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import {Image} from "react-bootstrap";

const Register = () => {
    const [validationMessage, setValidationMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [userRegisteredSuccessfully, setUserRegisteredSuccessfully] = useState(false)
    
    const uploadForm = async (e) => {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
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
        <Card className="text-center mt-5">
            <Card.Header>Congrats!</Card.Header>
            <Card.Body>
                <Card.Title>You created new account</Card.Title>
                <Card.Text>
                    Use your new powers wisley, respect others and you will be respected<br />
                    and dont't break the <Link to={"#"}>comunity rules</Link>
                </Card.Text>
                <Link
                    replace={true}
                    to={`/${ApplicationPaths.Login}/false`}
                    className={"p-2 bg-primary text-light rounded text-decoration-none fw-bold"}
                >
                    Go to Login
                </Link>
            </Card.Body>
            <Card.Footer className="text-muted">right now</Card.Footer>
        </Card>
    )
}

const renderRegisterForm = (uploadForm, validated, validationMessage) => {
    return (
        <div>
            <h2 className={"fw-bold text-center mt-5 mb-3"}>Registration Form</h2>
            <Form 
                encType={"multipart/form-data"} 
                onSubmit={uploadForm} 
                noValidate 
                validated={validated}
                className={"w-50 m-auto position-relative"}
            >
                <Image
                    src={"/register-img.png"}
                    style={{ position: "absolute", width: "45vw", top: "72%", 
                        zIndex: "-10", right: "-47%" }}
                />
                <Row className={"mb-3"}>
                    <Col className={"col-12 col-sm-6"}>
                        <FloatingLabel label={"Email: "}>
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
                    </Col>
                    <Col className={"col-12 col-sm-6"}>
                        <FloatingLabel label={"User Name: "}>
                            <Form.Control
                                required
                                type="test"
                                placeholder="example name"
                                name={"UserName"}
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                Please insert the series of sounds that captivates your atention.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <FloatingLabel label={"Phone Number: "}>
                            <Form.Control
                                required
                                type="number"
                                placeholder="0245215464"
                                name={"PhoneNumber"}
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                - Ring Ring! / - Who's there? / - Not your phone number...
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mb-2"}>
                    <Col className={"col-12 col-sm-6"}>
                        <FloatingLabel label={"Password: "}>
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
                    </Col>
                    <Col className={"col-12 col-sm-6"}>
                        <FloatingLabel label={"Confirm Password: "}>
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
                    </Col>
                </Row>
                <div className={"text-danger text-center rounded p-1 mb-2 fw-bold"}>{validationMessage}</div>
                <div className={"text-center"}>
                    <Button type="submit" className={"bg-primary w-75"}>
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Register;