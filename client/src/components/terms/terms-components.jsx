import React from 'react';
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import termsStore from "../../store/terms-store.js";
import parse from "html-react-parser";

const TermsComponents = () => {

    const {termsList} = termsStore()

    return (
        termsList == null ? <LegalContentSkeleton/> : <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-4">
                        {parse(termsList[0]['description'])}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsComponents;