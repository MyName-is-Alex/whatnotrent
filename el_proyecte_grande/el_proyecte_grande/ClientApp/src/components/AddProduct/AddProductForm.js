import {FloatingLabel, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import axios from "axios";
import FormImages from "./FormImages";
import authHeader from "../api-authorization/authHeader";
//TODO Add loading screen
//TODO Add redirect to message after posting

const AddProductForm = ({ setIsCompleted, setBugFree }) => {
    // get form template from backend START
    const [formCategories, setFormCategories] = useState([]);
    const [formTimeUnits, setFormTimeUnits] = useState([]);
    useEffect(() => {
        populateForm().then((data) => {
            setFormCategories(data['categories'])
            setFormTimeUnits(data['timeUnits'])
        })
    },[])
    // get form template from backend END
    
    const [validated, setValidated] = useState(false);
    
    const [formState, setFormState] = useState(
        {
            Name: null,
            Description: null,
            Price: null,
            Unit: 0,
            StartDate: null,
            EndDate: null,
            Category: 1,
            Location: null
        })
    const [files, setFiles] = useState({})
    
    const uploadForm = async (e) => {
        if (e.currentTarget.checkValidity() === false || Object.keys(files).length < 1) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return
        }
        setValidated(true);
        e.preventDefault();
        const formData = new FormData();
        
        for (let element in formState) {
            if (element === "Category") {
                formData.append(`${element}Id`, formState[element])
            } else {
                formData.append(element, formState[element])
            }
        }
        
        for (const file in files) {
            formData.append(`Images`, files[file], files[file].name)
        }
        
        await axios
            .post("api/product/add-product", formData, authHeader())
            .then(() => {
                setIsCompleted(true)
            })
            .catch((error) => {
                setBugFree(false)
                console.log(error)
            }) //TODO token
    };
    
    return (
        <div>
            <h1 className={"mb-3 mt-5 text-center"}>Add product</h1>
            <Form 
                encType={"multipart/form-data"} 
                onSubmit={uploadForm} 
                noValidate 
                validated={validated}
                className={"w-50 m-auto"}
            >
                <Row>
                    <Col md className={"mb-3"}>
                        <FloatingLabel label={"What do you rent..."}>
                            <Form.Control
                                required
                                type={"text"} 
                                placeholder={"Type a name..."}
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{Name: e.target.value}
                                    }))
                                }}
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                Please choose a god damn name....
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel label={"Make it sellable!"}>
                            <Form.Control
                                type={"number"}
                                step={0.5}
                                placeholder={"What are you selling for?"}
                                required
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{Price: e.target.value}
                                    }))
                                }}
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                I recomend you see a doctor.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col md>
                        <FloatingLabel label={"Say a little something about it, would you..."}>
                            <Form.Control
                                as={"textarea"}
                                style={{ height: '100px' }}
                                placeholder={"The description goes here..."}
                                required
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{Description: e.target.value}
                                    }))
                                }}
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                I don't like you!
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>  
                <Row>
                    <Col md className={"mb-3"}>
                        <FloatingLabel label={"Choose a time unit!"}>
                            <Form.Select onChange={(e) => {
                                setFormState(() => ({
                                    ...formState,
                                    ...{Unit: e.target.value}
                                }))
                            }}>
                                {renderTimeUnits(formTimeUnits)}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel label={"Choose a category!"}>
                            <Form.Select onChange={(e) => {
                                setFormState(() => ({
                                    ...formState,
                                    ...{Category: e.target.value}
                                }))
                            }}>
                                {renderCategories(formCategories)}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col md style={ {minWidth: "40%"} } className={"mb-3"}>
                        <FloatingLabel label={"Start Date"} >
                            <Form.Control 
                                required
                                type={"datetime-local"}  
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{StartDate: e.target.value}
                                    }))
                                    console.log(e.target.value)
                                }}
                            ></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col style={ {minWidth: "40%"} }>
                        <FloatingLabel label={"End Date"}>
                            <Form.Control
                                required
                                type={"datetime-local"}
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{EndDate: e.target.value}
                                    }))
                                }}
                            ></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mb-3"}>
                    <Col>
                        <FloatingLabel label={"Where are you?"}>
                            <Form.Control
                                required
                                type={"text"}
                                onChange={(e) => {
                                    setFormState(() => ({
                                        ...formState,
                                        ...{Location: e.target.value}
                                    }))
                                }}
                                placeholder={"The description goes here..."}
                            ></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <FormImages files={files} setFiles={setFiles} />
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

async function populateForm() {
    // TODO token
    const response = await axios.get('api/product/get-form-info', authHeader());
    return await response["data"];
}

function renderTimeUnits(formTimeUnits) {
    return Object.keys(formTimeUnits).map((item) => {
        return <option key={item} value={item}>{formTimeUnits[item]}</option>
    });
}
function renderCategories(formCategories) {
    return formCategories.map((item) => {
        return <option key={item.id} value={item.id}>{item.name}</option>
    })
}

export default AddProductForm;