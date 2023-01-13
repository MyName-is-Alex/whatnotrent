import authService from '../api-authorization/AuthorizeService'
import React, {useEffect, useState} from "react";
import Product from './Product';
import Loading from '../Loading'

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
    const token = await authService.getAccessToken();
    const response = await fetch('api/product', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    
    return await response.json();
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
    const token = await authService.getAccessToken();
    const response = await fetch('api/product/get-form-info', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });

    return await response.json();
}

export default Products;