import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 900;

  h1 {
    font-size: ${(props) => props.theme.textSize.xxxxl};
  }
  h2 {
    font-size: ${(props) => props.theme.textSize.xl};
    margin-top: ${(props) => props.theme.mp.md};
  }
`;

const NotFound = () => {
  return (
    <Container>
      <h1>Not Found</h1>
      <h2>페이지를 찾을 수 없습니다.</h2>
    </Container>
  );
};
export default NotFound;
