import {useEffect, useRef, useState} from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import authHeader from "../api-authorization/authHeader";
import ListGroup from 'react-bootstrap/ListGroup';
import {Col, Row} from "reactstrap";
import Product from "../HomePage/Product";
import {Link} from "react-router-dom";
import userStore from "../../stores/UserStore";

const ProfilePage = () => {
    const [formTimeUnits, setFormTimeUnits] = useState()
    const [formCategories ,setFormCategories] = useState()
    
    const image = useRef();
    const imageUrl = "UsersImages";
    const [productList, setProductList] = useState([]);
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [photoUrl, setPhotoUrl] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        populateForm().then((data) => {
            setFormTimeUnits(data['timeUnits'])
            setFormCategories(data['categories'])
        })
    }, [])
    
    useEffect(() => {
        userStore.fetchUserInfo().then((data) => {
            setProductList(data["products"])
            setEmail(data["email"])
            setUserName(data["userName"])
            setPhoneNumber(data["phoneNumber"])
            setPhotoUrl(data["photoUrl"])
            setUserId(data["userId"])  
        })
    }, [])
    
    return (
        <div className={"mt-5 w-75 m-auto"}>
            <Row className={"justify-content-start"} style={{ marginLeft: "0px" }}>
                <Card className={"mb-3 w-50"}>
                    <Card.Body className={"fw-bold fs-5 text-center"}>Your Profile</Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className={"mb-3 mb-lg-0 col-12 col-lg-4 d-flex flex-column justify-content-between"}>
                    <Card
                        className={"bg-white text-dark p-3 w-100 mb-3 mb-lg-0"}
                    >
                        <ListGroup>
                            <ListGroup.Item>Email: {email}</ListGroup.Item>
                            <ListGroup.Item>Name: {userName}</ListGroup.Item>
                            <ListGroup.Item>Phone Number: {phoneNumber}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card className={"bg-white text-dark p-3 w-100 mb-3 mb-lg-0"}>
                        <ListGroup>
                            <ListGroup.Item>You have {productList.length} anouncements posted.</ListGroup.Item>
                            <ListGroup.Item>Click on an anouncement to inspect it.</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Link 
                        className={"btn-primary text-center text-decoration-none rounded"} 
                        to={"/update-user"}
                    >
                        Edit profile
                    </Link>
                </Col>
                <Col className={"col-12 col-lg-8"}>
                    <Card 
                        className={"g-white text-dark shadow w-100 ratio-1x1"}
                    >
                        <Card.Img
                            ref={image}
                            src={`/${imageUrl}/${userId}/${photoUrl}`}
                            onError={addDefaultSrc}
                            alt={""}
                            className={"m-auto p-3 w-75"}
                        />
                    </Card>
                </Col>
            </Row>
            <Row className={"justify-content-start"} style={{marginLeft: "0px"}}>
                <Card className={"text-center mt-5 mb-3 w-50"}>
                    <Card.Body className={"fw-bold fs-5"}>Your ads</Card.Body>
                </Card>
            </Row>
            <Row className={"justify-content-start"}>
                {productList.map((product) => (
                    <Product
                        key={product["id"]}
                        id={product["id"]}
                        title={product["name"]}
                        startDate={product["startDate"]}
                        endDate={product["endDate"]}
                        price={product["price"]}
                        unit={product["unit"]}
                        photo={product["photos"]["urLs"][0]}
                        timeUnit={formTimeUnits[product["unit"]]}
                        category={formCategories[product["category"]["id"]-1]}
                    />
                ))}
            </Row>
        </div>
    )
}

function addDefaultSrc(e) {
    e.target.src = "/Default/defaultProfileImg.png"
}

async function populateForm() {
    const response = await axios.get('api/product/get-form-info', authHeader());
    return await response["data"];
}

export default ProfilePage;