import { useContext, useEffect, useState } from "react";
import { Sun, Moon, LogIn, User,LogOut, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import Isro from "../assets/ISRO-Color.svg";
import { useTheme } from "../Context/theme/Themecontext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { user,setUser } = useAuthContext();
  const { darkMode, toggleTheme } = useTheme();
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);


  const logoutUser = async() => {
    
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_ENDPOINT
      const response = await fetch(`${apiUrl}/api/users/logout`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id,
            }),
        });

        if (!response.ok) {
           
            window.alert('Failed to Logout');
            return;
        }

        const data = await response.json();
        console.log(data);

        if (data.statusCode == 200) {
            console.log('Logout successful');
            
            setUser(null)
            window.alert('Logout successful');
            navigate('/');
        } else {
            window.alert('Please try again');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        window.alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`top-0 left-0 right-0 z-50 transition-all duration-300
         ${
           darkMode
             ? "bg-gray-900 backdrop-blur-lg shadow-lg"
             : "bg-gray-300 backdrop-blur-lg shadow-lg"
         }
      `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="focus:outline-none cursor-pointer"
              >
                <img src={Isro} alt="Logo" className="w-20 h-20" />
              </button>
              <button onClick={() => navigate("/")}>
                <span
                  className={`text-xl text-left font-bold block  cursor-pointer ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  GeoNLI
                </span>
                <span
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Inter IIT Tech Meet 14.0
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4">
           

              {/* Theme Toggle Button */}
              <div className="relative">
                <button
                  onMouseEnter={() => setHoveredButton('theme')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={toggleTheme}
                  className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transform hover:scale-110`}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                {hoveredButton === 'theme' && (
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
                    darkMode 
                      ? 'bg-gray-800 text-white border border-gray-700' 
                      : 'bg-gray-800 text-white border border-gray-700'
                  }`}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-4 border-transparent ${
                      darkMode ? 'border-b-gray-800' : 'border-b-gray-800'
                    }`} />
                  </div>
                )}
              </div>
              
              {/* Dashboard/Login Button */}
              <div className="relative">
                <button
                  onMouseEnter={() => setHoveredButton('auth')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={user ? () => navigate("/dashboard") : () => navigate("/auth")}
                  className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transform hover:scale-110`}
                >
                  {user ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <LogIn className="w-5 h-5" />
                  )}
                </button>
                {hoveredButton === 'auth' && (
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
                    darkMode 
                      ? 'bg-gray-800 text-white border border-gray-700' 
                      : 'bg-gray-800 text-white border border-gray-700'
                  }`}>
                    {user ? 'Go to Dashboard' : 'Login'}
                    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-4 border-transparent ${
                      darkMode ? 'border-b-gray-800' : 'border-b-gray-800'
                    }`} />
                  </div>
                )}
              </div>

              {/* Logout Button */}
              {user && (
                <div className="relative">
                  <button
                    onMouseEnter={() => setHoveredButton('logout')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => logoutUser()}
                    className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transform hover:scale-110`}
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                  {hoveredButton === 'logout' && (
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
                      darkMode 
                        ? 'bg-gray-800 text-white border border-gray-700' 
                        : 'bg-gray-800 text-white border border-gray-700'
                    }`}>
                      Logout
                      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-4 border-transparent ${
                        darkMode ? 'border-b-gray-800' : 'border-b-gray-800'
                      }`} />
                    </div>
                  )}
                </div>
              )}


            </div>
          </div>
        </div>
      </nav>
    </>
  );
}