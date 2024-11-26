import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const ContactPage = () => {
    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("contact")
        })()
    }, [])
    return (
        <div>
            <TermsComponents/>
        </div>
    );
};

export default ContactPage;