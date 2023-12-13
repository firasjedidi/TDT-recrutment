import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDialog } from "../redux/settings";
import api from "../utils/api";
import TabBar from "../components/TabBar";
import ArticleCard from "../components/cards/ArticleCard";
import Dialog from "../components/dialogs/Dialog";
import Warning from "../components/dialogs/Warnig";
import OthersArticleCard from "../components/cards/OthersArticleCard";
const Articles = () => {
  const { openArticleDialog } = useSelector((state) => state.settings);
  const [articles, setArticles] = useState([]);
  const [cureent, setCureent] = useState("My articles");
  const [openWar, setOpenWarn] = useState(false);
  const [refrech, setRefrech] = useState(false);
  const [postion, setPostion] = useState(null);
  const [active, setActive] = useState(false);
  const [artId, setartId] = useState(null);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refetch = () => setRefrech((prev) => !prev);
  const openDialog = () => {
    dispatch(toggleDialog(true));
  };
  const closeDialog = () => {
    dispatch(toggleDialog(false));
  };
  const onOption = (type, id) => {
    if (type === "edit") {
      navigate(`/update/${id}`);
    } else {
      setartId(id);
      setOpenWarn(true);
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await api.delete(`/articles/delete/${artId}`);
      if (data.message) {
        refetch();
        setOpenWarn(false);
      }
    } catch (error) {
      if (error?.res?.response?.data)
        setError((prevState) => ({
          ...prevState,
          back: error.res.response.data,
        }));
      setError((prevState) => ({
        ...prevState,
        remove: "something went wrong...!",
      }));
    }
  };
  const onCancel = () => {
    setOpenWarn(false);
  };
  const onConform = async () => {
    await handleDelete();
    setActive(false);
  };

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/articles/user`);
      setArticles(data);
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
  const fetchOtherData = async () => {
    try {
      const { data } = await api.get(`/articles/users`);
      setArticles(data);
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
  const filter = async (type) => {
    if (type === "Others") await fetchOtherData();
    else await fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [refrech]);
  console.log(articles);
  return (
    <div className="overflow-hidden mt-14">
      <TabBar
        openDialog={openDialog}
        filter={filter}
        cureent={cureent}
        setCureent={setCureent}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5  w-full">
        {articles.length > 0 ? (
          articles.map((item, key) =>
            cureent === "Others" ? (
              <OthersArticleCard
                key={key}
                item={item}
                index={key}
                active={active}
                setActive={setActive}
                postion={postion}
                setPostion={setPostion}
                onOption={onOption}
              />
            ) : (
              <ArticleCard
                key={key}
                item={item}
                index={key}
                active={active}
                setActive={setActive}
                postion={postion}
                setPostion={setPostion}
                onOption={onOption}
              />
            )
          )
        ) : (
          <span className="text-center text-gray-400 ">No data Found !</span>
        )}
      </div>
      {openArticleDialog && (
        <Dialog closeDialog={closeDialog} refetch={refetch} />
      )}
      {openWar && (
        <Warning error={error} onConform={onConform} onCancel={onCancel} />
      )}
    </div>
  );
};

export default Articles;
