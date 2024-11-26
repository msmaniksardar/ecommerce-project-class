import React, {useEffect} from 'react';
import productStore from "../store/product-store.js";
import {useParams} from "react-router-dom";
import ProductDetailsComponent from "../components/product/product-details-component.jsx";
import BrandComponent from "../components/product/brand-component.jsx";
import Layout from "../components/layout/Layout.jsx";

const ProductDetailsPage = () => {
    const {productDetailsRequest, productDetails, productReviewListRequest} = productStore();

    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await productDetailsRequest(id);
            await productReviewListRequest(id);
        })()
    }, [])

    return (
        <Layout>
            <ProductDetailsComponent/>
            <BrandComponent/>

        </Layout>
    );
};

export default ProductDetailsPage;