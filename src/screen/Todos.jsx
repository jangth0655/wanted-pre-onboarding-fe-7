import styled from "styled-components";
import Layout from "../components/Layout";
import { deleteLocalStorage, getLocalStorage, TOKEN } from "../server";

import formatDateAndDay from "../lib/formatDateAndDay";
import CreateTodo from "../components/todo/CreateTodo";
import Todo from "../components/todo/Todo";
import useFetch from "../lib/useFetch";
import { useEffect } from "react";

const Container = styled.div`
  height: 43rem;
  padding-bottom: ${(props) => props.theme.mp.sm};
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  position: relative;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.mp.md};
  background-color: ${(props) => props.theme.color.activeColor.md};
  border-top-left-radius: ${(props) => props.theme.borderRadius.xl};
  border-top-right-radius: ${(props) => props.theme.borderRadius.xl};
`;

const NavbarCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: ${(props) => props.theme.textSize.xxl};
  margin-right: ${(props) => props.theme.mp.md};
`;

const DateContainer = styled.div`
  margin: auto;
`;

const DaySpan = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.mp.sm};
  font-size: ${(props) => props.theme.textSize.lg};
`;

const DateSpan = styled.span`
  color: ${(props) => props.theme.color.textColor.xxs};
`;

const LogoutButton = styled.button`
  padding: ${(props) => props.theme.mp.xs};
  color: ${(props) => props.theme.color.textColor.xs};
  transition: ${(props) => props.theme.transition.md};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const ToDoListContainer = styled.ul`
  padding: ${(props) => props.theme.mp.lg};
  overflow-y: scroll;
  border: 1px solid black;
`;

const Todos = ({ setIsLoggedIn }) => {
  const { data, isLoading } = useFetch({ url: "todos" });

  const onLogout = () => {
    deleteLocalStorage({ name: TOKEN });
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getLocalStorage({ name: TOKEN });
    if (!token) {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  return (
    <Layout>
      <Container>
        <Navbar>
          <NavbarCol>
            <Title>TODO LIST</Title>
            <DateContainer>
              <DaySpan>{formatDateAndDay("day")}</DaySpan>
              <DateSpan>{formatDateAndDay("date")}</DateSpan>
            </DateContainer>
          </NavbarCol>
          <NavbarCol>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
          </NavbarCol>
        </Navbar>

        {isLoading ? (
          "Loading..."
        ) : (
          <ToDoListContainer>
            {data?.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </ToDoListContainer>
        )}
        <CreateTodo />
      </Container>
    </Layout>
  );
};
export default Todos;
