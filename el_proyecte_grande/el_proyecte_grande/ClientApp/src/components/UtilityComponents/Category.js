import Image from 'react-bootstrap/Image'
import {Button} from "reactstrap";
import {useRef} from "react";
import Placeholder from 'react-bootstrap/Placeholder';

const Category = ({ setCategory, category }) => {
    const buttonRef = useRef(null);
    const placeHolderRef = useRef(null);
    
    const onClick = (event) => {
        setCategory(event.currentTarget.value)
    }
    const onLoad = () => {
        placeHolderRef.current.style.display = "none";
    }
    
    return (
        <Button 
            ref={buttonRef}
            type={"button"}
            onClick={onClick}
            value={category["id"]}
            className={"w-100 h-100 d-flex flex-column align-items-center"}
            style={{ backgroundColor: "transparent", border: "none", color: "black" }}
        >
            <Image
                style={{ width:"88px", backgroundColor:"rgb(232, 233, 235)" }}
                src={`/CategoriesImages/${category["id"]}/${category["photos"]["urLs"][0]}`}
                onLoad={onLoad}
                roundedCircle
            />
            <Placeholder
                ref={placeHolderRef}    
                className={"rounded-circle"}
                style={{ width: "88px", aspectRatio: "1/1", backgroundColor: "#E8E9EB" }}
            />
            <p>{category["name"]}</p>
        </Button>
    )
}

export default Category;