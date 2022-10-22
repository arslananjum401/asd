import axios from "axios";

export const AddToWishList = (Wish) => async (dispatch) => {

    try {
        dispatch({
            type: "AddWishRequest"
        });

        const { data } = await axios.post('/wishlist',
            { Wish }
        );


        dispatch({
            type: "AddWishSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "AddWishFailure",
            padload: error
        })
    }

}
export const GetAllWishesList = () => async (dispatch) => {

    try {
        dispatch({
            type: "GetAllWishesRequest"
        });

        const { data } = await axios.get('/wishlist');
        dispatch({
            type: "GetAllWishesSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "GetAllWishesFailure",
            padload: error
        })
    }

}
export const RemoveFromWishList = (WishId) => async (dispatch) => {

    try {
        dispatch({
            type: "RemoveWishRequest"
        });

        const { data } = await axios.delete('/wishlist', { data: { WishId } });

        dispatch({
            type: "RemoveWishSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "RemoveWishFailure",
            padload: error
        })
    }

}



export const AddToCartAction = (ProductId) => async (dispatch) => {
    try {
        dispatch({
            type: "AddToCartRequest"
        })

        const { data } = await axios.post(`/addtocart/${ProductId}`,);

        dispatch({
            type: "AddToCartSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "AddToCartFailure",
            payload: error
        })

    }
}
export const RemoveFromCartAction = (ProductId) => async (dispatch) => {
    try {
        dispatch({
            type: "RemoveFromCartRequest"
        })

        const { data } = await axios.delete(`/cart/${ProductId}`,);

        dispatch({
            type: "RemoveFromCartSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "RemoveFromCartFailure",
            payload: error
        })

    }
}

export const BuyProductA = (Products) => async (dispatch) => {
    try {
        dispatch({
            type: "BuyCourseRequest",
        })

        const { data } = await axios.post('/buy', { Products: [Products] });

        dispatch({
            type: "BuyCourseSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "BuyCourseFailure",
            payload: error
        })
    }
}

export const GetCart = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetCartRequest"
        })

        const { data } = await axios.get('/cart');
        console.log(data)
        dispatch({
            type: "GetCartSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "GetCartFailure",
            payload: error
        })
    }
}

export const CreateCustomerA = (Products) => async (dispatch) => {
    try {
        dispatch({
            type: "BuyCourseRequest",
        })

        const { data } = await axios.post('/paymentIntent/create', { Products: [Products] });

        dispatch({
            type: "BuyCourseSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "BuyCourseFailure",
            payload: error
        })
    }
}