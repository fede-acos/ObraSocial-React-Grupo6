import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useRegister } from "../services/useRegister";
import { toast } from "react-toastify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroAfiliado, setNumeroAfiliado] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { mutate } = useRegister();

  const handleSignUp = async () => {
    if (username === "" || password === "" || nombre === "" || apellido === "" || numeroAfiliado === +'') {
      toast.error("Todos los campos son obligatorios");
    }
    else if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden");
    }
    else if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
    }
    else{
      mutate({ username, password, nombre, apellido, numeroAfiliado, direccion: "" });
    }
  };

  return (
    <div className="flex h-fit">
      <div className="hidden w-1/2 lg:block md:block">
        <img src="src/assets/image/promo-image.png" alt="Promo image" />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/3 lg:ml-0 ml-20 mr-20 flex flex-col allign-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p>
            ¿Ya tienes cuenta? <Link href="/login">Iniciar sesion</Link>
          </p>
        </div>
        <div className="items-center py-10">
          <Input
            type="text"
            label="Email"
            onChange={(e) => setUsername(e.target.value)}
            className="py-2"
          />
          <Input
            type="text"
            label="Nombre"
            onChange={(e) => setNombre(e.target.value)}
            className="py-2"
          />
          <Input
            type="text"
            label="Apellido"
            onChange={(e) => setApellido(e.target.value)}
            className="py-2"
          />
          <Input
            type="number"
            label="Nro. de Afiliado"
            onChange={(e) => setNumeroAfiliado(parseInt(e.target.value))}
            className="py-2"
          />
          <Input
            type="password"
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="py-2"
          />
          <Input
            type="password"
            label="Confirmar contraseña"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="py-2"
          />
          <Button color="primary" fullWidth onClick={handleSignUp}>
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
