import React, {useEffect, useState} from 'react';
import ProductImages from "./product-images.jsx";
import productStore from "../../store/product-store.js";
import {useParams} from "react-router-dom";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx";
import parse from "html-react-parser"
import StarRatings from "react-star-ratings/build/star-ratings.js";
import cartStore from "../../store/cart-store.js";

const ProductDetailsComponent = () => {
    const {productDetails, productReviewList} = productStore();
    const {addCartListRequest} = cartStore();

    const {id} = useParams();

    const [cartData, setCartData] = useState({
        productID: id,
        color: "",
        qty: 1,
        size: ""
    })

    const incrementQuantity = ()=>{
        setCartData((prevState) => ({
            ...prevState,
            qty: prevState.qty +1
        }));
    }
    const decrementQuantity = ()=>{
        setCartData((prevState) => ({
            ...prevState,
            qty: prevState.qty > 1 ? prevState.qty - 1 : prevState.qty
        }));
    }


    const handleChange = (e)=>{
        const {name , value } =  e.target;
        setCartData((state)=>(
            { ...state , [name]:value}
        ))
    }

    const handleAddToCart = async () => {
        await addCartListRequest(cartData);
    }



    return (
        productDetails === null ? <DetailsSkeleton/> : <div className="section-top m-0 p-0 bg-white">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-7 p-3">
                        <ProductImages/>
                    </div>
                    <div className="col-md-5 p-3">
                        <h4>{productDetails[0].title}</h4>
                        <p className="text-muted bodySmal my-1">Category:{productDetails[0].category.categoryName}</p>
                        <p className="text-muted bodySmal my-1">Brand: {productDetails[0].brand.brandName}</p>
                        <p className="bodySmal mb-2 mt-1">{productDetails[0].shortDes}</p>
                        {
                            productDetails[0].discount ? <span
                                    className="bodyXLarge">Price:<strike>{productDetails[0].price}</strike> {productDetails[0].discountPrice}  </span> :
                                <span className="bodyXLarge">{productDetails[0].price}</span>


                        }

                        <div className="row">
                            <div className="col-4 p-2">
                                <label className="bodySmal">Size</label>
                                <select name={"size"} value={cartData.size} onChange={handleChange}
                                        className="form-control my-2 form-select">
                                    <option disabled value="">Size</option>
                                    {
                                        productDetails[0].details.size.split(',').map((size, index) => {

                                            return (
                                                <option key={index} value={size}>{size}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-4  p-2">
                                <label className="bodySmal">Color</label>
                                <select name={"color"} value={cartData.color} onChange={handleChange} className="form-control my-2 form-select">
                                    <option disabled value="">Color</option>
                                    {
                                        productDetails[0].details.color.split(',').map((color, index) => {
                                            return (
                                                <option key={index} value={color}>{color}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4  p-2">
                                <label className="bodySmal">Quantity</label>
                                <div className="input-group my-2">
                                    <button onClick={decrementQuantity}
                                            className="btn btn-outline-secondary">-
                                    </button>
                                    <input value={cartData.qty} name={"qty"} type="text" className="form-control bg-light text-center"
                                           readOnly/>
                                    <button onClick={incrementQuantity}
                                            className="btn btn-outline-secondary">+
                                    </button>
                                </div>
                            </div>
                            <div className="col-4  p-2">
                                <button onClick={handleAddToCart} className="btn w-100 btn-success">Add to Cart</button>
                            </div>
                            <div className="col-4  p-2">
                                <button className="btn w-100 btn-success">Add to Wish</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab"
                                    data-bs-target="#Speci-tab-pane" type="button" role="tab"
                                    aria-controls="Speci-tab-pane" aria-selected="true">Specifications
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="Review-tab" data-bs-toggle="tab"
                                    data-bs-target="#Review-tab-pane" type="button" role="tab"
                                    aria-controls="Review-tab-pane" aria-selected="false">Review
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                             aria-labelledby="Speci-tab" tabIndex="0">
                            {
                                parse(productDetails[0].details.des)
                            }
                        </div>
                        <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab"
                             tabIndex="0">
                            <ul className="list-group mt-4 list-group-flush">
                                {
                                    productReviewList && productReviewList.length > 0 ? (
                                        productReviewList.map((item, i) => (
                                            <li key={i} className="list-group-item bg-transparent">
                                                <h6 className="m-0 p-0">
                                                    <i className="bi bi-person"></i> {item.profile.cus_name}
                                                </h6>
                                                <StarRatings
                                                    rating={parseFloat(item.rating)}
                                                    starRatedColor="red"
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                                <p>{item.des}</p>
                                            </li>
                                        ))
                                    ) : (
                                        <span>No Reviews Found</span>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsComponent;