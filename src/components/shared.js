import styled from "styled-components";

export const EnterBox = styled.div`
  margin: auto;
  width: 50%;
  @media screen and (max-width: ${(props) => props.theme.responsive.sm}) {
    width: 80%;
  }
`;
