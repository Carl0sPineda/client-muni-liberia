import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/user/Login";
import BottomNav from "./components/BottomNav";

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <BottomNav />
    </>
  );
};

export default App;
