import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const AdminPanel = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user || auth.user.role !== "admin") {
      navigate("/");
    }
  }, [auth]);

  function isActiveLink(linkPath) {
    return location.pathname.startsWith(linkPath);
  }
  const linkStyles = "block px-2 py-1 rounded-md hover:bg-zinc-100";
  const activeLinkStyles = linkStyles + " bg-zinc-200/80";

  return (
    <main className="p-4 pt-20 max-w-[1300px] mx-auto min-h-screen">
      <h1 className="text-3xl mb-8">Admin Panel</h1>
      <div className="flex gap-4 border-y border-zinc-200">
        <aside className="border-r border-zinc-200 p-4 min-w-[150px]">
          <nav>
            <ul className="flex flex-col gap-2 text-lg">
              <li>
                <Link
                  className={
                    location.pathname === "/admin"
                      ? activeLinkStyles
                      : linkStyles
                  }
                  to={"/admin"}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className={
                    isActiveLink("/admin/products")
                      ? activeLinkStyles
                      : linkStyles
                  }
                  to={"/admin/products"}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className={
                    isActiveLink("/admin/categories")
                      ? activeLinkStyles
                      : linkStyles
                  }
                  to={"/admin/categories"}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className={
                    isActiveLink("/admin/orders")
                      ? activeLinkStyles
                      : linkStyles
                  }
                  to={"/admin/orders"}
                >
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

export default AdminPanel;
