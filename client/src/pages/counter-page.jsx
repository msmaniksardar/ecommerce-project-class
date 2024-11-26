import React from 'react';
import {useStore} from "zustand";
import countStore from "../store/count-store.js";
import {Button} from "react-bootstrap";

const CounterPage = () => {
  const {count , increment , decrement, reset} =  countStore();

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
            <Button onClick={() => reset()}>Reset</Button>
        </div>
    );
};

export default CounterPage;