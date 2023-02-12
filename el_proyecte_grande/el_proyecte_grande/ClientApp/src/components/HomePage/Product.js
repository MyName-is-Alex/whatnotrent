import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Product.css'
import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";
import {useRef} from "react";


const Product = ({ id, title, startDate, endDate, price, unit, photo, timeUnit, category }) => {
    const image = useRef(null)
    
    return (
        <Col xl={"3"} lg={"4"} sm={"6"} xs={"12"} className={"m-0"}>
            <Card
                onMouseEnter={(event) => OnMouseActionCard(event, 'enter', image)}
                onMouseLeave={(event) => OnMouseActionCard(event, 'leave', image)}
                className={"d-flex flex-column justify-content-between my-2"}
                style={{ height: "23rem" }}
            >
                <div
                    ref={image}
                    style={{
                        transition: "transform 0.3s ease-in-out",
                        height: "50%",
                        maxWidth: "100%",
                        width: "fit-content",
                        margin: "0 auto",
                        padding: "15px 15px",
                        overflow: "hidden"
                    }}
                >
                    <Card.Img
                        variant="top" 
                        src={`/ProductsImages/${id}/${photo}`} 
                        alt={"Image Not Found"} 
                        style={{ height: "100%" }}
                    />
                </div>
                <Card.Title className={"mx-3 mt-2"}>{title}</Card.Title>
                <ListGroup className="list-group-flush border-0 mb-0">
                    <ListGroup.Item>{startDate}</ListGroup.Item>
                    <ListGroup.Item>{endDate}</ListGroup.Item>
                    <ListGroup.Item className={"fw-bold"} style={{ fontSize: '1rem'}}>
                        {price} <span style={{ fontSize: '0.7rem' }}>RON / {timeUnit}</span>
                    </ListGroup.Item>
                </ListGroup>
                <Link to={`/product-details/${title}?productId=${id}`} className="card_link" ></Link>
            </Card>
        </Col>
    );
}

const OnMouseActionCard = (event, action, image) => {
    if (action === 'enter') {
        image.current.style.transform = 'scale(1.05)' 
    }
    else if (action === 'leave') {
        image.current.style.transform = 'scale(1)'
    }
    else {
        console.log("undefined action parameter for method OnMouseActionCard.")
    }
}

export default Product;