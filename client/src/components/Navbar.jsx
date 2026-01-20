import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TaskMaster
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Hello, {user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/" className="hover:text-indigo-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-indigo-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
