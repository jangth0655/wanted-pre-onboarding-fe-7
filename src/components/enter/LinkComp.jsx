import { Link } from "react-router-dom";
import styled from "styled-components";
import { EnterBox } from "../shared";

const LinkContainer = styled(EnterBox)``;
const LinkText = styled.span`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  font-size: ${(props) => props.theme.textSize.sm};
  font-weight: 600;
  color: ${(props) => props.theme.color.textColor.sm};
  transition: ${(props) => props.theme.transition.md};
  cursor: pointer;
  margin-top: ${(props) => props.theme.mp.xl};
  &:hover {
    color: ${(props) => props.theme.color.activeColor.md};
  }
`;

const LinkComp = ({ text, path }) => {
  return (
    <LinkContainer>
      <Link to={path}>
        <LinkText>{`${text}`} 페이지 가기</LinkText>
      </Link>
    </LinkContainer>
  );
};
export default LinkComp;
