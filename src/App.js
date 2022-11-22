import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let firstLoad = true;

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }

    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    fetch(
      "https://react-http-b3296-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      { method: "PUT", body: JSON.stringify(cart) }
    )
      .then((response) => {
        dispatch(
          uiActions.setNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
        return response.json();
      })
      .catch((error) => {
        dispatch(
          uiActions.setNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
