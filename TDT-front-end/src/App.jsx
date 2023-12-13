import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home  from './pages/Home';
import Articles  from './pages/Articles';
import Login  from './components/auth/Login';
import SignUp  from './components/auth/SignUp';
import NavBar  from './components/NavBar';
import NotFound  from './components/NotFound';
import DetailedArticle  from './pages/DetailedArticle';
import ProfileDialog from './components/dialogs/ProfileDialog';
function App() {
  const { auth } = useSelector((state) => state.user);
  const { openProfile } = useSelector((state) => state.settings);
  return (
    <>
      <NavBar />
      {openProfile && <ProfileDialog/>}
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Articles />} />
            <Route path="/:type/:id" element={<DetailedArticle />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route path="/profile" element={<Articles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
