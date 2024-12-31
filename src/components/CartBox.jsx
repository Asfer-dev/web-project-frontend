import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";
import { MoveRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import SecondaryButton from "./buttons/SecondaryButton";

export default function CartBox({ cartVisible, setCartVisible }) {
  const { cart, addProductToCart, subtractProductQuantityFromCart } = useCart();

  const [cartProducts, setCartProducts] = useState([]);

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
        const updatedData = data.map((product) => ({
          ...product,
          quantity: cart.filter((pid) => pid === product._id).length,
        }));
        setCartProducts(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartProducts();
  }, [cart]);

  const cartStyles =
    "overflow-auto right-0 top-[4rem] rounded-lg fixed min-h-[600px] left-0 md:left-auto w-full md:w-[400px] md:shadow-lg p-4 bg-white transition-transform duration-500 translate-x-full";

  return (
    <div
      className={cartVisible ? cartStyles + "translate-x-0" : cartStyles + ""}
    >
      <div className="flex justify-end mb-2">
        <button onClick={() => setCartVisible(false)}>
          <X />
          <span className="sr-only">Close Cart</span>
        </button>
      </div>
      <h2 className="text-xl font-medium">Your Cart</h2>
      {cartProducts?.length > 0 ? (
        <div className="flex flex-col justify-between h-full gap-8">
          <div>
            {cartProducts.map((product) => {
              return (
                <div className="flex gap-2 items-center justify-between mb-4">
                  <div>
                    <img
                      className="h-16"
                      src={`http://localhost:3000${product.images[0]}`}
                    />
                    <h3>{product.name}</h3>
                  </div>
                  <p>Rs. {product.price * product.quantity}</p>
                  <div className="flex gap-1">
                    <SecondaryButton
                      handleClick={() =>
                        subtractProductQuantityFromCart(product._id)
                      }
                      className="rounded-full p-0 w-8 h-8 flex items-center justify-center bg-zinc-100 border border-zinc-300/60"
                    >
                      -
                    </SecondaryButton>
                    <span className="py-1 px-2 font-medium">
                      {product.quantity}
                    </span>
                    <SecondaryButton
                      handleClick={() => addProductToCart(product._id)}
                      className="rounded-full p-0 w-8 h-8 flex items-center justify-center bg-zinc-100 border border-zinc-300/60"
                    >
                      +
                    </SecondaryButton>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className="" to={"/cart"}>
            <button
              onClick={() => setCartVisible(false)}
              className="flex gap-2 items-center hover:border-b border-zinc-400"
            >
              Go to Cart page <MoveRight />
            </button>
          </Link>
        </div>
      ) : (
        <p className="my-8">Your cart is empty.</p>
      )}
    </div>
  );
}
