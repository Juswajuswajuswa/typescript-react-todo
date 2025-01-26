import { FaPencilAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Button from "../Button";
import { useAuth } from "../../customHooks/useAuth";
import { useState } from "react";

interface NavbarProps {
  openModal: () => void;
}

const navbar = [
  {
    id: "Home",
    label: "Home",
    path: "/",
    required: false
  },
  {
    id: "Todo",
    label: "Todo",
    path: "/todo",
    required: true
  },
  {
    id: "About",
    label: "About",
    path: "/about",
    required: false
  },
];

export default function Navbar({ openModal }: NavbarProps) {
  const { user, logOut } = useAuth();
  const [navId, setNavId] = useState<string>("Home")

  const navigate = useNavigate()


  const adjustedNavbar = navbar.filter((nav) => {
    return !nav.required || (nav.required && user);
  })


  const handleLogOut = () => {
    logOut()
    navigate("/")
  }

  return (
    <header className="p-[24px] text-logo">
      <nav className="flex justify-center">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-4">
          {/* LOGO */}
          <button onClick={() => {
            navigate("/")
            setNavId("Home")
          }} className="flex gap-2 items-center">
            <h1 className="">Juswa's Todo</h1>
            <FaPencilAlt />
          </button>

          <div className="flex gap-10 items-center">
            <div>
              <ul className="flex gap-5">
                {adjustedNavbar.map((nav) => (
                  <Link onClick={() => setNavId(nav.id)} key={nav.id} className={`${navId === nav.id ? "border-b-2 border-gray-600 " : ""}`} to={nav.path}>{nav.label}</Link>
                ))}
              </ul>
            </div>

            {/* LOGIN */}
            <div>
              {user ? (
                <Button title="Logout" className="px-3" clickOn={handleLogOut} />
              ) : (
                <Button title="Login" className="px-3" clickOn={openModal} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
