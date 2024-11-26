import {create} from "zustand";

const countStore = create((set)=>({
    count:0,
    increment:()=> set((state)=> ({ count:state.count + 1 })),
    decrement:()=> set((state)=>({ count:state.count - 1 })),
    reset:()=> set((state)=> ({count:0}))
}))


export default countStore;