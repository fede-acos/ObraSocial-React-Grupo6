import { useState } from "react";
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

import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import { DarkModeSwitcher } from "./DarkModeSwitcher";


function Header() {
    const auth = useAuth();
    const [userLogged, setUserLogged] = useState(Boolean(auth?.currentUser));
    

    function handleSignOut(): void {
        auth?.logout();
        setUserLogged(false);
    }

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
                <NavbarItem>
                    <DarkModeSwitcher />
                </NavbarItem>

                {userLogged ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar as="button" isBordered />
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem>
                                <p className="font-semibold">!Hola, {auth?.currentUser?.upn}!</p>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={() => handleSignOut()}>
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
