import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPagePhotoSection from "../components/ProductPagePhotoSection";
import ProductPageInfoSection from "../components/ProductPageInfoSection";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    properties: [],
    images: [],
    imageFiles: [],
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(`${data.message}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
        setError(
          error.message ? error.message : "An error occurred. Please try again."
        );
      }
    };
    fetchProductData();
  }, []);

  return (
    <main className="py-20 container-wide">
      <section className="grid md:grid-cols-2 gap-12">
        <ProductPagePhotoSection product={product} />
        <ProductPageInfoSection product={product} />
      </section>
      <section className="mt-12">
        <div className="mx-auto w-1/2 mb-6">
          <hr />
        </div>
        <h1 className="text-center mb-8 font-medium text-2xl">Details</h1>
        <table className="mx-auto -mt-4 font-medium w-full md:w-1/2 border text-gray-700">
          {product?.properties?.map((property) => (
            <tr
              className="odd:bg-neutral-100 even:bg-neutral-50"
              key={property.name}
            >
              <td className="p-3">{property.name}</td>
              <td className="p-3 font-semibold">
                {property.value === "" ? "N/A" : property.value}
              </td>
            </tr>
          ))}
        </table>
      </section>
    </main>
  );
}
