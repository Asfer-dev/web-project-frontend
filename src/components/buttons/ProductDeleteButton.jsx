import React from "react";

const ProductDeleteButton = () => {
  return (
    <button
      type="button"
      class="px-3 py-2 text-sm focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-md dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
    >
      Delete
    </button>
  );
};

export default ProductDeleteButton;
