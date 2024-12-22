import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    <div>
      <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-3xl mb-2">Sign up</h1>
        <p className="mb-6 text-zinc-500">Register as a new user</p>
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Full Name
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
            required
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div class="flex items-start mb-5">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-300">
            Already have an account?{" "}
            <Link className="underline" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
