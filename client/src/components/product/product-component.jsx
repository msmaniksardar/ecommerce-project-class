import React from 'react';
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import productStore from "../../store/product-store.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import productImage from "../../assets/images/productImage.jpg"
const ProductComponent = () => {
    const {productListByRemark,productListByRemarkRequest} = productStore();
    return (
       productListByRemark == null ? <ProductsSkeleton/> : <div>
            <div className="section">
                <div className="container-fluid py-5 bg-light">
                    <div className="row">
                        <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                        <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>
                        <div className="col-12">
                            <div>
                                <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=> productListByRemarkRequest("new")} className="nav-link active" id="pills-new-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-new" type="button" role="tab"
                                                aria-controls="pills-new" aria-selected="true">New
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=> productListByRemarkRequest("trending")} className="nav-link" id="pills-trending-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-trending" type="button" role="tab"
                                                aria-controls="pills-trending" aria-selected="false">Trending
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=> productListByRemarkRequest("popular")} className="nav-link" id="pills-popular-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-popular" type="button" role="tab"
                                                aria-controls="pills-popular" aria-selected="false">Popular
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=> productListByRemarkRequest("top")} className="nav-link" id="pills-top-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-top" type="button" role="tab"
                                                aria-controls="pills-top" aria-selected="false">Top
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=> productListByRemarkRequest("special")} className="nav-link" id="pills-special-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-special" type="button" role="tab"
                                                aria-controls="pills-special" aria-selected="false">Special
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-new" role="tabpanel"
                                         aria-labelledby="pills-new-tab" tabIndex="0">
                                        <div className="container">
                                            <div className="row">
                                                {productListByRemark.map((product, index) => {
                                                    let price = <p
                                                        className="bodyMedium text-dark my-1">$ {product.price}</p>
                                                    if (product.discount) {
                                                        price = <p className="bodyMedium text-dark my-1">
                                                            <strike>$ {product.price} </strike> ${product.discountPrice}
                                                        </p>
                                                    }
                                                    return <div key={index}
                                                                className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`ProductDetailsID/${product._id}`}
                                                              className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"
                                                                 src={product.image == null ? product.image : productImage}
                                                                 alt={"Not Found"}/>
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{product.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(product.star)}
                                                                             starRatedColor="red"
                                                                             starDimension="15px" starSpacing="2px"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Repeat similar structure for other tabs */}
                                    <div className="tab-pane fade" id="pills-trending" role="tabpanel"
                                         aria-labelledby="pills-trending-tab" tabIndex="0">
                                        <div className="container">
                                            <div className="row">
                                                {productListByRemark.map((product, index) => {
                                                    let price = <p
                                                        className="bodyMedium text-dark my-1">$ {product.price}</p>
                                                    if (product.discount) {
                                                        price = <p className="bodyMedium text-dark my-1">
                                                            <strike>$ {product.price} </strike> ${product.discountPrice}
                                                        </p>
                                                    }
                                                    return <div key={index}
                                                                className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`ProductDetailsID/${product._id}`}
                                                              className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"
                                                                 src={product.image == null ? product.image : productImage}
                                                                 alt={"Not Found"}/>
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{product.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(product.star)}
                                                                             starRatedColor="red"
                                                                             starDimension="15px" starSpacing="2px"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="pills-popular" role="tabpanel"
                                         aria-labelledby="pills-popular-tab" tabIndex="0">
                                        <div className="container">
                                            <div className="row">
                                                {productListByRemark.map((product, index) => {
                                                    let price = <p
                                                        className="bodyMedium text-dark my-1">$ {product.price}</p>
                                                    if (product.discount) {
                                                        price = <p className="bodyMedium text-dark my-1">
                                                            <strike>$ {product.price} </strike> ${product.discountPrice}
                                                        </p>
                                                    }
                                                    return <div key={index}
                                                                className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`ProductDetailsID/${product._id}`}
                                                              className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"
                                                                 src={product.image == null ? product.image : productImage}
                                                                 alt={"Not Found"}/>
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{product.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(product.star)}
                                                                             starRatedColor="red"
                                                                             starDimension="15px" starSpacing="2px"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-top" role="tabpanel"
                                         aria-labelledby="pills-top-tab" tabIndex="0">
                                        <div className="container">
                                            <div className="row">
                                                {productListByRemark.map((product, index) => {
                                                    let price = <p
                                                        className="bodyMedium text-dark my-1">$ {product.price}</p>
                                                    if (product.discount) {
                                                        price = <p className="bodyMedium text-dark my-1">
                                                            <strike>$ {product.price} </strike> ${product.discountPrice}
                                                        </p>
                                                    }
                                                    return <div key={index}
                                                                className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`ProductDetailsID/${product._id}`}
                                                              className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"
                                                                 src={product.image == null ? product.image : productImage}
                                                                 alt={"Not Found"}/>
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{product.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(product.star)}
                                                                             starRatedColor="red"
                                                                             starDimension="15px" starSpacing="2px"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-special" role="tabpanel"
                                         aria-labelledby="pills-special-tab" tabIndex="0">
                                        <div className="container">
                                            <div className="row">
                                                {productListByRemark.map((product, index) => {
                                                    let price = <p
                                                        className="bodyMedium text-dark my-1">$ {product.price}</p>
                                                    if (product.discount) {
                                                        price = <p className="bodyMedium text-dark my-1">
                                                            <strike>$ {product.price} </strike> ${product.discountPrice}
                                                        </p>
                                                    }
                                                    return <div key={index}
                                                                className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`ProductDetailsID/${product._id}`}
                                                              className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2"
                                                                 src={product.image == null ? product.image : productImage}
                                                                 alt={"Not Found"}/>
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{product.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(product.star)}
                                                                             starRatedColor="red"
                                                                             starDimension="15px" starSpacing="2px"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Repeat for other tab panes */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default ProductComponent;
