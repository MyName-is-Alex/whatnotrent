import React, {Component, useEffect, useState} from 'react';
import MainSlider from './HomePage/MainSlider'
import ProductsHeader from './HomePage/ProductsHeader'
import Products from './HomePage/Products'
import axios from "axios";
import authHeader from "./api-authorization/authHeader";

const Home = () => {
    const ALL_CATEGORY_ID = 1003
    const [formTimeUnits, setFormTimeUnits] = useState([]);
    const [formCategories, setFormCategories] = useState([])
    useEffect(() => {
        populateForm().then((data) => {
            setFormTimeUnits(data['timeUnits'])
            setFormCategories(data['categories'])
        })
    }, [])
    
    const [category, setCategory] = useState(ALL_CATEGORY_ID)
    
    return (
        <div>
            <MainSlider />
            <ProductsHeader setCategory={setCategory} formCategories={formCategories}/>
            <Products categoryFilter={category} formTimeUnits={formTimeUnits} formCategories={formCategories}/>
        </div>
    );
}

async function populateForm() {
    const response = await axios.get('api/product/get-form-info', authHeader());
    return await response["data"];
}

export default Home;
