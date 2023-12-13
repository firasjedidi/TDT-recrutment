import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./dropdowns/Menu";
const NavBar = () => {
  const { auth, user } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setActive(false);
  return (
      <nav className="fixed top-0 w-full z-10 bg-[#F5F2FD] border-gray-200  px-4 lg:px-6 py-4">
        <div className="flex  justify-between items-center mx-auto max-w-screen-xl">
          <a className="flex items-center">
            <span onClick={()=>navigate("/")} className="text-indigo-600 self-center text-base md:text-xl font-semibold whitespace-nowrap cursor-pointer">
              TDT 
            </span>
          </a>
          {auth && (
            <div className="realtive">
              <img
                src={user.image}
                alt="TDT user image"
                onClick={() => setActive((prevState) => !prevState)}
                className="w-8 h-8 rounded-full border-2"
              />
              {active && <Menu closeMenu={closeMenu} />}
            </div>
          ) }
        </div>
      </nav>

  );
};

export default NavBar;
