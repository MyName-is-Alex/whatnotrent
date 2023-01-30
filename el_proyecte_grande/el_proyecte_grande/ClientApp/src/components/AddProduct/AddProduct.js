import {useState} from "react";
import AddProductForm from "./AddProductForm";
import {Navigate} from "react-router-dom";


const AddProduct = () => {
    const [isCompleted, setIsCompleted] = useState(false)
    
    return !isCompleted ? <AddProductForm setIsCompleted={setIsCompleted} /> : <Navigate replace={true} to={"/"} />
}

export default AddProduct;