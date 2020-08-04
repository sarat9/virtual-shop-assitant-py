import React from 'react';


export function checkOutProduct(payload) {
    console.log('payload',payload)

    return {
        type: "ADD_TO_CHECKOUT",
        payload: payload
    }
}
