import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineXMark, HiCheck } from "react-icons/hi2";
import { CiCircleRemove } from "react-icons/ci";
import { validateArticleForm } from "../utils/formValdiation";
import api from "../utils/api";
import { imageUrl } from "../utils/cloudinaryApi";

const content = {
  title: "",
  image: "",
  content: ``,
};
const DetailedArticle = () => {
  const [article, setArticle] = useState(content);
  const [updateArticle, setUpdatArticle] = useState({});
  const [error, setError] = useState({});
  let { type, id } = useParams();
  const navigate = useNavigate();
  const lines = article.content.split("\n").map((line) => line.trim());
  const paragraphs = [];
  for (let i = 0; i < lines.length; i += 6) {
    const paragraphLines = lines.slice(i, i + 6);
    // Check if the last line of the paragraph doesn't end with a period
    // and there are more lines available. If so, keep adding lines until
    // a period is found or reach the end of the content.
    while (
      paragraphLines.length < 8 &&
      i + paragraphLines.length < lines.length &&
      !lines[i + paragraphLines.length].endsWith("." || ",")
    ) {
      paragraphLines.push(lines[i + paragraphLines.length]);
    }
    paragraphs.push(paragraphLines.join(" "));
  }

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files[0].size < 10485760) {
        const image = await imageUrl(files[0]);
        if (image != "error") {
          setUpdatArticle((prevState) => ({
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
    } else setUpdatArticle((prevState) => ({ ...prevState, [name]: value }));
  };

  const removeImage = () => {
    setArticle((prevState) => ({ ...prevState, image: "" }));
    setUpdatArticle((prevState) => ({ ...prevState, image: "" }));
  };

  const handleCancle = () => {
    navigate("/");
  };

  const handleUpdate = async () => {
    const updated = {...article,...updateArticle};
    const valid = validateArticleForm(updated, setError);
    if (valid) {
      try {
        const { data } = await api.put(`/articles/update/${id}`);
        if(data.message)
          navigate("/");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/articles/${id}`);
        setArticle(data);
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
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative mt-18 bg-slate-50  scrollbar">
      {!article.image && !updateArticle?.image ? (
        <label
          htmlFor="image"
          className="h-96 w-full flex justify-center items-center text-3xl text-gray-400   bg-gray-100 "
        >
          +
        </label>
      ) : (
        <div
          className="h-96 flex justify-center items-center w-full bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url(${ updateArticle.image || article.image})`,
          }}
        />
      )}
      <span className="text-red-500 text-xs">{error && error.image}</span>

      {type === "update" && (article.image || updateArticle.image) && (
        <CiCircleRemove
          onClick={removeImage}
          className="absolute top-1/2 right-2 text-indigo-600 cursor-pointer bg-slate-100 rounded-full hover:scale-125"
          size={25}
        />
      )}
      <input
        id="image"
        name="image"
        type="file"
        onChange={handleChange}
        className="hidden"
      />
      <div className="max-w-2xl m-auto  p-4">
        {type === "update" ? (
          <div>
            <input
              type="text"
              onChange={handleChange}
              defaultValue={article.title}
              className="text-center border w-full my-2 bg-transparent text-xl md:text-2xl focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">{error && error.title}</span>
          </div>
        ) : (
          <h1 className="text-indigo-600 opacity-80 text-center drop-shadow-md text-xl md:text-4xl ">
            {article.title}
          </h1>
        )}
        {type === "update" ? (
          <div>
            <textarea
              defaultValue={article.content}
              onChange={handleChange}
              className="w-full h-[26vh] lg:h-[35vh] scrollbar-hide resize-none  border bg-transparent rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="text-red-500 text-xs">
              {error && error.content}
            </span>
          </div>
        ) : (
          <>
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg">{paragraph}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <span className="text-red-500 text-xs">{error && error.back}</span>
      {type === "update" && (
        <>
          <HiCheck
            className="sticky left-2  bottom-64 md:bottom-12  text-white bg-indigo-500 rounded-full p-2"
            size={35}
            onClick={handleUpdate}
          />
          <HiOutlineXMark
            className="sticky left-2 bottom-56 md:bottom-2  text-red-500 bg-white shadow rounded-full p-2"
            size={35}
            onClick={handleCancle}
          />
        </>
      )}
    </div>
  );
};

DetailedArticle.propTypes = {};

export default DetailedArticle;
