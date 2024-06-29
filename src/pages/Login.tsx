import axios from "axios";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { login, useLogin } from "../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const { mutate, error, data } = useLogin();

  const handleLogin = async () => {
    mutate({ username, password });
  };
  console.log(auth?.currentUser);

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;