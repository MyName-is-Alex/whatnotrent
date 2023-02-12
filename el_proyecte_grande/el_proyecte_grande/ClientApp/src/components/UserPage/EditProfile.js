import userStore from "../../stores/UserStore";
import {useEffect, useRef, useState} from "react";
import Loading from "../Loading";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button, FormControl} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {ApplicationPaths} from "../api-authorization/ApiAuthorizationConstants";
import axios from "axios";
import authHeader from "../api-authorization/authHeader";
import ErrorPage from "../ErrorPage";
import {User} from "oidc-client";

const EditProfile = () => {
    const [isCompleted, setIsCompleted] = useState(false)
    const [bugFree, setBugFree] = useState(true)
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState();
    
    const imageContainer = useRef()
    const imageUrlPrefix = "UsersImages";

    const [file, setFile] = useState()
    const [formState, setFormState] = useState({
        UserName: "",
        Email: "",
        PhoneNumber: ""
    })
   
    useEffect(() => {
        userStore.fetchUserInfo().then((data) => {
            setUserInfo(data);
            setFormState({
                UserName: data["userName"],
                Email: data["email"],
                PhoneNumber: data["phoneNumber"]
            })
            setIsLoading(false)
        })
    }, [])

    const uploadForm = async (e) => {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return
        }
        setValidated(true);
        e.preventDefault();
        const formData = new FormData();

        for (let element in formState) {
            formData.append(element, formState[element])
        }
        
        if (file)
            formData.append(`Image`, file, file["name"])
        
        await axios
            .post("api/auth/update", formData, authHeader())
            .then(() => {
                setIsCompleted(true)
            })
            .catch((error) => {
                setBugFree(false)
                console.log(error)
            })
    };

    if (!bugFree) {
        return <ErrorPage redirectUrl={"/profile"} setBugFree={setBugFree} />
    }
    if (isCompleted) {
        return <Navigate replace to={"/profile"} />
    }
    
    return (
        isLoading ? <Loading /> : renderEditProfile(userInfo["email"], userInfo["userName"], 
            userInfo["phoneNumber"], imageContainer, userInfo["photoUrl"], imageUrlPrefix, 
            userInfo["userId"], file, setFile, setFormState, formState, uploadForm, validated)
    )
}

function renderEditProfile(email, userName, phoneNumber, imageContainer, actualImageUrl, imageUrlPrefix, userId, 
                           file, setFile, setFormState, formState, uploadForm, validated) {
    return (
        <Form encType={"multipart/form-data"}
              onSubmit={uploadForm}
              noValidate
              validated={validated}>
            <FloatingLabel 
                label={"Email address"} 
                controlId ={"floatingInput"}
            >
                <FormControl 
                    type={"email"}
                    placeholder={"name@example.com"}
                    required
                    defaultValue={email}
                    onChange={(e) => {
                        setFormState(() => ({
                            ...formState,
                            ...{Email: e.target.value}
                        }))
                    }}
                />
            </FloatingLabel>
            <FloatingLabel
                label={"User Name"}
                controlId={"floatingInput"}
            >
                <FormControl
                    type={"text"}
                    placeholder={"mituetare"}
                    defaultValue={userName}
                    onChange={(e) => {
                        setFormState(() => ({
                            ...formState,
                            ...{UserName: e.target.value}
                        }))
                    }}
                />
            </FloatingLabel>
            <FloatingLabel
                label={"Phone Number"}
                controlId={"floatingInput"}
            >
                <FormControl
                    type={"number"}
                    pattern={""}
                    placeholder={"mituetare"}
                    defaultValue={phoneNumber}
                    onChange={(e) => {
                        setFormState(() => ({
                            ...formState,
                            ...{PhoneNumber: e.target.value}
                        }))
                    }}
                />
            </FloatingLabel>
            <div className={"mb-3 w-25"}>
                <Form.Group>
                    <div
                        className={"position-relative"}
                        style={{
                            width: "100%",
                            aspectRatio: "1/0.8",
                            boxShadow: "5px 3px 15px rgba(0, 0, 0, 0.3)",
                            marginBottom: "5px",
                            borderRadius: "5px"
                        }}>
                        <div
                            className={"position-absolute top-50 start-50 translate-middle"}
                        >
                            Add image
                        </div>
                        <img
                            src={`/${imageUrlPrefix}/${userId}/${actualImageUrl}`}
                            alt={""}
                            ref={el => imageContainer.current = el}
                            style={{width: "100%", marginBottom: "7px"}}
                        />
                    </div>
                    <Form.Control
                        type={"file"}
                        onChange={(e) => {
                            onInputChange(e, imageContainer);
                            saveFile(e, file, setFile);
                        }}
                        accept="image/*"
                        aria-required={true}
                    >
                    </Form.Control>

                    <Form.Control.Feedback type={"invalid"}>
                        At least one image, no di*k pics!!!
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
            <Form.Group className={"text-center mt-3"}>
                <Button
                    className={"mx-1"}
                    type={"submit"}
                >
                    Save Changes
                </Button>
                <Button
                    as={Link}
                    className={"mx-1"}
                    variant={"danger"}
                    type={"button"}
                    replace
                    to={`/${ApplicationPaths.Profile}`}
                >
                    Go back
                </Button>
            </Form.Group>
        </Form>
    )
}

function onInputChange(event, imageContainer) {
    event.target.previousElementSibling.firstChild.nextSibling.src = URL.createObjectURL(event.target.files[0]);
    event.target.previousElementSibling.firstChild.style.display = "none"

    const fileReader = new FileReader()
    fileReader.onload = () => {
        URL.revokeObjectURL(imageContainer.current)
    }
}
const saveFile = (e, file, setFile) => {
    setFile(e.target.files[0]);
};

export default EditProfile;