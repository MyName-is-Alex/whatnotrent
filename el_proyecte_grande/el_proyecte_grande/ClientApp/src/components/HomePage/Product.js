import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Product.css'
import {useState} from "react";


const Product = ({ title, description, startDate, endDate, price, unit }) => {
    return (
        <Card style={{ width: '18rem' }} className={"m-2"}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{startDate}</ListGroup.Item>
                <ListGroup.Item>{endDate}</ListGroup.Item>
                <ListGroup.Item>{price} RON / {restoredUnits[unit]}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <a href="#" className={"card_link"}></a>
                <Card.Link href="#">User Profile</Card.Link>
            </Card.Body>
        </Card>
    );
}

const restoredUnits = {
    1: "HOUR",
    2: "DAY",
    3: "MONTH",
    4: "YEAR"
}

export default Product;