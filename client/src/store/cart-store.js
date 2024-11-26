import {create} from "zustand"
import axios from "axios";
import {toast} from "sonner";

const cartStore = create((set)=>({
    isLoading : false,
    addCart:null,
    isError:null,
    cartList:null,
    addCartListRequest:async (reqBody)=>{
        try {
            set({isLoading:true , isError: null});
            const response = await  axios.post("api/v1/CreateCart", reqBody);
            const data = response.data;
            data.status === "success" ? toast.success(data.message) : null;
            set({isLoading:false , isError:response.data , addCart:data.payload})
            return data;
        }catch (error){
            if(error.response.status === 401){
                sessionStorage.clear();
                localStorage.clear();
                window.location.href="/login"
            }else{
                console.log(error.message)
            }
        }
    }
}))



export  default  cartStore;