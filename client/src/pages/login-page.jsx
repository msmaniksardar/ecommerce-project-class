import React from 'react';
import LoginComponent from "../components/user/login-component.jsx";
import Layout from "../components/layout/Layout.jsx";
import userStore from "../store/user-store.js";

const LoginPage = () => {




    return (
        <Layout>
            <LoginComponent />
        </Layout>
    );
};

export default LoginPage;