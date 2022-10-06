import { useState } from "react";
import styled from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import EditTodo from "./EditTodo";

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.color.textColor.xs};
  padding: ${(props) => props.theme.mp.lg};
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
  left: 0;
  margin: auto;
  width: 10%;
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
  margin-left: ${(props) => props.theme.mp.xl};
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

const TodoEdit = styled.button`
  cursor: ${(props) => (props.checked ? "" : "pointer")};
  font-weight: 600;
  color: ${(props) => props.theme.color.textColor.sm};
  font-size: ${(props) => props.theme.textSize.xl};
`;

const EditIcon = styled.span`
  color: ${(props) => props.theme.color.activeColor.sm};
  transition: ${(props) => props.theme.transition.md};
  &:hover {
    color: ${(props) => props.theme.color.activeColor.xl};
  }
`;

const Todo = ({ id, todo, setTodoList, isCompleted, userId }) => {
  const [checked, setChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChangeCheck = () => {
    setChecked((checked) => !checked);
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <TodoContainer>
        <CheckBoxContainer>
          <CheckBox htmlFor={id} checked={checked}>
            <input
              style={{ display: "none" }}
              id={id}
              type="checkbox"
              checked={checked}
              onChange={handleChangeCheck}
            />
            {checked && <span>✓</span>}
          </CheckBox>
        </CheckBoxContainer>

        <TodoWithEditContainer checked={checked}>
          <TodoText>
            {todo} {checked && <DoneTodoMark />}
          </TodoText>
          <TodoEdit
            onClick={handleEditMode}
            checked={checked}
            disabled={checked}
          >
            {checked ? (
              <MdDone />
            ) : (
              <EditIcon>
                <AiOutlineEdit />
              </EditIcon>
            )}
          </TodoEdit>
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
