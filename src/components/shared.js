import styled from "styled-components";

export const EnterCommonBox = styled.div`
  margin: auto;
  width: 50%;
  @media screen and (max-width: ${(props) => props.theme.responsive.sm}) {
    width: 80%;
  }
`;

export const EnterPageContainer = styled.div`
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

export const TodoButton = styled.button`
  background-color: ${(props) => props.theme.color.activeColor.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: white;
  cursor: pointer;
  transition: ${(props) => props.theme.transition.md};
  &:hover {
    background-color: ${(props) => props.theme.color.activeColor.md};
  }
`;
