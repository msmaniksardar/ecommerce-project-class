import React, { useEffect, useState } from 'react';
import userStore from "../../store/user-store.js";
import ProfileSkeleton from "../../skeleton/profile-skeleton.jsx";

const ProfileComponent = () => {
    const { profileRequest, profileDetails,saveProfileRequest ,data } = userStore();
    const [ProfileForm, setProfileForm ,] = useState({
        cus_add: "",
        cus_city: "",
        cus_country: "",
        cus_fax: "",
        cus_name: "",
        cus_phone: "",
        cus_postcode: "",
        cus_state: "",
        ship_add: "",
        ship_city: "",
        ship_country: "",
        ship_name: "",
        ship_phone: "",
        ship_postcode: "",
        ship_state: ""
    });



    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProfileForm((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        (async () => {
            await profileRequest();

        })();
    }, []);

    useEffect(() => {
        ( () => {
           if(profileDetails){
               setProfileForm({
                   cus_add: profileDetails.cus_add || "",
                   cus_city: profileDetails.cus_city || "",
                   cus_country: profileDetails.cus_country || "",
                   cus_fax: profileDetails.cus_fax || "",
                   cus_name: profileDetails.cus_name || "",
                   cus_phone: profileDetails.cus_phone || "",
                   cus_postcode: profileDetails.cus_postcode || "",
                   cus_state: profileDetails.cus_state || "",
                   ship_add: profileDetails.ship_add || "",
                   ship_city: profileDetails.ship_city || "",
                   ship_country: profileDetails.ship_country || "",
                   ship_name: profileDetails.ship_name || "",
                   ship_phone: profileDetails.ship_phone || "",
                   ship_postcode: profileDetails.ship_postcode || "",
                   ship_state: profileDetails.ship_state || ""
               })
           }
        })()
    }, [profileDetails]);


    const handleSubmit =async (e) => {
        e.preventDefault();
        await saveProfileRequest(ProfileForm);
        console.log(ProfileForm);
    }

    return (
        profileDetails == null ?
            <ProfileSkeleton />
            :
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="card p-5 rounded-3">
                        <h6>Customer Details</h6>
                        <hr/>
                        <div className="row mb-4">
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Name</label>
                                <input
                                    name="cus_name"
                                    value={ProfileForm.cus_name}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Phone</label>
                                <input
                                    name="cus_phone"
                                    value={ProfileForm.cus_phone}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Fax</label>
                                <input
                                    name="cus_fax"
                                    value={ProfileForm.cus_fax}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Country</label>
                                <input
                                    name="cus_country"
                                    value={ProfileForm.cus_country}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer City</label>
                                <input
                                    name="cus_city"
                                    value={ProfileForm.cus_city}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer State</label>
                                <input
                                    name="cus_state"
                                    value={ProfileForm.cus_state}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Post Code</label>
                                <input
                                    name="cus_postcode"
                                    value={ProfileForm.cus_postcode}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Customer Address</label>
                                <input
                                    name="cus_add"
                                    value={ProfileForm.cus_add}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <h6>Shipping Details</h6>
                        <hr/>
                        <div className="row">
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping Name</label>
                                <input
                                    name="ship_name"
                                    value={ProfileForm.ship_name}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping Phone</label>
                                <input
                                    name="ship_phone"
                                    value={ProfileForm.ship_phone}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping Country</label>
                                <input
                                    name="ship_country"
                                    value={ProfileForm.ship_country}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping City</label>
                                <input
                                    name="ship_city"
                                    value={ProfileForm.ship_city}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping State</label>
                                <input
                                    name="ship_state"
                                    value={ProfileForm.ship_state}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping Post Code</label>
                                <input
                                    name="ship_postcode"
                                    value={ProfileForm.ship_postcode}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-3 p-2">
                                <label className="form-label">Shipping Address</label>
                                <input
                                    name="ship_add"
                                    value={ProfileForm.ship_add}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-3 p-2">
                                <button type="submit" className="btn btn-success">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    );

};

export default ProfileComponent;
