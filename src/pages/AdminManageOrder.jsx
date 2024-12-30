import React, { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import OrderItemsCard from "../components/OrderItemsCard";
import { getProductIds } from "../lib/utils";

const AdminManageOrder = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState({
    name: "",
    email: "",
    line_items: [],
    address: "",
    city: "",
    country: "",
    postal: "",
  });

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
        setOrder(data);
        setFormData((prev) => ({ ...prev, completed: data.completed }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderData();
  }, []);

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
      <h2 className="text-3xl mb-4">Order ID # {order.order_no}</h2>
      <p className="text-lg font-medium text-zinc-700 mb-4">
        Order placed by: <b className="font-semibold">{order.name}</b>
      </p>
      <div className=" mb-4">
        <h3 className="text-sm font-medium text-zinc-600">Contact and Email</h3>
        <p>{order.email}</p>
      </div>
      <div className=" mb-4">
        <h3 className="text-sm font-medium text-zinc-600">Address</h3>
        <p>
          {order.address}, {order.city}, {order.postal}, {order.country}
        </p>
      </div>
      {order.line_items.length > 0 && (
        <OrderItemsCard productIds={getProductIds(order.line_items)} />
      )}

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
