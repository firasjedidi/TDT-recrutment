import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import { validateForm } from "../../utils/formValdiation";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import api from "../../utils/api";
import Auth from "../../assets/auth.svg";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    const isFormValid = validateForm("signup", form, setError);
    if (isFormValid) {
      try {
        const { data } = await api.post("/auth/register", form);
        if (data) {
          dispatch(setUser({ user: data, auth: true }));
          navigate("/");
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
      }
    }
  };
  const onShow = () => setOpen((prev) => !prev);
  return (
    <div className="w-full h-full mt-20  flex items-center justify-center md:justify-around px-2 overflow-hidden">
      <img src={Auth} className="hidden md:block md:max-w-xl" alt="" />
      <div className="bg-[#F5F2FD] rounded-xl mt-8 px-2 overflow-hidden md:w-[32vw]  h-[75vh] shadow-xl">
        <div className=" flex flex-col items-center justify-evenly sm:px-5 h-full  ">
          <div className="text-center  text-sm">
            <h1 className="font-bold text-xl text-gray-800 ">REGISTER</h1>
            <p>Enter your information to register</p>
          </div>
          <div>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-2">
                <label className="text-xs font-semibold px-1">First name</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full  pl-1 pr-3 py-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="First name"
                    name="name"
                    onChange={handleChange}
                  />
                  <span className="text-red-500 text-xs">
                    {error && error.name}
                  </span>
                </div>
              </div>
              <div className="w-1/2 px-3 mb-2">
                <label className="text-xs font-semibold px-1">Last name</label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="w-full  pl-1 pr-3 py-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Last name"
                    name="surname"
                    onChange={handleChange}
                  />
                  <span className="text-red-500 text-xs">
                    {error && error.surname}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-2">
                <label className="text-xs font-semibold px-1">Email</label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    className="w-full  pl-1 pr-3 py-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                    name="email"
                    onChange={handleChange}
                  />
                  <span className="text-red-500 text-xs">
                    {error && error.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 ">
                <label className="text-xs font-semibold px-1">Password</label>
                <div className="flex flex-col">
                  <div className="relative">
                    <input
                      type={open ? "text" : "password"}
                      className=" w-full  pl-1 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                      name="password"
                      onChange={handleChange}
                    />
                    {open ? (
                      <HiEyeSlash
                        onClick={onShow}
                        className=" absolute right-2 top-3 cursor-pointer"
                        size={20}
                      />
                    ) : (
                      <HiEye
                        onClick={onShow}
                        className=" absolute right-2 top-3 cursor-pointer"
                        size={20}
                      />
                    )}
                  </div>
                  <span className="text-red-500 text-xs">
                    {error && error.password}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-red-500 text-xs">{error && error.back}</span>
          </div>
          <div className="flex ">
            <div className="w-full px-1 mb-2">
              <button
                onClick={handleSubmit}
                className="block w-60 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-2 py-3 font-semibold"
              >
                REGISTER NOW
              </button>
            </div>
          </div>
          <span className="text-sm">
            you have an account?
            <a
              onClick={() => navigate("/login")}
              target="#"
              className="ml-1 font-bold text-indigo-600 cursor-pointer"
            >
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
