import { useState } from "react";
import styled from "styled-components";
import EditTodo from "./EditTodo";

import { AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { HiX } from "react-icons/hi";
import useMutation from "../../lib/useMutation";

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.color.textColor.xs};
  padding: ${(props) => props.theme.mp.lg} ${(props) => props.theme.mp.sm};
  transition: ${(props) => props.theme.transition.md};
  background-color: white;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
  margin: auto;
  height: 100%;
`;

const CheckBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid ${(props) => props.theme.color.activeColor.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) =>
    props.checked ? props.theme.color.activeColor.sm : ""};
  color: ${(props) => (props.checked ? "white" : "")};
  font-size: ${(props) => props.theme.textSize.lg};
  cursor: pointer;
`;

const TodoWithEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: ${(props) => props.theme.mp.xxl};
  color: ${(props) => (props.checked ? props.theme.color.textColor.sm : "")};
`;

const TodoText = styled.span`
  display: flex;
  align-items: center;
  position: relative;
`;

const DoneTodoMark = styled.div`
  position: absolute;
  width: 100%;
  height: 1.5px;
  background-color: ${(props) => props.theme.color.textColor.sm};
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.checked ? "" : "pointer")};
  font-weight: 600;
  color: ${(props) => props.theme.color.textColor.sm};
  font-size: ${(props) => props.theme.textSize.xl};
`;

const EditIconBox = styled.div`
  display: flex;
  align-items: center;
`;

const EditIcon = styled.span`
  padding: ${(props) => props.theme.mp.xs};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.activeColor.sm};
  transition: ${(props) => props.theme.transition.md};
  &:hover {
    color: ${(props) => props.theme.color.activeColor.xl};
  }
`;
const DeleteIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.mp.xs};
  color: ${(props) => props.theme.color.red.xs};
  transition: ${(props) => props.theme.transition.md};
  margin-left: ${(props) => props.theme.mp.md};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.red.lg};
  }
`;

const Todo = ({ id, todo, setTodoList, isCompleted, userId }) => {
  const [checked, setChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [deleteTodo] = useMutation({
    url: `todos/${id}`,
    method: "DELETE",
  });

  const handleChangeCheckBox = () => {
    setChecked((checked) => !checked);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const onDeleteTodo = () => {
    deleteTodo({});
    setTodoList((prev) => {
      const newTodo = prev.filter((prev) => prev.id !== id);
      return [...newTodo];
    });
    setEditMode(false);
  };

  return (
    <>
      <TodoContainer>
        {!editMode ? (
          <CheckBoxContainer>
            <CheckBox htmlFor={id} checked={checked}>
              <input
                style={{ display: "none" }}
                id={id}
                type="checkbox"
                checked={checked}
                onChange={handleChangeCheckBox}
              />
              {checked && <span>✓</span>}
            </CheckBox>
          </CheckBoxContainer>
        ) : null}

        <TodoWithEditContainer checked={checked}>
          <TodoText>
            {todo} {checked && <DoneTodoMark />}
          </TodoText>
          <EditButton
            onClick={handleEditMode}
            checked={checked}
            disabled={checked}
          >
            {checked ? (
              <MdDone />
            ) : (
              <EditIconBox>
                <EditIcon>
                  <AiOutlineEdit />
                </EditIcon>
              </EditIconBox>
            )}
            <DeleteIcon onClick={onDeleteTodo}>
              <HiX />
            </DeleteIcon>
          </EditButton>
        </TodoWithEditContainer>
      </TodoContainer>

      {editMode && (
        <EditTodo
          setTodoList={setTodoList}
          setEditMode={setEditMode}
          id={id}
          isCompleted={isCompleted}
          userId={userId}
        />
      )}
    </>
  );
};

export default Todo;
