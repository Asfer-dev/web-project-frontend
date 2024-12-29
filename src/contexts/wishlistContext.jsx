import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { auth } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/wishlist`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth.user) fetchWishlist();
  }, [auth.user]);

  const updateWishlist = async (wishlist) => {
    if (auth.user) {
      setWishlist(wishlist);
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/wishlist`,
          {
            method: "POST",
            body: JSON.stringify({ wishlist }),
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addProductToWishlist = (productId) => {
    if (!wishlist.includes(productId)) updateWishlist([...wishlist, productId]);
  };

  const removeProductFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((prodId) => prodId !== productId);
    updateWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addProductToWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
