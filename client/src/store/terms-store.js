import {create} from "zustand"
import axios from "axios"


const termsStore = create((set) => ({
    isLoading: false,
    error: null,
    termsList: null,
    termsListRequest: async (type) => {
        set({isLoading: true});
        const response = await axios.get(`/api/v1/terms-condition/${type}`);
        const data = response.data;
        set({isError: null, isLoading: false, termsList: data.payload});
    }

}))

export default termsStore;