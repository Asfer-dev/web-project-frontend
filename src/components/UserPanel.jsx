import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { BookHeart, Package } from "lucide-react";

const UserPanel = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function isActiveLink(linkPath) {
    return location.pathname.startsWith(linkPath);
  }
  const linkStyles =
    "flex gap-2 items-center px-2 py-1 rounded-md hover:bg-zinc-100";
  const activeLinkStyles = linkStyles + " bg-zinc-200/80";

  return (
    <main className="pt-20 container-default">
      <h1 className="text-3xl mb-8">My Account</h1>
      <div className="flex gap-4 border-y border-zinc-200">
        <aside className="border-r border-zinc-200 p-4 min-w-[200px] min-h-[calc(100vh-6rem)]">
          <nav>
            <ul className="flex flex-col gap-2 text-lg">
              <li>
                <Link
                  className={
                    location.pathname === "/user"
                      ? activeLinkStyles
                      : linkStyles
                  }
                  to={"/user"}
                >
                  <BookHeart className="h-5 w-5" />
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  className={
                    isActiveLink("/user/orders") ? activeLinkStyles : linkStyles
                  }
                  to={"/user/orders"}
                >
                  <Package className="h-5 w-5" />
                  Orders
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="flex-1 py-4 pr-4">{children}</section>
      </div>
    </main>
  );
};

export default UserPanel;
