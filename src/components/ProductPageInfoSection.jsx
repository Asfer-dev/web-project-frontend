import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";
import SecondaryButton from "./buttons/SecondaryButton";
import { useWishlist } from "../contexts/wishlistContext";
import { Heart, MoveRight, ShoppingCart } from "lucide-react";
import PrimaryButton from "./buttons/PrimaryButton";
import { cn } from "../lib/utils";

export default function ProductPageInfoSection({ product }) {
  console.log(product);
  const { addProductToCart } = useCart();
  const { wishlist, addProductToWishlist, removeProductFromWishlist } =
    useWishlist();

  const [size, setSize] = useState("");
  const [dimensions, setDimensions] = useState("");

  useEffect(() => {
    const sizeValue = product?.properties?.find(
      (prop) => prop.name.toLowerCase() === "size"
    )?.value;
    setSize(sizeValue);

    const frameSize = product?.properties?.find(
      (prop) => prop.name.toLowerCase() === "dimensions"
    )?.value;
    setDimensions(frameSize);
  }, [product]);

  const [addedToCart, setAddedToCart] = useState(false);

  const btnCartStyles =
    "p-3 font-semibold border-2 border-blue-500 hover:bg-blue-500 w-full hover:text-white transition duration-200 mt-6 mb-4 rounded-lg";

  return (
    <div className="p-4">
      <h2 className="font-medium text-4xl mb-4">{product.name}</h2>
      <p className="mb-4 whitespace-pre-wrap text-justify">
        {product.use_category_description
          ? product.category?.description
          : product.description}
      </p>
      <p className="font-semibold text-xl mb-4">
        <span className="font-semibold">Rs. {product.price}.00</span>
      </p>
      <hr />
      {/* <button
        onClick={() => {
          addProductToCart(product._id);
          setAddedToCart(true);
          setTimeout(() => {
            setAddedToCart(false);
          }, 3000);
        }}
        disabled={addedToCart}
        className={
          addedToCart
            ? btnCartStyles +
              " bg-green-400 hover:bg-green-400 border-green-400 text-white"
            : btnCartStyles
        }
      >
        {addedToCart ? "ADDED TO CART!" : "ADD TO CART"}
      </button> */}
      <div className="flex gap-2 mt-6 mb-4 w-full">
        <PrimaryButton
          disabled={addedToCart}
          className={cn(
            " flex justify-center md:w-1/2 p-3",
            addedToCart &&
              "bg-green-600 hover:bg-green-600 focus:ring-green-300"
          )}
          handleClick={() => {
            addProductToCart(product._id);
            setAddedToCart(true);
            setTimeout(() => {
              setAddedToCart(false);
            }, 3000);
          }}
        >
          <div className={cn("flex gap-2 items-center text-lg")}>
            <ShoppingCart className="h-6 w-6" />
            {addedToCart ? "Added to Cart!" : "Add to Cart"}
          </div>
        </PrimaryButton>
        <SecondaryButton
          className={"rounded-full w-12 h-12 flex justify-center items-center"}
          handleClick={() => {
            if (wishlist.includes(product._id)) {
              removeProductFromWishlist(product._id);
            } else {
              addProductToWishlist(product._id);
            }
          }}
        >
          {wishlist.includes(product._id) ? (
            <div>
              <span className="sr-only">Remove from Wishlist</span>{" "}
              <Heart className="w-6 h-6 text-red-500" fill="#ef4444" />
            </div>
          ) : (
            <div>
              <span className="sr-only">Add to Wishlist</span>{" "}
              <Heart className="w-6 h-6 text-red-500" />
            </div>
          )}
        </SecondaryButton>
      </div>
      <Link to={"/checkout"}>
        <button
          onClick={() => addProductToCart(product._id)}
          className="p-3 flex gap-2 justify-center items-center font-semibold bg-neutral-800 hover:bg-black w-full text-white transition duration-200 mb-4 rounded-lg"
        >
          BUY NOW
        </button>
      </Link>
    </div>
  );
}
