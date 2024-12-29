import { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import { Link } from "react-router-dom";
import { FilePenLine, Loader2, Trash2 } from "lucide-react";
import ProductDeleteButton from "./buttons/ProductDeleteButton";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import OutlineButton from "./buttons/OutlineButton";
import { useAuth } from "../contexts/authContext";
import PopupModal from "./PopupModal";

const AdminCategories = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    parent: null,
    properties: [],
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const [popupVisible, setPopupVisible] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Single onChange handler for all input fields except property inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the correct field
    }));
  };

  const handlePropertyChange = (e) => {
    const index = parseInt(e.target.name.split("-")[1]);
    setFormData((prev) => {
      const newProperties = prev.properties;
      newProperties.find((prop, i) => i === index).name = e.target.value;
      return { ...prev, properties: newProperties };
    });
  };

  const createCategory = async () => {
    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        body: JSON.stringify(formData),
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

      // Reset form data after successful submit
      setFormData({
        name: "",
        parent: "",
        properties: [],
        description: "",
      });
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };
  const updateCategory = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(
        "http://localhost:3000/api/categories/" + formData._id,
        {
          method: "PUT",
          body: JSON.stringify(formData),
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

      // Reset form data after successful submit
      setFormData({
        name: "",
        parent: "",
        properties: [],
        description: "",
      });
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
      setIsEditing(false);
    }
  };
  const enableEdit = async (id) => {
    setIsEditing(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/categories/" + id
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.message}`);
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  };

  const handleCategoryDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/categories/" + categoryToDeleteId,
        {
          method: "DELETE",
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
      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryToDeleteId)
      );
      setCategoryToDeleteId("");
    } catch (error) {
      console.log(error);
      setError(
        error.message ? error.message : "An error occurred. Please try again."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Category name is required");
      return;
    }
    if (isEditing) updateCategory();
    else createCategory();
  };

  return (
    <AdminPanel>
      <h2 className="text-3xl mb-4">Categories</h2>

      {/* CATEGORY FORM */}
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl mb-4">
          {isEditing ? "Edit Category" : "Add a new Category"}
        </h3>
        <div className="flex gap-4">
          <div className="mb-5 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Category name"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="parent"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Parent Category
            </label>
            <select
              onChange={handleChange}
              id="parent"
              name="parent"
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
        </div>
        <div className="mb-5">
          {formData.properties.map((property, index) => (
            <div className="flex gap-2 mb-4 items-center">
              <input
                type="text"
                id={`property-${index}`}
                className="w-1/2 md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Property"
                required
                name={`property-${index}`}
                onChange={handlePropertyChange}
                value={property.name}
              />
              <OutlineButton
                handleClick={() => {
                  setFormData((prev) => {
                    const newProperties = prev.properties;
                    newProperties.splice(index, 1);
                    return { ...prev, properties: newProperties };
                  });
                }}
                className={"mb-0"}
              >
                Remove
              </OutlineButton>
            </div>
          ))}
          <SecondaryButton
            handleClick={() => {
              setFormData((prev) => ({
                ...prev,
                properties: [...prev.properties, { name: "", values: [] }],
              }));
            }}
          >
            New property
          </SecondaryButton>
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full whitespace-pre text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description.."
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <PrimaryButton>
          {submitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />} Save
        </PrimaryButton>
        <p className="text-red-500">{error}</p>
      </form>
      <div>
        {/* CATEGORIES TABLE */}
        {loading ? (
          <div className="my-8 flex flex-col gap-4 items-center">
            <Loader2 className="animate-spin w-4 h-4" />
            <p className="text-neutral-700 font-medium">
              <Loader2 className="animate-spin w-6 h-6" /> Loading Categories
            </p>
          </div>
        ) : (
          <>
            <div className="max-h-screen overflow-y-auto p-1">
              <table className="basic mt-2 ">
                <thead>
                  <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    {/* <td>Actions</td> */}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>{category.parent?.name}</td>
                      <td className="flex flex-col sm:flex-row gap-2 justify-end">
                        <div>
                          <SecondaryButton
                            handleClick={() => {
                              enableEdit(category._id);
                            }}
                            className={
                              "px-3 py-2 mb-0 me-0 flex gap-2 items-center"
                            }
                          >
                            <FilePenLine className="h-4 w-4" />
                            Edit
                          </SecondaryButton>
                        </div>
                        <div>
                          <PrimaryButton
                            className={
                              "px-3 py-2 flex gap-2 items-center bg-red-600 hover:bg-red-700"
                            }
                            handleClick={() => {
                              setCategoryToDeleteId(category._id);
                              setPopupVisible((prev) => !prev);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </PrimaryButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <PopupModal
        message={"Are you sure you want to delete this Category?"}
        isVisible={popupVisible}
        handleAccept={handleCategoryDelete}
        closeModal={() => setPopupVisible(false)}
      />
    </AdminPanel>
  );
};

export default AdminCategories;
