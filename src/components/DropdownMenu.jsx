import { NavLink } from "react-router-dom";

export default function DropdownMenu() {
  return (
    <div className="absolute top-full mt-2 bg-purple-800 rounded shadow-lg z-10">
      <ul className="flex flex-col p-2">
        <li>
          <NavLink
            to="/watched"
            className="text-white hover:underline block py-1"
          >
            Assistidos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watchlist"
            className="text-white hover:underline block py-1"
          >
            Para Ver Depois
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
