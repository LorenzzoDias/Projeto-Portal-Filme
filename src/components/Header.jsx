import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-purple-800 flex flex-wrap justify-between items-center h-14 px-4">
      <div>
        <h1 className="font-bold text-lg">Portal Filmes</h1>
      </div>

      <button className="lg:hidden text-white" onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <nav
        className={`lg:flex ${
          isMenuOpen ? "block" : "hidden"
        } absolute lg:static bg-purple-800 w-full lg:w-auto top-14 left-0`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 p-4 lg:p-0">
          <li>
            <NavLink to="/" className="text-white hover:underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="text-white hover:underline">
              Filmes
            </NavLink>
          </li>
          <li>
            <NavLink to="/genre" className="text-white hover:underline">
              Gêneros
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className="text-white hover:underline">
              Contato
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink to="/settings" className="text-white hover:underline">
                Configurações
              </NavLink>
            </li>
          )}

          <li className="block lg:hidden">
            <button
              onClick={toggleDropdown}
              className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition duration-200 w-full text-center"
            >
              Minhas Listas
            </button>

            {isDropdownOpen && <DropdownMenu />}
          </li>
        </ul>
      </nav>

      <div className="hidden lg:flex gap-4 items-center relative">
        <button
          onClick={toggleDropdown}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Minhas Listas
        </button>

        {isDropdownOpen && <DropdownMenu />}

        <Login isLogged={isLogged} handleLogin={handleLogin} />
      </div>
    </header>
  );
}