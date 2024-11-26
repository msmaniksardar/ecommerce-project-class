import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const AboutPage = () => {

    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("about")
        })()
    }, [])

    return (
        <div>
            <TermsComponents/>
        </div>
    );
};

export default AboutPage;