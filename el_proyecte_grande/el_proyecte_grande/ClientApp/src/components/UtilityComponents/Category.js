import Image from 'react-bootstrap/Image'
import Products from "../HomePage/Products";
import {Button} from "reactstrap";
import {useRef} from "react";

const Category = ({ setCategory, category }) => {
    const buttonRef = useRef(null)
    
    const onClick = (event) => {
        setCategory(event.currentTarget.value)
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
                roundedCircle
            />
            <p>{category["name"]}</p>
        </Button>
    )
}

export default Category;