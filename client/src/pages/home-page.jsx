import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import Slider from "../components/product/Silder.jsx";
import ProductComponent from "../components/product/product-component.jsx";
import CategoryComponent from "../components/product/category-component.jsx";
import BrandComponent from "../components/product/brand-component.jsx";
import FeatureComponent from "../components/product/feature-component.jsx";
import SliderSkeleton from "../skeleton/slider-skeleton.jsx";
import ProductsSkeleton from "../skeleton/products-skeleton.jsx";
import CategoriesSkeleton from "../skeleton/categories-skeleton.jsx";
import BrandsSkeleton from "../skeleton/brands-skeleton.jsx";
import FeaturesSkeleton from "../skeleton/features-skeleton.jsx";
import productStore from "../store/product-store.js";
import ProductStore from "../store/product-store.js";

function HomePage(props) {
    const {
        sliderListRequest,
        brandListRequest,
        categoryListRequest,
        productListByRemarkRequest,
        featuresListRequest,
        ProductListByKeywordRequest,
        sliderList,
        brandList,
    } = productStore();


    useEffect(() => {
        (async () => {
            await sliderListRequest();
            await brandListRequest();
            await categoryListRequest();
            await productListByRemarkRequest("new");
            await featuresListRequest();
        })()
    }, [])


    return (
        <Layout>
            <Slider/>
            <FeatureComponent/>
            <CategoryComponent/>
            <ProductComponent/>
            <BrandComponent/>
            <FeatureComponent/>
        </Layout>
    );
}

export default HomePage;