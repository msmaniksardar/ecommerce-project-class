import React, {useEffect} from 'react';
import TermsComponents from "../components/terms/terms-components.jsx";
import termsStore from "../store/terms-store.js";

const HowToBuyPage = () => {
    const {termsListRequest} = termsStore()
    useEffect(() => {
        (async () => {
            await termsListRequest("howtobuy")
        })()
    }, [])
    return (
        <div>
      <TermsComponents/>
        </div>
    );
};

export default HowToBuyPage;