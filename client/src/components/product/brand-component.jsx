import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import productStore from "../../store/product-store.js";
import BrandsSkeleton from "../../skeleton/brands-skeleton.jsx";



const BrandComponent = () => {
    const {brandList ,brandListRequest } = productStore();
    useEffect(()=>{
        (async ()=>{
            await brandListRequest();
        })()
    },[])
    return (
       brandList == null ? <BrandsSkeleton/> : <div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
                        <span
                            className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                        />Shopping Categories </span>
                        { brandList.map((brand, index) => {
                            return <div key={index} className="col-6 col-lg-8r text-center col-md-8r p-2">
                                <Link to={`/ProductListByBrand/${brand._id}`} className="card h-100 rounded-3 bg-light">
                                    <div className="card-body">
                                        <img className="w-75" src={brand.brandImg} alt="default.image"/>
                                        <p className="bodySmal mt-3">{brand.brandName} </p>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>
       </div>
    );
};

export default BrandComponent;