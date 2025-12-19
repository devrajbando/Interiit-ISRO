import React, { useEffect } from 'react';
import { useTheme } from '../Context/theme/Themecontext.jsx';

const GoogleSignIn = ({ onSuccess, onError }) => {
  const { darkMode } = useTheme();
    const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const backend_endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
// console.log("GoogleSignIn component rendered with backend endpoint:", backend_endpoint);
  const handleCredentialResponse = async (response) => {
    try {
      const credential = response.credential;
      console.log('hello')
      const result = await fetch(
        `${backend_endpoint}/api/users/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify({ credential }),
        }
      );
      console.log("Google Sign-In response received from backend.");
      const data=await result.json();
    
      console.log("Raw Backend Response:", data);
    //   let data;

      

      if (!result.ok) {
        throw new Error(data.message || "Google login failed");
      }

      console.log("Backend Response:", data);
      onSuccess?.(data);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      onError?.(error);
    }
  };

  useEffect(() => {
    // Wait for Google API to load
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: client_id,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        //   login_uri: `${backend_endpoint}/api/users/google-login`,
        });

        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: darkMode ? 'filled_black' : 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          }
        );
      }
    };

    // Check if script is loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      // Wait for script to load
      window.addEventListener('load', initializeGoogleSignIn);
      return () => window.removeEventListener('load', initializeGoogleSignIn);
    }
  }, [darkMode, backend_endpoint]);

  // Decode JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignIn;