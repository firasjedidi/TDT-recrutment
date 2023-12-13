import PropTypes from "prop-types";
// import useClickOutside from "../../hooks/useClickOutside";

const Option = ({onOption,id}) => {
  // const menuRef = useClickOutside(() => setActive(false), iconRef);
// { setActive, iconRef }
  return (
    <div
      className="border absolute  -translate-x-1/2 top-7 bg-white  shadow-lg rounded w-24  h-20 flex flex-col   items-center  justify-evenly  "
    >
      <div className=" border-t border-l translate-x-5 rotate-45 -top-2 bg-white w-3 h-4 absolute " />
      <span onClick={()=>onOption("edit",id)} className="text-gray-500 cursor-pointer hover:bg-slate-100 w-full text-center">
        Edit
      </span>
      <span onClick={()=>onOption("delete",id)} className="text-red-500 cursor-pointer hover:bg-slate-100 w-full text-center">
        Delete
      </span>
    </div>
  );
};

Option.propTypes = {
  onOption: PropTypes.func,
  id:PropTypes.number
};
export default Option;
