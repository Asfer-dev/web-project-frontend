import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./contexts/authContext";
import AdminProducts from "./components/AdminProducts";
import AdminCategories from "./components/AdminCategories";
import AdminOrders from "./components/AdminOrders";
import NewProductForm from "./components/NewProductForm";
import EditProductForm from "./components/EditProductForm";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./contexts/cartContext";
import { WishlistProvider } from "./contexts/wishlistContext";
import UserPage from "./pages/UserPage";
import AdminManageOrder from "./pages/AdminManageOrder";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/categories" element={<AdminCategories />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route
                  path="/admin/orders/:id"
                  element={<AdminManageOrder />}
                />
                <Route
                  path="/admin/products/new-product"
                  element={<NewProductForm />}
                />
                <Route
                  path="/admin/products/edit-product/:id"
                  element={<EditProductForm />}
                />
              </Routes>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
