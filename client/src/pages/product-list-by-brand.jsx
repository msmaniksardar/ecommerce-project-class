import React, {useEffect} from 'react';
import productStore from "../store/product-store.js";
import {useParams} from "react-router-dom";
import ProductListComponent from "../components/product/product-list-component.jsx";
import Layout from "../components/layout/Layout.jsx";

function ProductListByBrand(props) {

    const {id} = useParams();
    const {productListByBrandRequest} = productStore();

    useEffect(()=>{
        (async ()=>{
            await productListByBrandRequest(id);
        })()
    },[])
    return (
        <Layout>
            <ProductListComponent/>
        </Layout>
    );
}

export default ProductListByBrand;