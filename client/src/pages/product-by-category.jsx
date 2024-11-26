import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import productStore from "../store/product-store.js";
import ProductListComponent from "../components/product/product-list-component.jsx";
import Layout from "../components/layout/Layout.jsx";

const ProductByCategory = () => {

    const {id} = useParams();
    const {productListByCategoryRequest} = productStore();

    useEffect(()=>{
        (async ()=>{
            await productListByCategoryRequest(id);
        })()
    },[])

    return (
        <Layout>
            <ProductListComponent/>
        </Layout>
    );
};

export default ProductByCategory;