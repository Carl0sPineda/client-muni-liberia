import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/user/Login";
import Post from "./components/posts/Post";
import Map from "./components/map/Map";
import AddPost from "./components/addPost/AddPost";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useValue } from "./context/ContextProvider";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  const {
    state: { currentUser },
  } = useValue();

  return (
    <>
      <BrowserRouter>
        <Loading />
        <Notification />
        <Navbar />
        <Login />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route
            path="/add"
            element={currentUser?.role === "admin" ? <AddPost /> : <Map />}
          />
          {/* <Route path="/add/:id" element={<AddPost />} /> */}
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/dashboard/*"
            element={currentUser?.role === "admin" ? <Dashboard /> : <Map />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
