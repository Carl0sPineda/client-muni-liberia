import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/user/Login";

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Navbar />
      <Login />;
    </>
  );
};

export default App;
