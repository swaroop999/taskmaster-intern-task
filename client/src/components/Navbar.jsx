import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Theme State
  const [darkMode, setDarkMode] = useState(false);

  // 2. Toggle Logic
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group">
          <img
            src="/task-icon.png"
            alt="TaskMaster Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-lg group-hover:shadow-indigo-500/30 transition-all"
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            TaskMaster
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* 3. Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              // Sun Icon (for Dark Mode)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              // Moon Icon (for Light Mode)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {user.name}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Free Plan
                </span>
              </div>
              <button
                onClick={onLogout}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 dark:hover:bg-slate-700 dark:hover:text-red-400 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-4">
              <Link
                to="/"
                className="text-slate-600 dark:text-slate-300 font-medium hover:text-indigo-600 transition px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-slate-900 dark:bg-indigo-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-lg text-xs sm:text-base"
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
