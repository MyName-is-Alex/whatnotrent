import React, {useEffect, useState} from "react";
import Product from './Product';
import Loading from '../Loading'
import authHeader from "../api-authorization/authHeader";
import axios from "axios";

const Products = () => {
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
    
    const [productList, setProductList] = useState({ products: [], loading: true });
    useEffect(() => {
        populateProductsData().then((data) => {
            setProductList({ products: data, loading: false })
        })
    }, []);
    
    return (
        productList.loading
        ? <Loading />
        : renderProductsComponent(productList.products, formTimeUnits)
    );
}

async function populateProductsData() {
    // TODO token
    const response = await axios.get('api/product', authHeader());
    return await response["data"]; 
}

const renderProductsComponent = (products, formTimeUnits) => {
    return (
        <div style={{maxWidth: "100vw"}} className={"container row justify-content-center"}>
            {products.map((product) => (
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
                />
            ))}
        </div>
    )
}

async function populateForm() {
    // TODO token
    const response = await axios.get('api/product/get-form-info', authHeader());

    return await response["data"];
}

export default Products;