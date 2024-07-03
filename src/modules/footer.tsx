import Logo from "../assets/logo.svg";
import {Link} from "@nextui-org/react"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 bottom-0 w-full sticky z-50">

      <div className="mx-8 flex justify-between">
        <div>
          <h6 className="text-lg font-semibold">Hecho por:</h6>
          <ul>
            <li><Link isExternal href="https://github.com/fede-acos">Federico Acosta</Link></li>
            <li><Link isExternal href="https://github.com/NicoBrites">Nicolas Brites</Link></li>
            <li><Link isExternal href="https://github.com/DavidBernhardt">David Bernhardt</Link></li>
          </ul>
        </div>
        <div className="">
            <img className="h-14" src={Logo} alt="AllMedin Logo" />AllMedin
            <p className="text-sm">&copy; 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;