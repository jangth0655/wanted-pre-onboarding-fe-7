import styled from "styled-components";

const TitleC = styled.h1`
  font-weight: 900;
  font-size: ${(props) => props.theme.textSize.xxxxl};
  margin-bottom: ${(props) => props.theme.mp.xxl};
  color: ${(props) => props.theme.color.activeColor.xl};
`;

const Title = ({ title }) => {
  return <TitleC>{title}</TitleC>;
};
export default Title;
