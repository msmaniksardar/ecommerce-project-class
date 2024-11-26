import {create} from "zustand";
import axios from "axios";

const productStore = create((set) => ({
    isLoading: false,
    isError: null,
    brandList: null,
    productListByRemark: null,
    categoryList: null,
    sliderList: null,
    featureList: null,

    sliderListRequest: async () => {
        set({isLoading: true});
        const response = await axios.get("/api/v1/ProductListBySlider");
        const data = response.data;
        set({isError: null, isLoading: false, sliderList: data.payload});
    },
    brandListRequest: async () => {
        set({isLoading: true});
        const response = await axios.get("/api/v1/BrandList");
        const data = response.data;
        set({isError: null, isLoading: false, brandList: data.payload});
    },
    categoryListRequest: async () => {
        set({isLoading: true});
        const response = await axios.get("/api/v1/CategoryList");
        const data = response.data;
        set({isError: null, isLoading: false, categoryList: data.payload});
    },
    productListByRemarkRequest: async (remark) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
        const data = response.data;
        set({isError: null, isLoading: false, productListByRemark: data.payload});
    },

    featuresListRequest: async (keyword) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/read-feature`);
        const data = response.data;
        set({isError: null, isLoading: false, featureList: data.payload});
    },

    productList: null,

    productListByBrandRequest: async (brandId) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/ProductListByBrand/${brandId}`);
        const data = response.data;
        set({isError: null, isLoading: false, productList: data.payload});
    },

    productListByCategoryRequest: async (brandId) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/ProductListByCategory/${brandId}`);
        const data = response.data;
        set({isError: null, isLoading: false, productList: data.payload});
    },
    productListByKeywordRequest: async (keyword) => {
        set({isLoading: true});
        set({productList: null});
        const response = await axios.get(`/api/v1/ProductListByKeyword/${keyword}`);
        const data = response.data;
        set({isError: null, isLoading: false, productList: data.payload});
    },

    searchKeyword: "",
    setSearchKeyword: async (keyword) => {
        set({searchKeyword: keyword});
    },

    productFilterListRequest: async (reqBody) => {
        set({isLoading: true});
        set({productList: null});
        const response = await axios.get(`/api/v1/productFilterList`, reqBody);
        const data = response.data;
        set({isError: null, isLoading: false, productList: data.payload});
    },
    productDetails: null,
    productDetailsRequest: async (id) => {
        set({isLoading: true});
        set({productList: null});
        const response = await axios.get(`/api/v1/ProductDetailsID/${id}`);
        const data = response.data;
        set({isError: null, isLoading: false, productDetails: data.payload});
    },
    quantity: 0,
    incrementQuantity: () => set((state) => ({quantity: state.quantity + 1})),
    decrementQuantity: () => set((state) => ({quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity})),
    productReviewList: null,
    productReviewListRequest: async (productId) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/ProductReviewListByID/${productId}`);
        const data = response.data;
        set({isError: null, isLoading: false, productReviewList: data.payload});
    },
    addToCartList:null,
    addToCartRequest:async ()=>{
        set({isLoading: true});
        const response = await axios.post("/api/v1/AddToCart");
        const data = response.data;
        set({isError: null, isLoading: false, productList: data.payload});
    }


}))


export default productStore;