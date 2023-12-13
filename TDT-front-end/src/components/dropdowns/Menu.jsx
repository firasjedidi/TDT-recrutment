import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleProfileDialog } from "../../redux/settings";
import { clearUser } from "../../redux/user"
import PropTypes from "prop-types";
const Menu = ({closeMenu}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = (type) =>{
    if(type === "Sign out"){
      dispatch(clearUser());
      navigate("/");
    }else{
     dispatch(toggleProfileDialog());
    }
    closeMenu()
  };
  return (
    <div className="absolute w-48 h-auto border right-3 top-16 shadow-lg p-2 bg-white z-10">
      <div onClick={()=>{onClick()}} className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-50 ">
        <HiOutlineUser size={25} color="#9CA3AF " />
        <span className="text-sm text-gray-500 k">Profile</span>
      </div>
      <hr />
      <div className="flex p-2">
        <span onClick={()=>{onClick("Sign out")}} className="text-sm text-red-500  cursor-pointer ">
          Sign out
        </span>
      </div>
    </div>
  );
};
Menu.propTypes = {
  closeMenu: PropTypes.func,
};
export default Menu;
