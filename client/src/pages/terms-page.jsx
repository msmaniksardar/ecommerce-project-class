import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const TermsPage = () => {
    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("terms")
        })()
    }, [])
    return (
        <div>
            <TermsComponents/>
        </div>
    );
};

export default TermsPage;