import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { ChartColumnBig, ListChecks, Package, Shapes } from "lucide-react";

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
  const linkStyles =
    "flex gap-2 items-center px-2 py-1 rounded-md hover:bg-zinc-100";
  const activeLinkStyles = linkStyles + " bg-zinc-200/80";

  return (
    <main className="pt-20 container-default">
      <h1 className="text-3xl mb-8">Admin Panel</h1>
      <div className="flex gap-4 border-y border-zinc-200">
        <aside className="border-r border-zinc-200 p-4 min-w-[200px] min-h-[calc(100vh-6rem)]">
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
                  <ChartColumnBig className="h-5 w-5" />
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
                  <Package className="h-5 w-5" />
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
                  <Shapes className="h-5 w-5" />
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
                  <ListChecks className="h-5 w-5" />
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
