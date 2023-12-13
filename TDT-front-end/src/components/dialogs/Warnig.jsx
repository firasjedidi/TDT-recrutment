import PropTypes from "prop-types";

const Warning = ({error,onCancel,onConform}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur z-20">
      <div className="bg-[#F5F2FD] p-8 rounded-lg max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Warning</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to proceed?</p>
        <div className="flex justify-end">
          <button onClick={onCancel} className="border ml-2 py-2 px-4 hover:bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300">
            Cancel
          </button>
          <button onClick={onConform} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300">
            Delete
          </button>
        </div>
        <span className="text-red-500 text-xs">{error && error.remove}</span>
      </div>
    </div>
  );
};
Warning.propTypes = {
  error: PropTypes.object,
  onCancel: PropTypes.func,
  onConform: PropTypes.func,
};
export default Warning;
