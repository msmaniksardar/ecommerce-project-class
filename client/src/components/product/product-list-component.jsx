import React, {useEffect, useState} from 'react';
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {Link} from "react-router-dom";
import productImage from "../../assets/images/productImage.jpg";
import productStore from "../../store/product-store.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";

const ProductListComponent = () => {
    const {productList, brandList, brandListRequest, categoryList, categoryListRequest,productFilterListRequest} = productStore();

    let [filter, setFilter] = useState({
        categoryID: "",
        brandID: "",
        priceMin: "",
        priceMax: ""
    });

    const {categoryID, brandID, priceMax, priceMin} = filter;

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFilter((data) => ({
            ...data,
            [name]: value
        }))
    }
    console.log(filter);


    useEffect(() => {
        (async () => {
            brandList === null ? await brandListRequest() : null;
            categoryList === null ? await categoryListRequest() : null;
            const isFilterEmpty = Object.values(filter).every((value) => value === "");
            !isFilterEmpty ? await productFilterListRequest(filter):null
        })()
    }, [filter])


    return (
        <div className="container mt-2">
            <div className="row">
                {/* Sidebar for Filters */}
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={brandID} name="brandID" onChange={(e)=> onChangeHandler(e)} className="form-control form-select">
                            <option value="">Choose Brand</option>
                            {
                                brandList && brandList.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.brandName}</option>
                                    )
                                })
                            }
                        </select>

                        <label className="form-label mt-3">Categories</label>
                        <select value={categoryID} name="categoryID" onChange={(e)=>onChangeHandler(e)} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {
                                categoryList && categoryList.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.categoryName}</option>
                                    )
                                })
                            }

                        </select>

                        <label className="form-label mt-3">Maximum Price {priceMax}</label>
                        <input
                            name="priceMax"
                            value={priceMax}
                            onChange={(e)=>onChangeHandler(e)}
                            min={0}
                            max={1000000}
                            step={1000}
                            type="range"
                            className="form-range"
                        />

                        <label className="form-label mt-3">Minimum Price {priceMin}</label>
                        <input
                            name="priceMin"
                            value={priceMin}
                            onChange={(e)=>onChangeHandler(e)}
                            min={0}
                            max={1000000}
                            step={1000}
                            type="range"
                            className="form-range"
                        />
                    </div>
                </div>

                {/* Product List Section */}
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                            {/* Handle loading or empty product list */}
                            {productList == null ? (
                                <ProductsSkeleton/>
                            ) : productList.length === 0 ? (
                                <p className="text-center mt-3">No products available.</p>
                            ) : (
                                productList.map((product, index) => {
                                    const price = product.discount ? (
                                        <p className="bodyMedium text-dark my-1">
                                            <strike>$ {product.price}</strike> ${product.discountPrice}
                                        </p>
                                    ) : (
                                        <p className="bodyMedium text-dark my-1">$ {product.price}</p>
                                    );

                                    return (
                                        <div
                                            key={product._id || index}
                                            className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                        >
                                            <Link
                                                to={`/product/details/${product._id}`}
                                                className="card shadow-sm h-100 rounded-3 bg-white"
                                            >
                                                <img
                                                    className="w-100 rounded-top-2"
                                                    src={product.image || productImage}
                                                    alt={product.title || "Product"}
                                                />
                                                <div className="card-body">
                                                    <p className="bodySmall text-secondary my-1">{product.title}</p>
                                                    {price}
                                                    <StarRatings
                                                        rating={parseFloat(product.star) || 0}
                                                        starRatedColor="red"
                                                        starDimension="15px"
                                                        starSpacing="2px"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListComponent;
