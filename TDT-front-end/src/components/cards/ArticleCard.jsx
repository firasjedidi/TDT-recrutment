import { HiEllipsisHorizontal } from "react-icons/hi2";
import Option from "../dropdowns/Option";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({
  item,
  index,
  active,
  setActive,
  postion,
  setPostion,
  onOption
}) => {
  const navigate = useNavigate();
  return (
    <div className=" relative w-full  lg:h-32  bg-gray-100 shadow-md rounded-lg">
      {/* title + image? */}
      <section className="flex  items-start justify-start w-full h-full">
        {item.image && (
          <img
            className="w-20 md:w-28 h-full rounded-l-lg  "
            src={item.image}
            alt="blog logo"
          />
        )}
        <section className="p-2 mt-1.5 flex flex-col items-start cursor-pointer " onClick={()=>navigate(`/detail/${item._id}`)}>
          <h1 className="text-md font-bold line-clamp-1 text-indigo-900">
            {item.title}
          </h1>
          <p className="break-all line-clamp-5 text-xs text-gray-500 ">
            {item.content}
          </p>
        </section>
      </section>
      <section className="absolute top-0.5 right-1 ">
        {/*  actions  */}
        <section className="relative">
          <HiEllipsisHorizontal
            onClick={() => {
              setPostion(index);
              setActive((prev) => !prev);
            }}
            size={30}
            color="gray"
            className=" cursor-pointer hover:bg-[#F5F2FD]  hover:rounded-full "
            // ref={iconRef}
          />
          {active &&
            (postion === index ? (
              <Option onOption={onOption} id={item._id}  />
            ) : null)}
        </section>
      </section>
    </div>
  );
};

ArticleCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  active: PropTypes.bool,
  setActive: PropTypes.func,
  postion: PropTypes.number,
  setPostion: PropTypes.func,
  onOption: PropTypes.func,
};

export default ArticleCard;
