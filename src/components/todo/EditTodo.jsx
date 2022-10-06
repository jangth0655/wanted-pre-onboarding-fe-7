import { useEffect, useState } from "react";
import styled from "styled-components";
import useMutation from "../../lib/useMutation";
import { TodoButton } from "../shared";

const EditForm = styled.form`
  margin-top: ${(props) => props.theme.mp.sm};
  margin-bottom: ${(props) => props.theme.mp.xxxxl};
  padding: 0 ${(props) => props.theme.mp.sm};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const EditInput = styled.input`
  width: 90%;
  border: 2px solid ${(props) => props.theme.color.textColor.xxs};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.md} ${(props) => props.theme.mp.sm};
  background-color: white;
  &::placeholder {
    color: ${(props) => props.theme.color.textColor.sm};
  }
`;

const EditButtonContainer = styled.div`
  margin-top: ${(props) => props.theme.mp.sm};
`;
const EditButton = styled(TodoButton)`
  width: 5rem;
  padding: ${(props) => props.theme.mp.sm};
  font-weight: 600;
`;

const DeleteButton = styled(EditButton)`
  margin-left: ${(props) => props.theme.mp.sm};
  background-color: ${(props) => props.theme.color.red.sm};
  transition: ${(props) => props.theme.transition.md};
  &:hover {
    background-color: ${(props) => props.theme.color.red.md};
  }
`;

const EditTodo = ({
  id: todoId,
  setTodoList,
  setEditMode,
  userId,
  isCompleted,
}) => {
  const [edit, { data: editData, isLoading: editLoading }] = useMutation({
    url: `todos/${todoId}`,
    method: "PUT",
  });

  const [editTodo, setEditTodo] = useState("");

  const handleEditTodo = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setEditTodo(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editTodo === "") return;
    edit({ todoId, todo: editTodo, isCompleted: true, userId });
    setEditTodo("");
  };

  useEffect(() => {
    if (editData) {
      setTodoList((prev) => {
        const todoIndex = prev.findIndex((todo) => todo.id === todoId);
        const beforeTodo = prev.slice(0, todoIndex);
        const afterTodo = prev.slice(todoIndex + 1);
        const newTodo = {
          id: todoId,
          isCompleted,
          userId,
          todo: editData.todo,
        };
        return [...beforeTodo, newTodo, ...afterTodo];
      });
      setEditMode(false);
    }
  }, [
    editData,
    editTodo,
    isCompleted,
    setEditMode,
    setTodoList,
    todoId,
    userId,
  ]);

  return (
    <EditForm onSubmit={handleSubmit}>
      <EditInput onChange={handleEditTodo} type="text" placeholder="수정하기" />
      <EditButtonContainer>
        <EditButton>{editLoading ? "Loading..." : "수정"}</EditButton>
        <DeleteButton>삭제</DeleteButton>
      </EditButtonContainer>
    </EditForm>
  );
};
export default EditTodo;
