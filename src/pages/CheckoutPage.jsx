import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Loader2 } from "lucide-react";
import { useCart } from "../contexts/cartContext";

const CheckoutPage = () => {
  const { auth } = useAuth();
  const { cart, resetCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    postal: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Single onChange handler for all input fields except property inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    // // Simple validation for the form
    // if (!formData.name || !formData.price || formData.images.length === 0) {
    //   setError("Product name, price and atleast 1 image is required.");
    //   return;
    // }

    // Clear the error if form is valid
    setError("");

    const cartSet = new Set(cart);
    const line_items = Array.from(cartSet).map((prodId) => ({
      productId: prodId,
      quantity: cart.filter((pid) => pid === prodId).length,
    }));

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        body: JSON.stringify({ ...formData, line_items }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.message}`);
      }
      const data = await response.json();

      // // Reset form data after successful submit
      // setFormData({
      //   name: "",
      //   category: "",
      //   images: [],
      // });

      resetCart();
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container-default pt-20">
      <h1 className="text-3xl mb-8">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5 flex gap-4">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="City"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="postal"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Postal code
            </label>
            <input
              type="text"
              id="postal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Postal code"
              required
              name="postal"
              value={formData.postal}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Country"
            required
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {submitting && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          Save
        </button>
        <p className="text-red-500">{error}</p>
      </form>
    </main>
  );
};

export default CheckoutPage;
