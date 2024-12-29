import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      let cart;
      if (auth.user) {
        try {
          const response = await fetch(`http://localhost:3000/api/users/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          if (!response.ok) {
            const data = await response.json();
            throw new Error(`${data.message}`);
          }
          const data = await response.json();
          cart = data;
        } catch (error) {
          console.log(error);
        }
      } else {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
      }
      setCart(cart);
    };
    fetchCart();
  }, [auth.user]);

  const updateCart = async (cart) => {
    setCart(cart);
    if (auth.user) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/cart`, {
          method: "POST",
          body: JSON.stringify({ cart }),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const addProductToCart = (productId) => {
    updateCart([...cart, productId]);
  };

  const subtractProductQuantityFromCart = (productId) => {
    const productIndex = cart.indexOf(productId);
    let updatedCart = cart;
    if (productIndex !== -1) {
      updatedCart = cart.filter((prodId, index) => index !== productIndex);
    }
    updateCart(updatedCart);
  };

  const removeProductFromCart = (productId) => {
    const updatedCart = cart.filter((prodId) => prodId !== productId);
    updateCart(updatedCart);
  };

  const resetCart = () => {
    updateCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        subtractProductQuantityFromCart,
        removeProductFromCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
