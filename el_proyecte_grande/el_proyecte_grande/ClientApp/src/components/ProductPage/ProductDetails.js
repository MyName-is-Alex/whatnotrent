import {useSearchParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import authService from "../api-authorization/AuthorizeService";
import SlideShow from "./ProductDetailsSlideShow";
import ProductInfo from "./ProductInfo";
import '@splidejs/splide/css/sea-green';
import './ProductDetails.css';

const ProductDetails = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const productId = searchParams.get("productId")
    
    const [productDetails, setProductDetails] = useState({product: {}, loading: true});
    
    useEffect(() => {
        populateProductDetails(productId).then((data) => {
            setProductDetails({product: data, loading: false})
        })
    }, [])
    
    return (
        productDetails.loading 
            ? <p><em>Loading...</em></p> 
            : (
                <div className={"container row m-auto justify-content-around"}>
                    <SlideShow 
                        productId={productDetails.product["id"]} 
                        photos={productDetails.product["photos"]["urLs"]} 
                        classNames={"col-sm-12 col-lg-7 col-xl-5 mt-5"
                    }/>
                    <ProductInfo product={productDetails.product} className={"mt-5 col-lg-5 col-xl-7 text-center"} />
                </div>
            )
    )    
}

async function populateProductDetails(productId) {
    const token = await authService.getAccessToken();
    const response = await fetch(`/api/product/${productId}`, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    
    return response.json();
}

export default ProductDetails;