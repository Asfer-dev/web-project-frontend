import OrderItemsCard from "./OrderItemsCard";
import { getProductIds } from "../lib/utils";

const OrderCard = ({ order }) => {
  return (
    <div className="p-4 border rounded-lg w-full sm:w-[300px] shadow-md shadow-zinc-100">
      <h3 className="font-medium mb-4">ORDER ID # {order.order_no}</h3>
      <OrderItemsCard productIds={getProductIds(order.line_items)} />
      <div className=" mb-4">
        <h3 className="text-sm font-medium text-zinc-600">Contact and Email</h3>
        <p className="text-sm ml-2">{order.email}</p>
      </div>
      <div className=" mb-4">
        <h3 className="text-sm font-medium text-zinc-600">Address</h3>
        <p className="text-sm ml-2">
          {order.address}, {order.city}, {order.postal}, {order.country}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
