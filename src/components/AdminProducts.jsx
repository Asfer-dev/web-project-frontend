import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProductDeleteButton from "./buttons/ProductDeleteButton";
import ProductEditButton from "./buttons/ProductEditButton";
import PrimaryButton from "./buttons/PrimaryButton";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <AdminPanel>
      <h2 className="text-2xl mb-4">Products</h2>
      <Link className="pl-1" to={"/admin/products/new-product"}>
        <PrimaryButton>New Product</PrimaryButton>
      </Link>
      <div>
        {/* PRODUCTS TABLE */}
        {loading ? (
          <div className="my-8 flex flex-col gap-4 items-center">
            <Loader2 className="animate-spin w-4 h-4" />
            <p className="text-neutral-700 font-medium">Loading Products</p>
          </div>
        ) : (
          <>
            <div className="max-h-screen overflow-y-auto p-1">
              <table className="basic mt-2 ">
                <thead>
                  <tr>
                    <td>Product Name</td>
                    <td>Category</td>
                    {/* <td>Actions</td> */}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td className="flex flex-col sm:flex-row gap-2 justify-end">
                        <div>
                          <ProductEditButton productId={product._id} />
                        </div>
                        <div>
                          <ProductDeleteButton />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminPanel>
  );
};

export default AdminProducts;
