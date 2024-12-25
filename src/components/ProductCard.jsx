import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center gap-1 p-2 border-zinc-200 w-fit">
      <Link to={`/products/${product._id}`}>
        <div className="w-[220px] mx-auto">
          <img
            className="w-full aspect-square object-cover block rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
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
      <p className="font-medium">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
