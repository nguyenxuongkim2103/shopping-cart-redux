import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {uiActions} from './store/ui-slice';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));
      const response = await fetch("firebase realtime database link here",
      { method: 'PUT', body: JSON.stringify(cart) });

      if(!response.ok){
        throw new Error('Sending cart data failed.'); 
      }

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sending cart data successfully!'
      }));
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    });
  }, [cart, dispatch]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
