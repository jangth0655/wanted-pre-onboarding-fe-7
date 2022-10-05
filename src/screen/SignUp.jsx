import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/enter/Button";
import Input from "../components/enter/Input";
import useMutation from "../lib/useMutation";

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

  const errorState = emailError || errors || passwordError;

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label="이메일"
            type="text"
            value={email}
            onChange={handleEmail}
            id="email"
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div>
          <Input
            label="패스워드"
            id="password"
            onChange={handlePassword}
            value={password}
            placeholder="비밀번호를 입력해주세요."
            type="password"
          />
        </div>
        <div>
          <Button
            disabled={errorState || email === "" || password === ""}
            text="회원가입"
            isLoading={isLoading}
          />
        </div>
        <div>
          <h1>{errorState}</h1>
        </div>
      </form>
      <div>
        <Link to="/sign-in">
          <span>로그인 바로가기</span>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
