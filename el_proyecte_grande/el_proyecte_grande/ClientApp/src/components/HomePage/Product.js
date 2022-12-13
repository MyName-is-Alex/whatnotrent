import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Product.css'
import {useState} from "react";


const Product = ({ title, description, startDate, endDate, price, unit, photos }) => {
    return (
        <Card 
            className={"m-2 card_container"} 
            onMouseEnter={(event) => OnMouseActionCard(event, 'enter')}
            onMouseLeave={(event) => OnMouseActionCard(event, 'leave')}
        >
            <div className='card_img_container'>
                <Card.Img variant="top" src={photos.urLs[1]} className='card_img' />
            </div>
            <Card.Body className='card_body'>
                <Card.Title style={{margin: '0'}}>{title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush border-0">
                <ListGroup.Item className='group_item'>{startDate}</ListGroup.Item>
                <ListGroup.Item className='group_item'>{endDate}</ListGroup.Item>
                <ListGroup.Item 
                    className='group_item mt-4'
                    style={{ fontWeight: 'bold', fontSize: '1rem'}}
                >{price} <span style={{fontSize: '0.7rem'}}>RON / {restoredUnits[unit]}</span></ListGroup.Item>
            </ListGroup>
            <a href="#" className={"card_link"}></a>
        </Card>
    );
}

const OnMouseActionCard = (event, action) => {
    const image = event.currentTarget.querySelector('.card_img')
    if (action === 'enter') {
        image.style.transform = 'scale(1.1)' 
    }
    else if (action === 'leave') {
        image.style.transform = 'scale(1)'
    }
    else {
        console.log("undefined action parameter for method OnMouseActionCard.")
    }
}

const restoredUnits = {
    1: "HOUR",
    2: "DAY",
    3: "MONTH",
    4: "YEAR"
}

export default Product;