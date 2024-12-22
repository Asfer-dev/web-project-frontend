import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <section>
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 items-center justify-center">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
