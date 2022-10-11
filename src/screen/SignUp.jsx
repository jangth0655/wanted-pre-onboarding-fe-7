import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { getLocalStorage, TOKEN_NAME } from "../server";

const Form = styled.form`
  width: 100%;
`;

const SignUp = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const [signUp, { data, isLoading, error }] = useMutation({
    url: "auth/signup",
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
    await signUp({ email, password });
  };

  useEffect(() => {
    if (data && data.access_token) {
      navigate(routes.signIn, {
        state: {
          signUpEmail: email ? email : null,
        },
      });
    }
  }, [data, email, navigate]);

  useEffect(() => {
    if (data && error) {
      setErrors(error);
      return;
    }
  }, [error, data]);

  useEffect(() => {
    const localStorageItem = getLocalStorage({ name: TOKEN_NAME });
    if (localStorageItem) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const errorMessage = emailError || errors || passwordError;

  const disabled =
    errorMessage ||
    email === "" ||
    !email.includes("@") ||
    password === "" ||
    password.length < 8;

  return (
    <Layout>
      <EnterPageContainer>
        <Title title="Sign Up" />
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
            placeholder="비밀번호 8자리 이상 입력해주세요."
            type="password"
          />
          <Button disabled={disabled} text="회원가입" isLoading={isLoading} />
        </Form>
        {errorMessage && <ErrorMessage errorText={errorMessage} />}
        <LinkComp text="로그인" path={routes.signIn} />
      </EnterPageContainer>
    </Layout>
  );
};
export default SignUp;
