import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const ComplainPage = () => {
    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("complain")
        })()
    }, [])
    return (
        <div>
            <TermsComponents/>
        </div>
    );
};

export default ComplainPage;