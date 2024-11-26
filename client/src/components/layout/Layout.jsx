import React from 'react';
import Appbar from "./Appbar.jsx";
import Footer from "./Footer.jsx";

function Layout({children}) {
    return (
        <div>
            <Appbar/>
            <div>
                {children}
            </div>
            <Footer/>

        </div>);
}

export default Layout;