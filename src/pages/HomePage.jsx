import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FeaturedSection from "../components/FeaturedSection";

const HomePage = () => {
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
    <main className="py-16 mx-auto">
      <FeaturedSection />
      <section className="container-default mt-8" id="products">
        <h1 className="text-3xl mb-8">Products</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
