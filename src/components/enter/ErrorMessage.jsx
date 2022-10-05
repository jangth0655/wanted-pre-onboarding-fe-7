import styled from "styled-components";
import { AiFillWarning } from "react-icons/ai";

const ErrorContainer = styled.div`
  margin-bottom: ${(props) => props.theme.mp.lg};
  display: flex;
  align-items: center;
`;

const ErrorIcons = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.mp.sm};
  color: ${(props) => props.theme.color.highlight.sm};
`;
const ErrorText = styled.span`
  color: ${(props) => props.theme.color.red.lg};
  font-weight: 700;
`;

const ErrorMessage = ({ errorText }) => {
  return (
    <ErrorContainer>
      <ErrorIcons>
        {" "}
        <AiFillWarning size={20} />
      </ErrorIcons>
      <ErrorText>{errorText}</ErrorText>
    </ErrorContainer>
  );
};
export default ErrorMessage;
