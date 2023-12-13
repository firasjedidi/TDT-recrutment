import { BiSolidPlusCircle } from "react-icons/bi";
import PropTypes from "prop-types";
const TabBar = ({ openDialog, filter,cureent,setCureent }) => {
  return (
    <section className="flex items-center my-4 ml-2 md:ml-8  sticky top-0 bg-white left-0 w-full">
      <BiSolidPlusCircle
        onClick={openDialog}
        size={35}
        className="mr-4 text-indigo-600 cursor-pointer"
      />
      <div className="border-b flex items-center md:space-x-5 px-5 bg-white ">
        <h1
          onClick={() =>{ setCureent("My articles");filter("My articles")}}
          className={`${
            cureent === "My articles"
              ? "border-b text-indigo-600 border-indigo-600 hover:cursor-pointer "
              : "text-gray-500 hover:text-black hover:cursor-pointer "
          } px-2.5 py-3  hover:bg-gray-50`}
        >
          My articles
        </h1>
        <h1
          onClick={() => {setCureent("Others");filter("Others")}}
          className={`${
            cureent === "Others"
              ? "border-b text-indigo-600 border-indigo-600  hover:cursor-pointer"
              : "text-gray-500 hover:text-black hover:cursor-pointer "
          } px-2.5 py-3 hover:bg-gray-50`}
        >
          Others
        </h1>
      </div>
    </section>
  );
};

TabBar.propTypes = {
  openDialog: PropTypes.func,
  filter: PropTypes.func,
  cureent:PropTypes.string,
  setCureent:PropTypes.func,
};
export default TabBar;
