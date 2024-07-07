import { Button } from "@nextui-org/react";
import { useDarkMode } from "usehooks-ts";
import { Moon } from "react-ionicons";
import { Sunny } from "react-ionicons";
export const DarkModeSwitcher = () => {
    const { isDarkMode, toggle} = useDarkMode();

    return (
        <Button isIconOnly onClick={toggle}>
            {isDarkMode ? <Moon /> : <Sunny />}
        </Button>
        
    );
}