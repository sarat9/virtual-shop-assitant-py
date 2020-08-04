import React from 'react';

const initialState = {
    vehicle: 'heheh',
    checkOutList: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_CHECKOUT":
        console.log(state.checkOutList)
        console.log(action.payload)
        state.checkOutList.push(action.payload)
            return { ...state, checkOutList: state.checkOutList }
        case "Bike":
            return { ...state, vehicle: "It is a Bike" };
        default:
            return state;
    }
}

export default reducer;