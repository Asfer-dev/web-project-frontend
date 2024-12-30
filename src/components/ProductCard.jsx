import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import OutlineButton from "./buttons/OutlineButton";
import SecondaryButton from "./buttons/SecondaryButton";

const ProductCard = ({ product, isCartProduct }) => {
  const {
    cart,
    addProductToCart,
    subtractProductQuantityFromCart,
    removeProductFromCart,
  } = useCart();
  const getCartProductQuantity = (productId) => {
    return cart.filter((prodId) => prodId === productId).length;
  };
  return (
    <div className="flex flex-col items-center gap-1 p-2 border-zinc-200 w-fit">
      <Link to={`/products/${product._id}`}>
        <div className="w-[220px] mx-auto">
          <img
            className="w-full aspect-square object-contain block rounded-lg hover:scale-110 transition duration-300 cursor-pointer"
            src={`http://localhost:3000/${product.images[0]}`}
            alt={product.name}
          />
        </div>
      </Link>
      <Link to={`/products/${product._id}`}>
        <p className="product-title text-xl mt-1 transition duration-200 relative overflow-hidden">
          {product.name}
        </p>
      </Link>
      {isCartProduct && (
        <div className="flex gap-3 items-center my-1">
          <OutlineButton
            className={
              "p-0 w-8 h-8 rounded-full hover:bg-red-700 mb-0 me-0 invisible"
            }
          >
            X
          </OutlineButton>
          <SecondaryButton
            handleClick={() => subtractProductQuantityFromCart(product._id)}
            className="rounded-full p-0 w-8 h-8 flex items-center justify-center bg-zinc-100 border border-zinc-300/60"
          >
            -
          </SecondaryButton>
          <span>{product.quantity}</span>
          <SecondaryButton
            handleClick={() => addProductToCart(product._id)}
            className="rounded-full p-0 w-8 h-8 flex items-center justify-center bg-zinc-100 border border-zinc-300/60"
          >
            +
          </SecondaryButton>
          <OutlineButton
            handleClick={() => removeProductFromCart(product._id)}
            className={"p-0 w-8 h-8 rounded-full hover:bg-red-700 mb-0 me-0"}
          >
            X
          </OutlineButton>
        </div>
      )}
      <p className="font-bold text-zinc-600">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
