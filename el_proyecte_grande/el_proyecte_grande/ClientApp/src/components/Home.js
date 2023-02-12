import React, {useEffect, useState} from 'react';
import MainSlider from './HomePage/MainSlider'
import ProductsHeader from './HomePage/ProductsHeader'
import Products from './HomePage/Products'
import axios from "axios";
import authHeader from "./api-authorization/authHeader";
import SearchBar from "./HomePage/SearchBar";
import {Image} from "react-bootstrap";
import {Parallax, ParallaxProvider} from "react-scroll-parallax";

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
    
    const [category, setCategory] = useState(ALL_CATEGORY_ID);
    const [sortBy, setSortBy] = useState("0");
    const [sortDirection, setSortDirection] = useState("0");
    const [searchStr, setSearchStr] = useState("");
    
    return (
        <div>
            <ParallaxProvider>
                <Parallax 
                    speed={-20} 
                    className={"w-100 text-center"}
                    style={{ 
                        position: "absolute", 
                        top: "-110px",
                        zIndex: "-20"
                    }}
                >
                    <Image 
                        src={"home-page-header.png"} 
                        alt={""}
                        style={{ maxHeight: "28vw" }}
                    />
                </Parallax>
            </ParallaxProvider>
            <SearchBar setSearchStr={setSearchStr} />
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
                searchStr={searchStr}
            />
        </div>
    );
}

async function populateForm() {
    const response = await axios.get('api/product/get-form-info', authHeader());
    return await response["data"];
}

export default Home;
