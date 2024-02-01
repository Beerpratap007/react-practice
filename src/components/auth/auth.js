import { useState } from "react";
import LoginForm from "./login";
import SignupForm from "./signup";

function AuthExample() {
    const [token, setToken] = useState('');
  
    const handleLogin = (token) => {
      setToken(token);
    };
  
    const handleSignup = (token) => {
      setToken(token);
    };
  
    return (
      <div>
        {token ? (
          <p>You are logged in!</p>
        ) : (
          <>
            <h2>Login</h2>
            <LoginForm onLogin={handleLogin} />
            <h2>Signup</h2>
            <SignupForm onSignup={handleSignup} />
          </>
        )}
      </div>
    );
  }
  export default AuthExample;