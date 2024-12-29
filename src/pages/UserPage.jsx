import { useEffect, useState } from "react";
import UserPanel from "../components/UserPanel";
import { useWishlist } from "../contexts/wishlistContext";
import ProductCard from "../components/ProductCard";

const UserPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-cart-products`,
          {
            method: "POST",
            body: JSON.stringify(wishlist),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        setWishlistProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlistProducts();
  }, [wishlist]);

  return (
    <UserPanel>
      <h2 className="text-3xl mb-8">Wishlist</h2>
      <div className="flex flex-wrap mb-8 gap-4">
        {wishlistProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </UserPanel>
  );
};

export default UserPage;
