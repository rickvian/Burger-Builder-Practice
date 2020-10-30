//action creator for orders
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {

    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json?auth=" + token, orderData)
            .then((response) => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error))
            });

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    //(dispatch, getState) parameter to get the current redux state, though the state is not in this file, not recommended
    console.log(token, userId);
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                dispatch(fetchOrderSuccess(fetchedOrders));
            }).catch(err => {
                dispatch(fetchOrderFail(err));
            });
    }

}