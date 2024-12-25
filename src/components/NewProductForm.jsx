import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./buttons/PrimaryButton";

const NewProductForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    properties: [],
    images: [],
    imageFiles: [],
    price: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
        setError(
          error.message ? error.message : "An error occurred. Please try again."
        );
      }
    };
    fetchCategories();
  }, []);

  const getCategory = () => {
    return categories.find((cat) => cat._id === formData.category);
  };

  // Single onChange handler for all input fields except property inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const handlePropertyChange = (e) => {
    const newProperty = { name: e.target.name, value: e.target.value };
    const existingProperty = formData.properties.find(
      (prop) => prop.name === newProperty.name
    );
    if (existingProperty) {
      existingProperty.value = newProperty.value;
    } else {
      setFormData((prev) => ({
        ...prev,
        properties: [...prev.properties, newProperty],
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
    }));

    const fileUrls = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews((prev) => [...prev, ...fileUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for the form
    if (!formData.name || !formData.price || formData.imageFiles.length === 0) {
      setError("Product name, price and atleast 1 image is required.");
      return;
    }
    const productPrice = parseInt(formData.price);

    // Clear the error if form is valid
    setError("");

    const formPayload = new FormData();

    // Append text fields to FormData
    for (const key in formData) {
      if (key === "imageFiles") {
        // Special handling for the files array
        formData[key].forEach((file) => {
          formPayload.append("imageFiles", file); // Append each file
        });
      } else if (key === "properties") {
        formPayload.append(key, JSON.stringify(formData[key]));
      } else {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formPayload,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.message}`);
      }
      const data = await response.json();

      // Reset form data after successful submit
      setFormData({
        name: "",
        category: "",
        images: [],
      });

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  };
  return (
    <AdminPanel>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl mb-2">Add a new Product</h1>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Category
          </label>
          <select
            onChange={handleChange}
            id="category"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>No category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Properties
          </label>
          {getCategory() != null &&
            getCategory().properties.map((property) => (
              <div className="pl-8">
                <label
                  htmlFor={property.name}
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  {property.name}
                </label>
                <input
                  type="text"
                  id={property.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Product name"
                  required
                  name={property.name}
                  onChange={handlePropertyChange}
                  list={`${property.name}-values`}
                />
                <datalist id={`${property.name}-values`}>
                  {property.values.map((value) => (
                    <option value={value} />
                  ))}
                </datalist>
              </div>
            ))}
        </div>
        <div className="mb-5">
          <label className="block mb-2text-sm font-medium text-gray-900 dark:text-white">
            Images
          </label>
          <input
            class="block w-full sm:w-[300px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleImageChange}
            multiple
          ></input>
          <div className="flex flex-wrap gap-2 my-2">
            {imagePreviews.map((url) => (
              <img className="h-[200px]" src={url} alt="" />
            ))}
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product description
          </label>
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description.."
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Price in rupees"
            required
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <PrimaryButton>Submit</PrimaryButton>
        <p className="text-red-500">{error}</p>
      </form>
    </AdminPanel>
  );
};

export default NewProductForm;
