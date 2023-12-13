import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CiCircleRemove } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { validateForm } from "../../utils/formValdiation";
import { toggleProfileDialog } from "../../redux/settings";
import { imageUrl } from "../../utils/cloudinaryApi";
import { resetUser } from "../../redux/user";
import api from "../../utils/api";

const ProfileDialog = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files[0].size < 10485760) {
        const image = await imageUrl(files[0]);
        if (image != "error") {
          setFormData((prevState) => ({
            ...prevState,
            [name]: image,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            image: "something went wrong! try again",
          }));
        }
      } else {
        setError((prevState) => ({
          ...prevState,
          image: "image size too large",
        }));
      }
    } else setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const updated = {...user,...formData};
    const isFormValid = validateForm("update", updated, setError);
    if (isFormValid) {
      try {
        const { data } = await api.put("/user/update", formData);
        if (data) {
          dispatch(resetUser({user:data}));
          dispatch(toggleProfileDialog(false));
        }
      } catch (error) {
        if (error?.res?.response?.data)
          setError((prevState) => ({
            ...prevState,
            back: error.res.response.data,
          }));
        setError((prevState) => ({
          ...prevState,
          back: "something went wrong...!",
        }));
        console.log(error);
      }
    }
  };
  const removeImage = () => {
    setFormData((prevState) => ({ ...prevState, image: "" }));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur z-20">
      <div className="bg-[#F5F2FD] p-4 rounded-lg w-4/5 sm:w-2/6 md:2/4   h-4/5 flex flex-col justify-center relative">
        {editable ? (
          <CiCircleRemove
            onClick={() => setEditable((prevState) => !prevState)}
            className="absolute top-2 right-2 text-indigo-600 cursor-pointer bg-slate-100 rounded-full hover:scale-125"
            size={28}
          />
        ) : (
          <FaEdit
            className="absolute top-2 right-2 text-indigo-600"
            size={20}
            onClick={() => setEditable((prevState) => !prevState)}
          />
        )}
        <div className="flex items-center justify-center w-full ">
          {user?.image || formData?.image ? (
            <div className="h-24 w-32 mb-1.5 md:mb-0  relative flex items-center justify-center ">
              {editable && (
                <CiCircleRemove
                  onClick={removeImage}
                  className="absolute -top-3 -right-3 text-indigo-600 cursor-pointer bg-slate-100 rounded-full hover:scale-125"
                  size={28}
                />
              )}
              <img
                className="text-xs shadow-md rounded-lg h-full w-full "
                src={user?.image || formData.image}
                alt="user profile image"
              />
            </div>
          ) : (
            <div className="my-1.5 flex flex-col">
              <label
                htmlFor="file"
                className="border-2  border-dashed border-gray-300 rounded-lg h-28 w-28  md:w-28 text-xl text-gray-400 cursor-pointer hover:shadow-md flex items-center justify-center"
              >
                +
              </label>
              <span className="text-red-500 text-xs">{error && error.image}</span>
            </div>
          )}
          <input
            type="file"
            id="file"
            name="image"
            onChange={handleChange}
            className="hidden"
            disabled={!editable}
          />
        </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              readOnly={!editable}
              defaultValue={user?.name}
              onChange={handleChange}
              className="w-full border bg-transparent rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">{error && error.name}</span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-600"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              readOnly={!editable}
              defaultValue={user?.surname}
              onChange={handleChange}
              className="w-full border bg-transparent rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">
              {error && error.surname}
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              readOnly={!editable}
              defaultValue={user?.email}
              onChange={handleChange}
              className="w-full border bg-transparent rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">{error && error.eamil}</span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              readOnly={!editable}
              defaultValue={user?.password}
              onChange={handleChange}
              className="w-full border bg-transparent rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">
              {error && error.password}
            </span>
          </div>
          <span className="text-red-500 text-xs">{error && error.back}</span>
          <div className="flex justify-end">
            <button
              onClick={() => dispatch(toggleProfileDialog())}
              className="border-2  py-2 px-4 hover:bg-indigo-200  rounded-md focus:outline-none focus:ring focus:border-blue-300 "
            >
              Close
            </button>
            {editable && (
              <button
                onClick={handleSubmit}
                className="bg-indigo-500  text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring ml-2 focus:border-blue-300"
              >
                Upadate
              </button>
            )}
          </div>
        
      </div>
    </div>
  );
};

export default ProfileDialog;
