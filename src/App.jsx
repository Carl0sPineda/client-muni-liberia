import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/user/Login";
import BottomNav from "./components/BottomNav";
import Post from "./components/posts/Post";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Navbar />
      <BottomNav />
      <Login />
      <Post />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<BottomNav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
};

export default App;
