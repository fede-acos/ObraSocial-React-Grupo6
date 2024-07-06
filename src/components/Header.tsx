import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";

import Logo from "../assets/logo.svg";

function Header() {
  const [userLogged, setUserLogged] = React.useState(true);

  return (
    <Navbar>
      <NavbarBrand>
        <img src={Logo} alt="AllMedin Logo" />
        <p className="font-bold text-inherit">AllMedin</p>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/mis-turnos">Mis turnos</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/">Cartilla medica</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {userLogged ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar as="button" isBordered />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <p className="font-semibold">Sesion iniciada como:</p>
                <p className="font-semibold">juan@carlos.com</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => setUserLogged(false)}
              >
                Cerrar sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">Iniciar sesion</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Registro
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
