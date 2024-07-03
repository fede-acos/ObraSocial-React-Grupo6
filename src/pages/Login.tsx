import { useState } from "react";
import { useLogin } from "../services/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useLogin();

  const handleLogin = async () => {
    mutate({ username, password });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-1/2 lg:block">
        <img src="src/assets/image/promo-image.png" />
      </div>
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
    </div>
  );
}

export default Login;
