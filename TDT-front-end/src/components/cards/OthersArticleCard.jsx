import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const OthersArticleCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className=" relative w-full  shadow-md rounded-lg">
        <section className="flex  items-start justify-between w-full h-full">
          <section className="flex flex-col  items-start p-2 cursor-pointer" onClick={()=>navigate(`/detailed/${item._id}`)}>
            <section className="flex my-1 items-center space-x-1">
              {item.userId.image && (
                <img
                  className="w-6  h-6 rounded-full  "
                  src={item.userId.image}
                  alt="blog logo"
                />
              )}
              <span className="text-indigo-900 text-sm ">{`${item.userId.name} ${item.userId.surname}`}</span>
            </section>
            <h1 className="text-md font-bold line-clamp-1 text-indigo-900">
              {item.title}
            </h1>
            <p className="break-all line-clamp-4 text-xs text-gray-500 ">
              {item.content}
            </p>
          </section>
          {item.image && (
            <img
              className="w-20 md:w-26 h-full rounded-r-lg  "
              src={item.image}
              alt="blog logo"
            />
          )}
        </section>
        <section className="absolute top-0.5 right-1 ">
      </section>
    </div>
  );
};
OthersArticleCard.propTypes = {
  item: PropTypes.object,
}
export default OthersArticleCard;
