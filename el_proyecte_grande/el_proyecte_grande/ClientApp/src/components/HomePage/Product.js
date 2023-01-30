import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Product.css'
import {Link} from "react-router-dom";


const Product = ({ id, title, startDate, endDate, price, unit, photo, timeUnit }) => {
    return (
        <Card 
            className={"m-2 card_container"} 
            onMouseEnter={(event) => OnMouseActionCard(event, 'enter')}
            onMouseLeave={(event) => OnMouseActionCard(event, 'leave')}
        >
            <div className='card_img_container'>
                <Card.Img variant="top" src={`/ProductsImages/${id}/${photo}`} className='card_img' alt={"Image Not Found"} />
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
                >{price} <span style={{ fontSize: '0.7rem' }}>RON / {timeUnit}</span></ListGroup.Item>
            </ListGroup>
            <Link to={`product-details/${title}?productId=${id}`} className="card_link" ></Link>
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

export default Product;