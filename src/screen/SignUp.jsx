import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/enter/Button";
import ErrorMessage from "../components/enter/ErrorMessage";
import Input from "../components/enter/Input";
import LinkComp from "../components/enter/LinkComp";
import Layout from "../components/Layout";
import useMutation from "../lib/useMutation";
import routes from "../routes";

const Title = styled.h1`
  font-weight: 900;
  font-size: ${(props) => props.theme.textSize.xxxxl};
  margin-bottom: ${(props) => props.theme.mp.xxl};
  color: ${(props) => props.theme.color.activeColor.xl};
`;

const Container = styled.div`
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.xxl} ${(props) => props.theme.mp.sm};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow.md};
`;

const Form = styled.form`
  width: 100%;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const [signUp, { data, isLoading, error }] = useMutation({
    url: "auth/signup",
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
    await signUp({ email, password });
  };

  useEffect(() => {
    if (data && data.access_token) {
      navigate("/sign-in");
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      setErrors(error);
      return;
    }
  }, [error]);

  const errorMessage = emailError || errors || passwordError;

  return (
    <Layout>
      <Container>
        <Title>SignUp</Title>

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
          <Button
            disabled={
              errorMessage ||
              email === "" ||
              password === "" ||
              password.length < 8
            }
            text="회원가입"
            isLoading={isLoading}
          />
        </Form>
        {errorMessage && <ErrorMessage errorText={errorMessage} />}
        <LinkComp text="로그인" path={routes.signIn} />
      </Container>
    </Layout>
  );
};
export default SignUp;
