import React, {useEffect, useState} from "react";
import Product from './Product';
import Loading from '../Loading'
import authHeader from "../api-authorization/authHeader";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {Row} from "reactstrap";

const Products = ({ categoryFilter, formTimeUnits, formCategories, sortByFilter, sortDirection, searchStr }) => {
    const [page, setPage] = useState(0)
    const [productList, setProductList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        setProductList([])
        setHasMore(true)
        setPage(0)
    }, [searchStr])
    
    useEffect(() => {
        setProductList([])
        setHasMore(true)
        setPage(0)
    }, [categoryFilter, sortByFilter, sortDirection])
    
    return (
        productList.loading
        ? <Loading />
        : renderProductsComponent(productList, setProductList, page, setPage, formTimeUnits, formCategories, hasMore,
                setHasMore, categoryFilter, sortByFilter, sortDirection, searchStr)
    );
}

const fetchPage = async (page, setPage, productList, setProductList, setHasMore, categoryFilter, sortByFilter, 
                         sortDirection, searchStr) => {
    const apiRoute = searchStr 
        ? `api/product/infinite/${page}/${categoryFilter}/${sortByFilter}/${sortDirection}/${searchStr}`
        : `api/product/infinite/${page}/${categoryFilter}/${sortByFilter}/${sortDirection}`
    
    const response = await axios.get(apiRoute, authHeader());
    const result = await response["data"];
    if (result.length === 0) {
        setHasMore(false)
        return
    }
    await setProductList(productList.concat(result))
    
    setPage(page + 1)
}

const renderProductsComponent = (productList, setProductList, page, setPage, formTimeUnits, formCategories, hasMore, setHasMore, 
                                 categoryFilter, sortByFilter, sortDirection, searchStr) => {
    return (
        <>
            <h1 
                className={"text-center mb-5r fw-bold"}
                style={{ fontSize:"32px" }}
            >Anunturi</h1>
            <InfiniteScroll
                next={() => fetchPage(page, setPage, productList, setProductList, setHasMore, categoryFilter, 
                    sortByFilter, sortDirection, searchStr)}
                hasMore={hasMore} 
                loader={<Loading />}
                dataLength={() => productList.length}
            >
                <Row className={"container row justify-content-center mx-auto mb-5"}>
                    {productList.map((product) => (
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
                            category={formCategories[product["category"]["id"]-1]}
                        />
                    ))}
                </Row>
            </InfiniteScroll>
        </>
    )
}

export default Products;