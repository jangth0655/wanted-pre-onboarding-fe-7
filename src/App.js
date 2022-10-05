import Todo from "../src/screen/Todo";
import SignUp from "../src/screen/SignUp";
import SignIn from "../src/screen/SignIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
          <Route
            path={routes.todos}
            element={
              isLoggedIn ? (
                <Todo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to={routes.signUp} replace />
              )
            }
          />
          <Route
            path={routes.signIn}
            element={
              isLoggedIn ? (
                <Navigate to={routes.todos} replace />
              ) : (
                <SignIn setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path={routes.signUp}
            element={
              isLoggedIn ? (
                <Navigate to={routes.todos} replace />
              ) : (
                <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
