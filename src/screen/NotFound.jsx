import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
    font-weight: 900;
    font-size: ${(props) => props.theme.textSize.xxxxl};
  }
`;

const NotFound = () => {
  return (
    <Container>
      <h1>Not Found</h1>
    </Container>
  );
};
export default NotFound;
