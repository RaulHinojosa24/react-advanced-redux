import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const cartData = await fetch(
      "https://react-http-b3296-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
    )
      .then((response) => response.json())
      .catch((error) => {
        dispatch(
          uiActions.setNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          })
        );
      });

    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  };
};

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    fetch(
      "https://react-http-b3296-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      }
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
  };
};
