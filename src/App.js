import Todo from "../src/screen/Todo";
import SignUp from "../src/screen/SignUp";
import SignIn from "../src/screen/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NotFound from "./screen/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<SignUp />} />
        {isLoggedIn ? (
          <Route path="/todo" element={<Todo />} />
        ) : (
          <Route
            path="/sign-in"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
