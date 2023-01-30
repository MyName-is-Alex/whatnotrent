import {FloatingLabel, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import axios from "axios";
import FormImages from "./FormImages";
import authHeader from "../api-authorization/authHeader";

//TODO Add loading screen
//TODO Add redirect to message after posting

const AddProductForm = ({ setIsCompleted }) => {
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
    
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [unit, setUnit] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [category, setCategory] = useState(1);
    const [location, setLocation] = useState();
    const [files, setFiles] = useState({});

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
        
        formData.append("Name", name)
        formData.append("Description", description)
        formData.append("Price", price)
        formData.append("StartDate", startDate)
        formData.append("EndDate", endDate)
        formData.append("Location", location)
        
        formData.append("Unit", unit)
        formData.append("CategoryId", category)
        
        for (const file in files) {
            formData.append(`Images`, files[file], files[file].name)
        }

        try {
            await axios.post("api/product/add-product", formData, authHeader()) //TODO token
            setIsCompleted(true)
        } catch (exception){
            console.log(exception)
        }
    };
    
    return (
        <Form encType={"multipart/form-data"} onSubmit={uploadForm} noValidate validated={validated}>
            <Row className={"mb-3"}>
                <FloatingLabel as={Col} label={"What do you rent..."}>
                    <Form.Control 
                        required
                        type={"text"} 
                        placeholder={"Type a name..."}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                        Please choose a god damn name....
                    </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel as={Col} label={"Say a little something about it, would you..."}>
                    <Form.Control 
                        type={"textArea"} 
                        placeholder={"The description goes here..."} 
                        required
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}                
                    />
                    <Form.Control.Feedback type={"invalid"}>
                        I don't like you!
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Row>
            <Row className={"mb-3"}>
                <FloatingLabel as={Col} label={"Make it sellable!"}>
                    <Form.Control
                        type={"number"}
                        step={0.5} 
                        placeholder={"What are you selling for?"} 
                        required
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                    />
                    <Form.Control.Feedback type={"invalid"}>
                        I recomend you see a doctor.
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Row>  
            <Row>
                <FloatingLabel as={Col} label={"Choose a time unit!"}>
                    <Form.Select onChange={(e) => {
                        setUnit(e.target.value)
                    }}>
                        {renderTimeUnits(formTimeUnits)}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel as={Col} label={"Choose a category!"}>
                    <Form.Select onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        {renderCategories(formCategories)}
                    </Form.Select>
                </FloatingLabel>
            </Row>
            <FloatingLabel label={"Start Date"}>
                <Form.Control 
                    required
                    type={"datetime-local"}  
                    onChange={(e) => {
                        setStartDate(e.target.value)
                    }}
                ></Form.Control>
            </FloatingLabel>
            <FloatingLabel label={"End Date"}>
                <Form.Control
                    required
                    type={"datetime-local"}
                    onChange={(e) => {
                        setEndDate(e.target.value)
                    }}
                ></Form.Control>
            </FloatingLabel>
            <FloatingLabel label={"Where are you?"}>
                <Form.Control
                    required
                    type={"text"}
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }}
                    placeholder={"The description goes here..."}
                ></Form.Control>
            </FloatingLabel>
            <FormImages files={files} setFiles={setFiles} />
            <Button type="submit">
                Submit
            </Button>
        </Form>
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