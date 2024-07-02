import React from "react";
import {Navbar, 
        NavbarBrand, 
        NavbarContent, 
        NavbarItem, 
        Link
        }
from "@nextui-org/react";

function Header() {
  return (
    <Navbar>
      <NavbarBrand>
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
    </Navbar>
  );
}

export default Header;