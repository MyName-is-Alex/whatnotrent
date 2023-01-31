import {useState} from "react";
import AddProductForm from "./AddProductForm";
import {Navigate} from "react-router-dom";
import ErrorPage from "../ErrorPage";


const AddProduct = () => {
    const [isCompleted, setIsCompleted] = useState(false)
    const [bugFree, setBugFree] = useState(true)
    
    if (!bugFree) {
        return <ErrorPage redirectUrl={"/add-product"} setBugFree={setBugFree} />
    }
        
    return !isCompleted ? <AddProductForm setIsCompleted={setIsCompleted} setBugFree={setBugFree} /> : <Navigate replace={true} to={"/"} />
}

export default AddProduct;