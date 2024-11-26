import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const RefundPage = () => {
    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("refund")
        })()
    }, [])
    return (
        <div>
            <TermsComponents/>
        </div>
    );
};

export default RefundPage;