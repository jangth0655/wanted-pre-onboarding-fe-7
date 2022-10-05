import Todo from "../src/screen/Todo";
import SignUp from "../src/screen/SignUp";
import SignIn from "../src/screen/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NotFound from "./screen/NotFound";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/theme";
import routes from "./routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path={routes.signUp} element={<SignUp />} />
          {isLoggedIn ? (
            <Route path={routes.todos} element={<Todo />} />
          ) : (
            <Route
              path={routes.signIn}
              element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
