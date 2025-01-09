// This context provider ensure critical auth related data
// is passed to all components without drilling

//React methods
import { createContext, useEffect, useState } from "react";

// Third-party UI components
import { Skeleton } from "@/components/ui/skeleton";

// API services
import {
  registerService,
  loginService,
  checkAuthService,
} from "@/services/index";

// Config data for courses forms
import { initialSignInFormData, initialSignUpFormData } from "@/config";

// Create context
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // Hooks
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  // Methods

  // Register new user
  async function handleRegisterUser(evt) {
    evt.preventDefault();
    const data = await registerService(signUpFormData);
    // To log in user directly after register:
    // Change response in server to pass email and password
    // set Signin form data with response (userEmail and password)
    // Call handleLoginUser
  }

  // Login user known in db
  async function handleLoginUser(evt) {
    evt.preventDefault();
    const data = await loginService(signInFormData);

    // If credeentials are valid, create a token 
    // and store it in sessions storage
    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
      setLoading(false);
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
      setLoading(false);
    }
  }

  // check auth
  async function checkAuth() {
    try {
      const data = await checkAuthService();

      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  // Log out 
  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  // When mounting for first time check token 
  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  // Wrap all children of this components in a context provider
  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
