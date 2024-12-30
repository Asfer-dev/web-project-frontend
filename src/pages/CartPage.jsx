import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-cart-products`,
          {
            method: "POST",
            body: JSON.stringify(cart),
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
        setCartProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartProducts();
  }, [cart]);

  return (
    <main className="container-default pt-20">
      <h1 className="text-3xl mb-8">Your Cart</h1>
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        {cartProducts.map((product) => (
          <ProductCard product={product} isCartProduct={true} />
        ))}
      </div>
      <div className="mx-auto w-fit">
        <Link to={"/checkout"} className="">
          <PrimaryButton>Proceed to Checkout</PrimaryButton>
        </Link>
      </div>
    </main>
  );
};

export default CartPage;
