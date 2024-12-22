import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Store</Link>
          </li>
          <li className="ml-auto">
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
