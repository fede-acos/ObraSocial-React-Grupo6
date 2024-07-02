import React from "react";
import {Navbar, 
        NavbarBrand, 
        NavbarContent, 
        NavbarItem, 
        Link
        }
from "@nextui-org/react";

import Logo from "../assets/logo.svg";

function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <img src={Logo} alt="AllMedin Logo" />
        <p className="font-bold text-inherit">AllMedin</p>
      </NavbarBrand>
      
      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/turnos">Mis turnos</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/cartilla">Cartilla medica</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login">Iniciar sesion</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/signup">Registrarse</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;