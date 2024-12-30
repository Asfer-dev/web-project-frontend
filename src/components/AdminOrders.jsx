import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import { Loader2 } from "lucide-react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/orders");
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
        setError(
          error.message ? error.message : "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <AdminPanel>
      <h2 className="text-3xl mb-4">Orders</h2>
      <div>
        {/* ORDERS TABLE */}
        {loading ? (
          <div className="my-8 flex flex-col gap-4 items-center">
            <p className="text-neutral-700 font-medium flex gap-2 items-center">
              <Loader2 className="animate-spin w-6 h-6" /> Loading Orders
            </p>
          </div>
        ) : (
          <>
            <div className="max-h-screen overflow-y-auto p-1">
              {orders.length === 0 ? (
                <div className="text-center my-8">No orders found</div>
              ) : (
                <table className="basic mt-2 ">
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Ordered by</td>
                      <td>Email</td>
                      <td>Item count</td>
                      {/* <td>Actions</td> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.line_items.length}</td>
                        <td className="flex flex-col sm:flex-row gap-2 justify-end">
                          <div>
                            <Link to={`/admin/orders/${order._id}`}>
                              <SecondaryButton
                                className={"px-3 py-2 mb-0 me-0"}
                              >
                                Manage
                              </SecondaryButton>
                            </Link>
                          </div>
                          <div>
                            <PrimaryButton
                              className={
                                "px-3 py-2 bg-red-600 hover:bg-red-700"
                              }
                              handleClick={() => {
                                // setOrderToDeleteId(order._id);
                                // setPopupVisible((prev) => !prev);
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
              )}
            </div>
          </>
        )}
      </div>
    </AdminPanel>
  );
};

export default AdminOrders;
