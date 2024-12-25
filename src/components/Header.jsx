import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="fixed z-[999] top-0 right-0 left-0 p-4 px-8 border-zinc-200 shadow-sm shadow-zinc-200 backdrop-blur-lg bg-white/80">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Store</Link>
          </li>
          <li className="ml-auto"></li>
          {auth.user ? (
            <>
              {auth.user.role === "admin" && (
                <li>
                  <Link to={"/admin"}>Admin</Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
