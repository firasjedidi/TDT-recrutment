import notFound from "../assets/notFound.gif";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
        <img src={notFound} alt="not found" />
        <button
            onClick={()=>navigate("/")}
            className="block w-60 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-2 py-3 font-semibold"
        >
            Go back
      </button>
    </div>
  )
}

export default NotFound