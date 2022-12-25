import authService from '../api-authorization/AuthorizeService'
import React, {useEffect, useState} from "react";
import Product from './Product';
import Loading from '../Loading'

const Products = () => {
    const [productList, setProductList] = useState({ products: [], loading: true });
    
    useEffect(() => {
        populateProductsData().then((data) => {
            setProductList({ products: data, loading: false })
        })
    }, []);
    
    return (
        productList.loading
        ? <Loading />
        : renderProductsComponent(productList.products)
    );
}

async function populateProductsData() {
    const token = await authService.getAccessToken();
    const response = await fetch('api/product', {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    
    return await response.json();
}

const renderProductsComponent = (products) => {
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
                />
            ))}
        </div>
    )
}

export default Products;