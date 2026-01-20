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
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-indigo-500/30 transition-all">
            T
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            TaskMaster
          </span>
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-700">
                  {user.name}
                </span>
                <span className="text-xs text-slate-400">Free Plan</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/"
                className="text-slate-600 font-medium hover:text-indigo-600 transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
