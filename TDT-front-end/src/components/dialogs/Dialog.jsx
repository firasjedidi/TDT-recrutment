import PropTypes from "prop-types";
import { useState } from "react";
import api from "../../utils/api";
import { CiCircleRemove } from "react-icons/ci";
import { validateArticleForm } from "../../utils/formValdiation";
import { imageUrl } from "../../utils/cloudinaryApi";
const Dialog = ({ closeDialog, refetch }) => {
  const [article, setArticle] = useState({});
  const [error, setError] = useState({});

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files[0].size < 10485760) {
        const image = await imageUrl(files[0]);
        if (image != "error") {
          setArticle((prevState) => ({
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
    } else setArticle((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    const valid = validateArticleForm(article, setError);
    if (valid) {
      try {
        const { data } = await api.post("/articles/create", article);
        if (data) refetch();
        closeDialog();
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
  const removeImage = () => {
    setArticle((prevState) => ({ ...prevState, image: "" }));
  };
  console.log(article);
  return (
    <div className="fixed  top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur backdrop-filter z-20">
      <div className="bg-[#F5F2FD] p-4 md:p-6 rounded-lg w-4/5 h-4/5 flex flex-col justify-between">
        <div className="h-3/4">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Title"
            name="title"
            className="w-full border rounded-md p-2 mb-4 bg-transparent focus:outline-none focus:ring focus:border-blue-300"
          />
          <span className="text-red-500 text-xs">{error && error.title}</span>
          <textarea
            onChange={handleChange}
            placeholder="Content"
            name="content"
            className="w-full scrollbar-hide  h-72 md:h-80  border rounded-md p-2 md:mb-2 bg-transparent resize-none focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
          <span className="text-red-500 text-xs">{error && error.content}</span>
        </div>
        <span className="text-red-500 text-base">{error && error.back}</span>
        <div className="flex flex-col md:flex-row   items-center justify-between">
          { article.image ? (
            <div className="h-full w-20 mb-1.5 md:mb-0 md:w-28 relative">
              <CiCircleRemove
                onClick={removeImage}
                className="absolute -top-2 -right-2 text-indigo-600 cursor-pointer bg-slate-100 rounded-full hover:scale-125"
                size={20}
              />
              <img
                className="h-full w-full"
                src={article.image}
                alt={article?.title}
              />
            </div>
          ) : (
            <div className="mb-1.5 flex flex-col h-full">
              <label
                htmlFor="file"
                className="border-2  border-dashed border-gray-300 rounded  w-28  md:w-28 text-xl text-gray-400 cursor-pointer hover:shadow-md flex items-center justify-center"
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
          />
          <div>
            <button
              onClick={closeDialog}
              className="border-2  py-2 px-4 hover:bg-indigo-200  rounded-md focus:outline-none focus:ring focus:border-blue-300 "
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring ml-2 focus:border-blue-300"
            >
              add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Dialog.propTypes = {
  closeDialog: PropTypes.func,
  refetch: PropTypes.func,
};
export default Dialog;
