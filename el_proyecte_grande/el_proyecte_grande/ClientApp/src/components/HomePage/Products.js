import React, {useEffect, useState} from "react";
import Product from './Product';
import Loading from '../Loading'
import authHeader from "../api-authorization/authHeader";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = ({ categoryFilter, formTimeUnits, formCategories }) => {
    const [page, setPage] = useState(0)
    const [productList, setProductList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        setProductList([])
        setHasMore(true)
        setPage(0)
    }, [categoryFilter])
    
    return (
        productList.loading
        ? <Loading />
        : renderProductsComponent(productList, setProductList, page, setPage, formTimeUnits, formCategories, hasMore, setHasMore, categoryFilter)
    );
}

const fetchPage = async (page, setPage, productList, setProductList, setHasMore, categoryFilter) => {
    const response = await axios.get(`api/product/infinite/${page}/${categoryFilter}`, authHeader());
    const result = await response["data"];
    if (result.length === 0) {
        setHasMore(false)
        return
    }
    await setProductList(productList.concat(result))
    
    setPage(page + 1)
}

const renderProductsComponent = (productList, setProductList, page, setPage, formTimeUnits, formCategories, hasMore, setHasMore, categoryFilter) => {
    return (
        <>
            <h1 
                className={"text-center mb-5r fw-bold"}
                style={{ fontSize:"32px" }}
            >Anunturi</h1>
            <InfiniteScroll
                next={() => fetchPage(page, setPage, productList, setProductList, setHasMore, categoryFilter)} 
                hasMore={hasMore} 
                loader={<Loading />}
                dataLength={() => productList.length}
            >
                <div style={{maxWidth: "100vw"}} className={"container row justify-content-center"}>
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
                </div>
            </InfiniteScroll>
        </>
    )
}

export default Products;