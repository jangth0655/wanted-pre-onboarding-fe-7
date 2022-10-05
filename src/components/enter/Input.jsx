import styled from "styled-components";

import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { EnterBox } from "../shared";

const InputContainer = styled(EnterBox)`
  &:first-child {
    margin-bottom: ${(props) => props.theme.mp.lg};
  }
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.mp.sm};
  color: rgb(82 82 91);
  font-weight: 600;
  cursor: pointer;
`;

const InputBox = styled.div`
  position: relative;
`;

const InputC = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.textColor.xs};
  padding: ${(props) => props.theme.mp.sm} ${(props) => props.theme.mp.xxl};
  border-radius: ${(props) => props.theme.borderRadius.md};
  &::placeholder {
    color: ${(props) => props.theme.color.textColor.sm};
    font-size: ${(props) => props.theme.textSize.xs};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.color.textColor.md};
  }
`;

const UserIcon = styled.div`
  position: absolute;
  padding: ${(props) => props.theme.mp.xs};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.textColor.xs};
`;

const Input = ({ label, type, value, placeholder, id, onChange }) => {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <InputBox>
        <UserIcon>
          {id === "email" ? (
            <HiOutlineUser size={25} />
          ) : (
            <HiOutlineLockClosed size={25} />
          )}
        </UserIcon>
        <InputC
          onChange={onChange}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
        />
      </InputBox>
    </InputContainer>
  );
};
export default Input;
