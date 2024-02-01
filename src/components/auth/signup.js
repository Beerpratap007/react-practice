import { useState } from "react";

function SignupForm({ onSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://dummyjson.com/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        onSignup(data.token); // Assuming the response contains a token
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };
  
    return (
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    );
}
export default SignupForm;