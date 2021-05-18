import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = fetch('https://books-redux-73b94-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                throw new Error('Could not fetch data!');
            }
            const data = await response.json();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                })
            );
        }
    };
};

export const sendCartData = (cart) => {//This is an action creators aka a thunk
    return async (dispatch) => {//This is weird af
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));


        const sendRequest = async () => {
            const response = await fetch("https://books-redux-73b94-default-rtdb.firebaseio.com/cart.json",
                { method: 'PUT', body: JSON.stringify(cart) });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            };
        };
        try {//Holy hell, I almost punched my monitor just to debug this code!
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sending cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }



    };


}