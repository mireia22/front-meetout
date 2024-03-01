import { Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PostEvent from "./pages/PostEvent";
import Footer from "./components/Footer";
import Inscription from "./pages/Inscription";
import ListOfAssistants from "./pages/ListOfAssistants";
import EditEvent from "./pages/EditEvent";
import EditProfile from "./pages/EditProfile";
import { useUserDataContext } from "./hooks/useUserData";
import Welcome from "./pages/Welcome";
import FindEvent from "./pages/FindEvent";
const App = () => {
  const { userData } = useUserDataContext();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={userData?.token ? <FindEvent /> : <Welcome />}
          />
          <Route path="/findEvent" element={<FindEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-event" element={<PostEvent />} />
          <Route path="/:eventId/edit" element={<EditEvent />} />
          <Route path="/:eventId/inscription" element={<Inscription />} />
          <Route
            path="/:eventId/asistants"
            element={<ListOfAssistants />}
          ></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
