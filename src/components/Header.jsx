import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useCart } from "../contexts/cartContext";
import {
  BookHeart,
  LogOut,
  Package,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import PillButton from "./buttons/PillButton";
import { useState } from "react";
import { cn } from "../lib/utils";
import Logo from "./Logo";
import CartBox from "./CartBox";

const Header = () => {
  const { auth, logout } = useAuth();
  const { cart, cartBoxVisible, setCartBoxVisible } = useCart();
  const navigate = useNavigate();

  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  return (
    <div className="fixed z-[999] top-0 right-0 left-0 py-2 px-8 border-zinc-200 shadow-sm shadow-zinc-200 backdrop-blur-lg bg-white/80">
      <nav>
        <ul className="flex gap-4 items-center">
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li className="ml-auto"></li>
          <li className="flex items-center mx-2 mt-2">
            <button
              onClick={() => setCartBoxVisible((prev) => !prev)}
              className="inline-block relative"
            >
              <span className="sr-only">Cart</span> <ShoppingCart />{" "}
              <span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-black text-white text-sm flex items-center justify-center">
                {new Set(cart).size}
              </span>
            </button>
            <CartBox
              cartVisible={cartBoxVisible}
              setCartVisible={setCartBoxVisible}
            />
          </li>
          {auth.user ? (
            <>
              {auth.user.role === "admin" && (
                <li>
                  <Link to={"/admin"}>
                    <PillButton variant={"black"}>✨Admin</PillButton>
                  </Link>
                </li>
              )}
              <li className="relative">
                <PillButton
                  handleClick={() => setAccountDropdownVisible((prev) => !prev)}
                  className={"flex gap-2 items-center"}
                  variant={"light"}
                >
                  <UserRound className="h-5 w-5" /> {auth.user.name}{" "}
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </PillButton>

                {/* <!-- Dropdown menu --> */}
                <div
                  className={cn(
                    "absolute top-12",
                    !accountDropdownVisible && "hidden"
                  )}
                >
                  <div
                    id="dropdownDivider"
                    className={cn(
                      "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600",
                      !accountDropdownVisible && "hidden"
                    )}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li>
                        <Link
                          to="/user"
                          className="px-4 flex gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setAccountDropdownVisible(false)}
                        >
                          <button
                            className="flex gap-2"
                            onClick={() => setAccountDropdownVisible(false)}
                          >
                            <BookHeart className="h-5 w-5" />
                            Wishlist
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="user/orders"
                          className="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setAccountDropdownVisible(false)}
                        >
                          <button
                            className="flex gap-2"
                            onClick={() => setAccountDropdownVisible(false)}
                          >
                            <Package className="h-5 w-5" />
                            Orders
                          </button>
                        </Link>
                      </li>
                    </ul>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="flex gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {/* <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <PillButton variant={"light"}>Logout</PillButton>
                </button>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <PillButton variant={"light"}>Login</PillButton>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <PillButton variant={"black"}>Register</PillButton>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
