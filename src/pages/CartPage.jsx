import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import OutlineButton from "../components/buttons/OutlineButton";
import { MoveRight } from "lucide-react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { cart, resetCart } = useCart();

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

  function calculateTotal() {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }

  return (
    <main className="container-default pt-20">
      <h1 className="text-3xl mb-8">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <div className="text-center my-20 text-zinc-600">
          Your shopping cart is empty.{" "}
          <Link className="underline" to={"/"}>
            Browse products
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {cartProducts.map((product) => (
            <ProductCard product={product} isCartProduct={true} />
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <>
          <div className="flex justify-between text-lg font-medium mt-4 mb-4 max-w-[300px] mx-auto">
            <span className="text-gray-900">Price sum:</span>
            <span className="text-gray-900">Rs. {calculateTotal()}</span>
          </div>
          <p className="mx-auto w-fit text-zinc-600 mb-8">
            Total bill calculated at Checkout
          </p>
          <div className="mx-auto w-fit flex gap-2 items-center">
            <OutlineButton
              handleClick={resetCart}
              className={"me-0 mb-0 hover:bg-red-700"}
            >
              Empty Cart
            </OutlineButton>
            <Link to={"/checkout"} className="">
              <PrimaryButton className={"flex gap-2 items-center"}>
                Proceed to Checkout <MoveRight className="" />{" "}
              </PrimaryButton>
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;
