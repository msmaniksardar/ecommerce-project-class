import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import productStore from "../store/product-store.js";
import ProductListComponent from "../components/product/product-list-component.jsx";
import Layout from "../components/layout/Layout.jsx";

const ProductListByKeyword = () => {
    const {keyword} = useParams();
    const {productListByKeywordRequest} = productStore();

    useEffect(()=>{
        (async ()=>{
            await productListByKeywordRequest(keyword);
        })()
    },[keyword])

    return (
        <Layout>
            <ProductListComponent/>
        </Layout>
    );
};

export default ProductListByKeyword;