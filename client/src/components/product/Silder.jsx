import React from 'react';
import { Link } from 'react-router-dom';
import ProductStore from '../../store/product-store.js';
import SliderSkeleton from '../../skeleton/slider-skeleton.jsx'; // Assuming you have this component

function Slider(props) {
    const { sliderList } = ProductStore();

    return (
        sliderList == null ? (
            <SliderSkeleton />
        ) : (
            <div>
                <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
                    <div className="carousel-indicators">
                        {sliderList.map((slide, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner py-5">
                        {sliderList.map((slide, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                data-bs-interval="10000"
                            >
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                            <h1 className="headline-1">{slide.title}</h1>
                                            <p>{slide.description}</p>
                                            <Link to={slide.link} className="btn text-white btn-success px-5">
                                                Buy Now
                                            </Link>
                                        </div>
                                        <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                            <img src={slide.image} className="w-100" alt={slide.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev btn rounded-5"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next btn"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        )
    );
}

export default Slider;
