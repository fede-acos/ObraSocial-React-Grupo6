import {useState} from "react";
import { Input, Button, Link} from "@nextui-org/react"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignUp = async () => {
    //useSignUp({ username, password, name, lastName, memberNumber });
  };

  return (
    <div className="flex h-fit items-center">
      <div className="hidden w-1/2 lg:block">
        <img src="src/assets/image/promo-image.jpg" alt="Promo image" />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/3 lg:ml-0 ml-20 mr-20 flex flex-col allign-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Registro</h1>
          <p>¿Ya tienes cuenta? <Link href="/login">Iniciar sesion</Link></p>
        </div>
        <div className="items-center py-10">
          <Input
            type="text"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="py-2"
          />
          <Input
            type="text"
            label="Nombre"
            onChange={(e) => setName(e.target.value)}
            className="py-2"
          />
          <Input
            type="text"
            label="Apellido"
            onChange={(e) => setLastName(e.target.value)}
            className="py-2"
          />
          <Input
            type="text"
            label="Nro. de Afiliado"
            onChange={(e) => setMemberNumber(e.target.value)}
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
          <Button color="primary" fullWidth onClick={handleSignUp}>Registrarse</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
