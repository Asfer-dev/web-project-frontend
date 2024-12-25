import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import PrimaryButton from "../components/buttons/PrimaryButton";

const LoginPage = () => {
  const { auth, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Single onChange handler for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct field
    }));
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for the form
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Clear the error if form is valid
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Specifies the request payload format
          Accept: "application/json", // Indicates you expect a JSON response
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.message}`);
      }
      const data = await response.json();
      login(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token
      );

      // Reset form data after successful submit (optional)
      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  };

  return (
    <main className="p-4 py-16 min-h-screen">
      <form className="max-w-sm mx-auto pt-12" onSubmit={handleSubmit}>
        <h1 className="text-3xl mb-2">Login</h1>
        <p className="mb-6 text-zinc-500">Login to your Account</p>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
            required
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <p className="text-red-500">{error}</p>
        <div className="flex items-start mb-5">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Don't have an account?{" "}
            <Link className="underline" to={"/register"}>
              Sign up
            </Link>
          </p>
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </form>
    </main>
  );
};

export default LoginPage;
