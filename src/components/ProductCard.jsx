import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 p-2 border border-zinc-200 w-fit">
      <div className="h-[250px] w-fit mx-auto bg-red-300">
        <img
          className="h-full object-cover"
          src="https://media.istockphoto.com/id/1225779005/vector/glasses-icon.jpg?s=612x612&w=0&k=20&c=C_Kh4DMhrBM1zqtkOjgYcnDtQNw8hZEJQhdYkb9Srtg="
          alt={product.name}
        />
      </div>
      <p className="text-lg">{product.name}</p>
      <p className="font-medium">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
