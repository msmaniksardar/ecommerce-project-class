import React from 'react';
import Layout from "../layout/Layout.jsx";
import userStore from "../../store/user-store.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const VerifyComponent = () => {
    const {verifyRequest} = userStore()
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        verifyRequest(otp).then((data) => {
            if(data.status === "success") {
                toast.success(data.message);
                sessionStorage.setItem("token", data.payload);
                navigate("/" , {replace: true});
            }
            if(data.status === "fail"){
                toast.error(data.message);
            }
        });
    }
    return (
        <Layout>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <form onSubmit={onSubmit}>
                            <div className="card p-5">
                                <h4>Enter Verification Code</h4>
                                <p>A verification code has been sent to the email address you provide</p>
                                <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Verification"
                                       type="text" className="form-control"/>
                                <button type={"submit"} className="btn mt-3 btn-success"> Verify</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VerifyComponent;