import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link
            to="/dashboard"
            className="text-xl lg:text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          >
            Task Manager
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Compact user info */}
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-medium">
                    {user.email.split("@")[0]}
                  </span>
                </div>

                {/* New Task button */}
                <Link
                  to="/tasks/new"
                  className="px-4 py-2 sm:px-6 md:px-8 rounded-full text-xs sm:text-sm md:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200 whitespace-nowrap"
                >
                  Add Task
                </Link>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login link */}
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-700 transition-all duration-200"
                >
                  Login
                </Link>

                {/* Register button */}
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>


        </div>
      </div>
    </nav>
  )
}

export default Navbar
