import React, { useEffect, useState } from "react";
import UserPanel from "./UserPanel";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

const UserManageOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        console.log(data);
        setUserOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserOrders();
  }, [auth.user]);
  return (
    <UserPanel>
      <h2 className="text-3xl mb-8">Placed Orders</h2>
      {userOrders.length === 0 ? (
        <div className="text-center my-20 text-zinc-600">
          No orders placed yet.{" "}
          <Link className="underline" to={"/"}>
            Browse products
          </Link>
        </div>
      ) : (
        <div>
          {userOrders.map((order) => (
            <OrderCard order={order} />
          ))}
        </div>
      )}
    </UserPanel>
  );
};

export default UserManageOrders;
