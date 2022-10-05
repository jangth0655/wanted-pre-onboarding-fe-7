import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import { getLocalStorage, TOKEN } from "../server";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(routes.signIn);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const localStorageItem = getLocalStorage({ name: TOKEN });
    if (localStorageItem) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
  return <h1>Todo List</h1>;
};
export default Home;
