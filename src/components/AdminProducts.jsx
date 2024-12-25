import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProductEditButton from "./buttons/ProductEditButton";
import PrimaryButton from "./buttons/PrimaryButton";
import PopupModal from "./PopupModal";
import { useAuth } from "../contexts/authContext";

const AdminProducts = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState("");

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

  const handleProductDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/" + productToDeleteId,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.message}`);
      }
      const data = await response.json();
      setProducts((prev) =>
        prev.filter((product) => product._id !== productToDeleteId)
      );
      setProductToDeleteId("");
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  };
  return (
    <AdminPanel>
      <h2 className="text-3xl mb-4">Products</h2>
      <Link className="pl-1" to={"/admin/products/new-product"}>
        <PrimaryButton>New Product</PrimaryButton>
      </Link>
      <div>
        {/* PRODUCTS TABLE */}
        {loading ? (
          <div className="my-8 flex flex-col gap-4 items-center">
            <Loader2 className="animate-spin w-4 h-4" />
            <p className="text-neutral-700 font-medium">
              <Loader2 className="animate-spin w-6 h-6" /> Loading Products
            </p>
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
                          <PrimaryButton
                            className={"px-3 py-2 bg-red-600 hover:bg-red-700"}
                            handleClick={() => {
                              setProductToDeleteId(product._id);
                              setPopupVisible((prev) => !prev);
                            }}
                          >
                            Delete
                          </PrimaryButton>
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

      <PopupModal
        message={"Are you sure you want to delete this Product?"}
        isVisible={popupVisible}
        handleAccept={handleProductDelete}
        closeModal={() => setPopupVisible(false)}
      />
    </AdminPanel>
  );
};

export default AdminProducts;
