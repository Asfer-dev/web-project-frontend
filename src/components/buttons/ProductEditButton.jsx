import { FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

const ProductEditButton = ({ productId }) => {
  return (
    <Link to={`/admin/products/edit-product/${productId}`}>
      <button
        type="button"
        className="px-3 py-2 flex gap-2 items-center text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <FilePenLine className="h-4 w-4" />
        Edit
      </button>
    </Link>
  );
};

export default ProductEditButton;
