import { useQuery } from "@apollo/client";
//Melo added
import { createContext, useState, useEffect } from 'react'
import {GET_CART} from "../../utils/queries";

function Review() {
    const cartId = localStorage.getItem("cart_id");
    const [loading, data] = useQuery(GET_CART);
    if(loading) return <h2>Loading...</h2>
    if(!data || !data.getCart(cartId)) return <h2>No items in cart</h2>

    return (
        <div className="cart-container">
            {data.getCart.map(item => {
                return(
                    <h3 key={item._id}>{item.name}</h3>
                )
            })}
        </div>
    )
}

//Melos Section - Will Review with Thinh.
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])


  //Add to Cart 
  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  //Remove from Cart 
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  //Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  //Cart Total 
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Review;