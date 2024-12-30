import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderItemsCard = ({ productIds }) => {
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
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
        const updatedData = data.map((product) => ({
          ...product,
          quantity: productIds.filter((pid) => pid === product._id).length,
        }));
        setOrderProducts(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderProducts();
  }, []);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-zinc-600 mb-2">Ordered Items</h3>
      {orderProducts.length > 0 &&
        orderProducts.map((product) => (
          <div className="flex gap-2 items-center">
            <p className="flex items-center gap-2">
              <span>{product.quantity}</span>X
              <Link
                to={`/products/${product._id}`}
                className="flex items-center gap-2"
              >
                <img
                  className="inline-block h-9  border-zinc-200"
                  src={`http://localhost:3000${product.images[0]}`}
                  alt=""
                />
                <span className="product-title inline-block transition duration-200 relative overflow-hidden">
                  {product.name}
                </span>
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
};

export default OrderItemsCard;
