import { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Single onChange handler for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for the form
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Clear the error if form is valid
    setError("");

    // Example of submitting form (you can replace this with your API call)
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);

    // Reset form data after successful submit (optional)
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <main className="p-4 py-16 min-h-screen">
      <form className="max-w-sm mx-auto pt-12" onSubmit={handleSubmit}>
        <h1 className="text-3xl mb-2">Sign up</h1>
        <p className="mb-6 text-zinc-500">Register as a new user</p>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Full Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm your password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-start mb-5">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Already have an account?{" "}
            <Link className="underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
        <PrimaryButton>Register</PrimaryButton>
      </form>
    </main>
  );
};

export default RegisterPage;
