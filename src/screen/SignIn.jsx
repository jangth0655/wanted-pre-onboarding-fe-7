import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/enter/Button";
import ErrorMessage from "../components/enter/ErrorMessage";
import Input from "../components/enter/Input";
import LinkComp from "../components/enter/LinkComp";
import Title from "../components/enter/Title";
import Layout from "../components/Layout";
import { EnterPageContainer } from "../components/shared";
import useMutation from "../lib/useMutation";
import routes from "../routes";
import { getLocalStorage, setLocalStorage } from "../server";

const Form = styled.form`
  width: 100%;
`;

const TOKEN = "access_token";

const SignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const { state } = useLocation();
  const [login, { data, isLoading, error }] = useMutation({
    url: "auth/signin",
    method: "POST",
  });

  const handleEmail = (event) => {
    setEmailError("");
    setErrors("");
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };

  const handlePassword = (event) => {
    setPasswordError("");
    setErrors("");
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors("");
    if (email === "" || password === "") {
      setErrors("이메일과 패스워드가 필요합니다.");
      return;
    }
    if (!email.includes("@") || email === "") {
      setEmailError("이메일 형식으로 입력해주세요.");
      return;
    }
    if (password.length < 8 || password === "") {
      setPasswordError("비밀번호 8자 이상 입력해주세요.");
      return;
    }
    await login({ email, password });
  };

  useEffect(() => {
    if (error) {
      setErrors(error);
      return;
    }
  }, [error]);

  const errorMessage = emailError || errors || passwordError;

  const disabled =
    errorMessage ||
    email === "" ||
    !email.includes("@") ||
    password === "" ||
    password.length < 8;

  useEffect(() => {
    if (data && data.access_token) {
      setIsLoggedIn(true);
      setLocalStorage({ name: TOKEN, value: data.access_token });
      navigate(routes.todos);
    }
  }, [data, navigate, setIsLoggedIn]);

  useEffect(() => {
    const token = getLocalStorage({ name: TOKEN });
    if (token) {
      setIsLoggedIn(true);
      navigate(routes.todos);
    }
  }, [navigate, setIsLoggedIn]);

  useEffect(() => {
    if (state && state.signUpEmail) {
      setEmail(state.signUpEmail);
    }
  }, [state]);

  return (
    <Layout>
      <EnterPageContainer>
        <Title title="Log In" />
        <Form onSubmit={handleSubmit}>
          <Input
            label="이메일"
            type="text"
            value={email}
            onChange={handleEmail}
            id="email"
            placeholder="이메일을 입력해주세요."
          />
          <Input
            label="패스워드"
            id="password"
            onChange={handlePassword}
            value={password}
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />
          <Button disabled={disabled} text="회원가입" isLoading={isLoading} />
        </Form>
        {errorMessage && <ErrorMessage errorText={errorMessage} />}
        <LinkComp text="회원가입" path={routes.signUp} />
      </EnterPageContainer>
    </Layout>
  );
};
export default SignIn;
