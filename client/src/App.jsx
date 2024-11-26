import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import VerifyPage from "./pages/verify-page.jsx";
import CounterPage from "./pages/counter-page.jsx";
import ProductListByBrand from "./pages/product-list-by-brand.jsx";
import ProductByCategory from "./pages/product-by-category.jsx";
import ProductListByKeyword from "./pages/product-list-by-keyword.jsx";
import ProductDetailsComponent from "./components/product/product-details-component.jsx";
import ProductDetailsPage from "./pages/product-details-page.jsx";
import AboutPage from "./pages/about-page.jsx";
import RefundPage from "./pages/refund-page.jsx";
import TermsPage from "./pages/terms-page.jsx";
import HowToBuyPage from "./pages/how-to-buy-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import ComplainPage from "./pages/complain-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/counter-app" element={<CounterPage />} />
                    <Route path="/ProductListByBrand/:id" element={<ProductListByBrand />} />
                    <Route path="/ProductListByCategory/:id" element={<ProductByCategory />} />
                    <Route path="/ProductListByKeyword/:keyword" element={<ProductListByKeyword />} />
                    <Route path="/ProductDetailsID/:id" element={<ProductDetailsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/refund" element={<RefundPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/how-to-buy" element={<HowToBuyPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/complain" element={<ComplainPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;