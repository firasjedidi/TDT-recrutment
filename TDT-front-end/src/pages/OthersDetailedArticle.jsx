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
  const [error, setError] = useState({});
  let {  id } = useParams();
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
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="relative mt-18   scrollbar">
      <div
        className="h-96 flex justify-center items-center w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${article.image})`,
        }}
      />
      <div className="max-w-2xl m-auto  p-4">
        <h1 className="text-indigo-600 opacity-80 text-center drop-shadow-md text-xl md:text-4xl ">
          {article.title}
        </h1>
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg">{paragraph}</p>
          </div>
        ))}
      </div>
      <span className="text-red-500 text-xs">{error && error.back}</span>
    </div>
  );
};

DetailedArticle.propTypes = {};

export default DetailedArticle;
