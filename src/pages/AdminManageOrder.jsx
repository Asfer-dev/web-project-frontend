import React, { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/authContext";

const AdminManageOrder = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({
    name: "",
    email: "",
  });
  const [orderProducts, setOrderProducts] = useState([]);

  const [formData, setFormData] = useState({
    completed: false,
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOrderProducts = async () => {
      const productIds = order.line_items?.map((item) => item.productId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/get-cart-products`,
          {
            method: "POST",
            body: JSON.stringify(productIds),
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
        console.log(data);
        setOrderProducts(data);
        setFormData((prev) => ({ ...prev, completed: data.completed }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
    fetchOrderProducts();
  }, [order.name]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/orders/" + order._id,
        {
          method: "PUT",
          body: JSON.stringify({ ...order, completed: formData.completed }),
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

      navigate("/admin/orders");
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  }

  return (
    <AdminPanel>
      <h2 className="text-3xl mb-4">Order ID # {order._id}</h2>
      <p className="text-lg font-medium text-zinc-700 mb-4">
        Order placed by: {order.name}
      </p>
      <div className=" mb-4">
        <h3 className="text-lg font-medium text-zinc-700">Contact and Email</h3>
        <p>{order.email}</p>
      </div>
      <h3 className="text-xl font-medium text-zinc-700 mb-4">
        Items Information
      </h3>
      <div>
        {orderProducts.length > 0 &&
          orderProducts.map((product) => (
            <div className="flex gap-2 items-center">
              <img
                className="inline-block h-10 border border-zinc-200"
                src={`http://localhost:3000${product.images[0]}`}
                alt=""
              />
              <p>
                {
                  order.line_items.find(
                    (item) => item.productId === product._id
                  )?.quantity
                }{" "}
                X {product.name}
              </p>
            </div>
          ))}
      </div>

      <form className="my-4" onSubmit={handleSubmit}>
        <div class="flex items-center mb-4">
          <input
            checked={formData.completed}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                completed: e.target.checked,
              }));
            }}
            id="default-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            className="ms-2 text-sm text-gray-900 dark:text-gray-300"
          >
            Completed
          </label>
        </div>
        <PrimaryButton type={"submit"} className={"flex gap-2 items-center"}>
          {/* {submitting && <Loader2 className="animate-spin mr-2 w-4 h-4" />} */}
          Save
        </PrimaryButton>
      </form>
    </AdminPanel>
  );
};

export default AdminManageOrder;
