import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Rocket, ArrowRight } from 'lucide-react';
import { useTheme } from '../Context/theme/Themecontext';
import GoogleSignIn from '../Components/GoogleSignIn.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
const AuthPage = () => {
  const { darkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
   const { setUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
    const handleGoogleSuccess = (userData) => {
    console.log('Google Sign-In Success:', userData);
    setUser(userData.data.user);
    window.alert('Welcome, ' + userData.data.user.name);
    navigate('/');
  };

  const handleGoogleError = (error) => {
    console.error('Google Sign-In Failed:', error);
    alert('Google Sign-In failed. Please try again.');
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setLoading(false);
      // Handle login/signup logic here
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
          }`}>
            <Rocket className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          </div> */}
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ISRO GeoNLI
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Satellite Imagery Analysis Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className={`rounded-2xl shadow-2xl border-2 transition-all duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Toggle Tabs */}
          <div className={`flex p-2 rounded-t-2xl ${
            darkMode ? 'bg-gray-900/50' : 'bg-gray-50'
          }`}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? darkMode
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-orange-500 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? darkMode
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-orange-500 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              {/* Name Field (Sign Up Only) */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
                }`}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required={!isLogin}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                      darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                      darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-11 pr-11 py-3 rounded-xl border-2 outline-none transition-all ${
                      darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                    } transition-colors`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
                }`}
              >
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required={!isLogin}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                      darkMode
                        ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-orange-400'
                    }`}
                  />
                </div>
              </div>

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  {/* <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className={`w-4 h-4 rounded border-2 ${
                        darkMode
                          ? 'border-gray-700 bg-gray-900 checked:bg-orange-600'
                          : 'border-gray-300 bg-gray-50 checked:bg-orange-500'
                      }`}
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Remember me
                    </span>
                  </label> */}
                  <button
                    type="button"
                    className={`text-sm font-medium transition-colors ${
                      darkMode
                        ? 'text-orange-400 hover:text-orange-300'
                        : 'text-orange-600 hover:text-orange-700'
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className='flex gap-4 mt-8'>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                darkMode
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-orange-500 hover:bg-orange-600'
              } shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Login' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className='flex-1 items-center justify-center'>
              <GoogleSignIn
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
            </div>
          </form>
        </div>

        

        {/* Footer */}
        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={toggleMode}
            className={`font-semibold transition-colors ${
              darkMode
                ? 'text-orange-400 hover:text-orange-300'
                : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;