import { useState } from "react";
import { useLogin } from "../services/useLogin";
import { Input, Button, Link} from "@nextui-org/react"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useLogin();

  const handleLogin = async () => {
    mutate({ username, password });
  };

  return (
    <div className="flex h-fit items-center">
      <div className="hidden w-1/2 lg:block">
        <img src="src/assets/image/promo-image.jpg" alt="Promo image" />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/3 lg:ml-0 ml-20 mr-20 flex flex-col allign-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Acceder</h1>
          <p>¿No tienes cuenta? <Link href="/signup">Crea una</Link></p>
        </div>
        <div className="items-center py-10">
          <Input
            type="text"
            label="Usuario"
            onChange={(e) => setUsername(e.target.value)}
            className="py-4"
          />
          <Input
            type="password"
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="py-4"
          />
          <Button color="primary" fullWidth onClick={handleLogin}>Iniciar Sesión</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;
