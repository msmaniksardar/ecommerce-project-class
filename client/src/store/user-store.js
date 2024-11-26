import {create} from "zustand"
import axios from "axios"

import {toast} from "sonner";


const userStore = create((set) => ({
    isLoading: false,
    error: null,
    data: null,
    loginRequest: async (email) => {
        set({isLoading: true});
        const response = await axios.post(`/api/v1/Login`, {email});
        const data = response.data;
        set({isError: null, isLoading: false, data: data.message});
        return data;
    },
    verifyRequest: async (otp) => {
        set({isLoading: true});
        const response = await axios.post(`/api/v1/VerifyLogin`, {otp});
        const data = response.data;
        set({isError: null, isLoading: false, data: data.message});
        return data;
    },
    logOutRequest: async () => {
        set({isLoading: true});
        const response = await axios.post(`/api/v1/logout`);
        const data = response.data;
        set({isError: null, isLoading: false, data: data.message});
        return data;
    },
    profileDetails: null,
    profileRequest: async () => {
        try {
            set({isLoading: true});
            const response = await axios.get("/api/v1/ReadUserProfile");
            const data = response.data;
            set({isError: null, isLoading: false, profileDetails: data.payload});
        } catch (err) {
            if (err.response.status === 401) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/login"

            }
        }
    },

    saveProfileRequest: async (reqBody) => {
        try {
            set({isLoading: true});
            const response = await axios.post("/api/v1/UpdateUserProfile", reqBody);
            const data = response.data;
            data.status === "success" ? toast.success(data.message) : null
            set({isError: null, isLoading: false, data: data.message});

        } catch (err) {
            if (err.response.status === 401) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/login"

            }
        }
    }

}))

export default userStore;