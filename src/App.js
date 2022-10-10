import Todos from "../src/screen/Todos";
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
          <Route
            path={routes.signIn}
            element={
              isLoggedIn ? (
                <Navigate to={routes.todo} replace />
              ) : (
                <SignIn setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path={routes.todo}
            element={
              isLoggedIn ? (
                <Todos setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to={routes.signUp} replace />
              )
            }
          />
          <Route
            path={routes.signUp}
            element={
              isLoggedIn ? (
                <Navigate to={routes.todo} replace />
              ) : (
                <SignUp setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
