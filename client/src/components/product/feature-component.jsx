import React from 'react';
import productStore from "../../store/product-store.js";
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";


const FeatureComponent = () => {

    const {featureList} = productStore();


    return (
        featureList == null ? <FeaturesSkeleton/> : <div>
            <div className="container section">
                <div className="row">
                    <div className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    {featureList.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="col-3">
                                                    <img className="w-100" src={data.image} alt="not-found"/>
                                                </div>
                                                <div className="col-9">
                                                    <h3 className="bodyXLarge">{data.name}</h3>
                                                    <span className="bodySmal">{data.description}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureComponent;