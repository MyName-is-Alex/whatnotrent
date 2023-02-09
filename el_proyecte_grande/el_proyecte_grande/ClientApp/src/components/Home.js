import React, {useEffect, useState} from 'react';
import MainSlider from './HomePage/MainSlider'
import ProductsHeader from './HomePage/ProductsHeader'
import Products from './HomePage/Products'
import axios from "axios";
import authHeader from "./api-authorization/authHeader";

const Home = () => {
    const ALL_CATEGORY_ID = "1003"
    const [formTimeUnits, setFormTimeUnits] = useState([]);
    const [formCategories, setFormCategories] = useState([]);
    const [sortByEnum, setSortByEnum] = useState([]);
    const [sortDirectionEnum, setSortDirectionEnum] = useState([])
    useEffect(() => {
        populateForm().then((data) => {
            setFormTimeUnits(data['timeUnits']);
            setFormCategories(data['categories']);
            setSortDirectionEnum(data['sortDirection']);
            setSortByEnum(data['sortBy']);
        })
    }, [])
    
    const [category, setCategory] = useState(ALL_CATEGORY_ID)
    const [sortBy, setSortBy] = useState("0")
    const [sortDirection, setSortDirection] = useState("0")
    
    return (
        <div>
            <MainSlider />
            <ProductsHeader 
                setCategory={setCategory}
                category={category}
                formCategories={formCategories}
                sortByEnum={sortByEnum}
                sortDirectionEnum={sortDirectionEnum}
                setSortBy={setSortBy}
                setSortDirection={setSortDirection}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />
            <Products 
                sortByFilter={sortBy}
                sortDirection={sortDirection}
                categoryFilter={category} 
                formTimeUnits={formTimeUnits} 
                formCategories={formCategories}
            />
        </div>
    );
}

async function populateForm() {
    const response = await axios.get('api/product/get-form-info', authHeader());
    return await response["data"];
}

export default Home;
