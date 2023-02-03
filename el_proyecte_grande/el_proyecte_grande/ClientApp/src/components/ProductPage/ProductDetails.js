import {useSearchParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import SlideShow from "./ProductDetailsSlideShow";
import ProductInfo from "./ProductInfo";
import Loading from "../Loading";
import '@splidejs/splide/css/sea-green';
import './ProductDetails.css';
import authHeader from "../api-authorization/authHeader";
import axios from "axios";
import Products from "../HomePage/Products";
import ProductsHeader from "../HomePage/ProductsHeader";

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
            ? <Loading />
            : (
                <>
                    <div className={"container row m-auto justify-content-around"}>
                        <SlideShow 
                            productId={productDetails.product["id"]} 
                            photos={productDetails.product["photos"]["urLs"]} 
                            classNames={"col-sm-12 col-lg-7 col-xl-5 mt-5"
                        }/>
                        <ProductInfo product={productDetails.product} className={"mt-lg-5 col-lg-5 col-xl-7 text-center"} />
                    </div>
                </>
            )
    )    
}

async function populateProductDetails(productId) {
    // TODO get access token for product details
    const response = await axios.get(`/api/product/${productId}`, authHeader());
    
    return response["data"];
}

export default ProductDetails;