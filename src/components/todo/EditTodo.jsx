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
  display: flex;
  align-items: center;
`;
const EditButton = styled(TodoButton)`
  width: 5rem;
  padding: ${(props) => props.theme.mp.sm};
  font-weight: 600;
`;

const DeleteButton = styled(TodoButton).attrs({
  as: "div",
})`
  margin-left: ${(props) => props.theme.mp.sm};
  background-color: ${(props) => props.theme.color.red.sm};
  transition: ${(props) => props.theme.transition.md};
  padding: ${(props) => props.theme.mp.sm};
  width: 5rem;
  text-align: center;
  font-size: ${(props) => props.theme.textSize.sm};
  font-weight: 600;
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

  const [deleteTodo, { isLoading: deleteLoading }] = useMutation({
    url: `todos/${todoId}`,
    method: "DELETE",
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
    edit({ todo: editTodo, isCompleted: true });
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

  const onDelete = () => {
    deleteTodo({});
    setTodoList((prev) => {
      const newTodo = prev.filter((todo) => todo.id !== todoId);
      return [...newTodo];
    });
    setEditMode(false);
  };

  return (
    <EditForm onSubmit={handleSubmit}>
      <EditInput onChange={handleEditTodo} type="text" placeholder="수정하기" />
      <EditButtonContainer>
        <EditButton>{editLoading ? "Loading..." : "수정"}</EditButton>
        <DeleteButton onClick={onDelete}>
          {deleteLoading ? "Loading" : "삭제"}
        </DeleteButton>
      </EditButtonContainer>
    </EditForm>
  );
};
export default EditTodo;
