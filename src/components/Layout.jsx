import styled from "styled-components";

const Section = styled.section`
  background-color: ${(props) => props.theme.color.bg.md};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.theme.responsive.md};
  @media screen and (max-width: ${(props) => props.theme.responsive.lg}) {
    padding: 0 ${(props) => props.theme.mp.sm};
  }
`;

const Layout = ({ children }) => {
  return (
    <Section>
      <Main>{children}</Main>
    </Section>
  );
};

export default Layout;
