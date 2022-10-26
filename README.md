<div>
    <h1>JangTaeHee_pre-onboarding task</h1>
    <span>✅ 링크 : </span>
    <a display="block" href="https://jangtaehee-pre-onboarding-fe.netlify.app" >
      https://jangtaehee-pre-onboarding-fe.netlify.app
    </a>
</div>

<br /><br />

## Content

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)

---

<br />

## Built with

### ✓ Library

- `react-router-dom`
- `styled-components`
- `react-icons`

### ✓ Deploy

- `netlify`

---

<br />

### ✓ Project

<br />

> 프로젝트 아키텍처

  <details>
    <summary>아키텍처</summary>

- src

  - **components**
    - enter
      - Button.jsx
      - ErrorMessage.jsx
      - Input.jsx
      - LinkComp.jsx
      - Title.jsx
    - todo
      - CreateTodo.jsx
      - EditTodo.jsx
      - Todo.jsx
    - layout.jsx
    - shared.js
  - **lib**
    - formatDateAndDay.js
    - useFetch.jsx
    - useMutation.jsx
  - **screen**
    - NotFound.jsx
    - SignIn.jsx
    - SignUp.jsx
    - Todos.jsx

  </details>

<br /><br />

> Router

- 로그인 상태에 따라 페이지를 구분하였습니다.
- 루트 컴포넌트 `App.js`에서 라우터 세팅하였습니다.

  <br />

  <details>
    <summary>Router Setting</summary>
    
    <br />

  ```javascript
  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              path={routes.signIn}
              element={
                isLoggedIn ? (
                  <Navigate to={routes.todo} replace />
                ) : (
                  <SignIn setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path={routes.todo}
              element={
                isLoggedIn ? (
                  <Todos setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to={routes.signUp} replace />
                )
              }
            />
            <Route
              path={routes.signUp}
              element={
                isLoggedIn ? (
                  <Navigate to={routes.todo} replace />
                ) : (
                  <SignUp setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
  export default App;
  ```

  </details>

<br /><br />

> 컴포넌트 분리

- 목적

1.  모듈 재사용을 위해서 분리하였습니다.
2.  코드의 복잡성을 줄이기위해 분리하였습니다.

    <br />

     <details>
       <summary>Input 컴포넌트</summary>

    - 이 컴포넌트는 어디에 사용되는가?
      - 로그인 및 회원가입 `input`에 사용
    - 이 컴포넌트의 역할과 책임은 무엇인가?

      - 복잡하고 반복되는 input 속성을 props로 전달하여 재사용 역할

        <br />

    ```javascript
    //... styled-components
    const Input = ({ label, type, value, placeholder, id, onChange }) => {
      return (
        <InputContainer>
          <Label htmlFor={id}>{label}</Label>
          <InputBox>
            <UserIcon>
              {id === "email" ? (
                <AiOutlineMail size={25} />
              ) : (
                <HiOutlineLockClosed size={25} />
              )}
            </UserIcon>
            <InputC
              onChange={onChange}
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
            />
          </InputBox>
        </InputContainer>
      );
    };
    export default Input;
    ```

       </details>

       <br />

       <details>
         <summary>Button 컴포넌트</summary>

    - 이 컴포넌트는 어디에 사용되는가?

      - 로그인 및 회원가입의 `button`

    - 이 컴포넌트의 역할과 책임은 무엇인가?

      - `loading` 중인지 확인
      - `button message` 전달
        <br />

    ```javascript
    const Button = ({ text, isLoading, disabled }) => {
      return (
        <ButtonContainer>
          <ButtonC disabled={disabled}>
            {isLoading ? "loading..." : text}
          </ButtonC>
        </ButtonContainer>
      );
    };
    export default Button;
    ```

      </details>

      <br />

    <details>
      <summary>CreateTodo 컴포넌트</summary>

    - 이 컴포넌트는 어디에 사용되는가?
      - 투두리스트 페이지(screen) 사용합니다.
    - 이 컴포넌트의 역할과 책임은 무엇인가?

      - 투두 생성하는 역할을 하며 투두리스트의 todos(투두리스트) 수정하는 setTodos와 의존성을 갖고있습니다.
      - 투두를 생성할 때에 복잡한 로직을 같고 있어 따로 분리하였습니다.

      <br />

    ```javascript
    const CreateTodo = ({ setTodoList }) => {
      const [errorMessage, setErrorMessage] = useState("");
      const [submitTodo, { data, isLoading, error }] = useMutation({
        url: "todos",
        method: "POST",
      });
      const [todo, setTodo] = useState("");

      const onChange = (event) => {
        const {
          currentTarget: { value },
        } = event;
        setTodo(value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        if (todo === "") {
          window.alert("할 일을 입력해주세요.");
          return;
        }
        submitTodo({ todo });
        setTodo("");
      };

      useEffect(() => {
        if (data) {
          setTodoList((prev) => [
            ...prev,
            {
              id: data.id,
              isCompleted: data.isCompleted,
              todo: data.todo,
              userId: data.userId,
            },
          ]);
        }
      }, [data, setTodoList, todo.id, todo.isCompleted]);

      useEffect(() => {
        if (error) {
          setErrorMessage(error);
        }
      }, [error]);

      return (
        <>
          <ToDoForm onSubmit={handleSubmit}>
            <ToDoInput
              onChange={onChange}
              value={todo}
              type="text"
              error={Boolean(errorMessage)}
              placeholder={
                errorMessage ? errorMessage : "할 일을 입력해주세요."
              }
            />
            <ToDoButton>
              {isLoading ? "Loading..." : <FaPlus size={18} />}
            </ToDoButton>
          </ToDoForm>
        </>
      );
    };
    export default CreateTodo;
    ```

      </details>
      <br />

      <details>
       <summary>EditTodo 컴포넌트</summary>

    - 이 컴포넌트는 어디에 사용되는가?

      - 개별 todo 컴포넌트에서 사용됩니다.

    - 이 컴포넌트의 역할과 책임은 무엇인가?

      - 개별 todo를 수정만하는 역할합니다.
      - todos(투두리스트) 수정하는 setTodos와 개별 todo의 상태를 변경해야할 todo의 속성과 의존성을 갖고있습니다.

      <br />

    ```javascript
    const EditTodo = ({
      id: currentTodoId,
      setTodoList,
      setEditMode,
      userId,
      isCompleted,
    }) => {
      const [edit, { data: editData, isLoading: editLoading }] = useMutation({
        url: `todos/${currentTodoId}`,
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
        edit({ todo: editTodo, isCompleted: true });
        setEditTodo("");
      };

      useEffect(() => {
        if (editData) {
          setTodoList((prev) => {
            const todoIndex = prev.findIndex(
              (todo) => todo.id === currentTodoId
            );
            const beforeTodo = prev.slice(0, todoIndex);
            const afterTodo = prev.slice(todoIndex + 1);
            const newTodo = {
              id: currentTodoId,
              isCompleted: editData.isCompleted,
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
        currentTodoId,
        userId,
      ]);

      const onCancelEditMode = () => {
        setEditMode(false);
      };

      return (
        <EditForm onSubmit={handleSubmit}>
          <EditInput
            onChange={handleEditTodo}
            type="text"
            placeholder="수정하기"
          ></EditInput>
          <EditButtonContainer>
            <EditButton>{editLoading ? "Loading..." : "수정"}</EditButton>
            <CancelButton onClick={onCancelEditMode}>취소</CancelButton>
          </EditButtonContainer>
        </EditForm>
      );
    };
    export default EditTodo;
    ```

    </details>

    <br /><br />

> 커스텀 훅스 사용

- 반복되는 함수 및 로직 재사용 목적으로 커스텀 훅을 만들었습니다.

  <br />

    <details>
      <summary>useMutation</summary>

  - `POST` 요청할 때 코드의 재사용과 복잡성을 줄이기위해 만들었습니다.
  - `mutation` 훅은

    - 데이터(`body`)를 `POST`할 수 있는 `mutation함수`와
    - `POST` 요청 후 받은 응답데이터(`response`)와 `error`, `loading`을 반환합니다.

    <br />

  ```javascript
  import { useState } from "react";
  import { BASE_URL, getLocalStorage, TOKEN_NAME } from "../server";

  const useMutation = ({ url, method }) => {
    const [value, setValue] = useState({
      data: undefined,
      isLoading: false,
      error: undefined,
    });
    const mutation = async (data) => {
      try {
        const token = getLocalStorage({ name: TOKEN_NAME });
        setValue((prev) => ({ ...prev, isLoading: true }));
        const response = await (
          await fetch(`${BASE_URL}/${url}`, {
            method: method.toUpperCase(),
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token ? token : null}`,
            },
          })
        ).json();
        if (response.message) {
          setValue((prev) => ({ ...prev, error: response.message }));
        }
        setValue((prev) => ({ ...prev, data: response }));
      } catch (error) {
        setValue((prev) => ({ ...prev, error }));
      } finally {
        setValue((prev) => ({ ...prev, isLoading: false }));
      }
    };

    return [mutation, { ...value }];
  };
  export default useMutation;
  ```

    </details>
    <br />

    <details>
      <summary>useFetch</summary>

  - `GET`요청 시 코드의 복잡성과 재사용률을 높이기 위해 만들었습니다.
  - `useFetch` 훅은

    - `GET` 요청 시 전달 받는 `data`과 `loading`, `error`를 반환합니다.
      <br />

  ```javascript
  import { useEffect, useState } from "react";
  import { BASE_URL, getLocalStorage, TOKEN_NAME } from "../server";

  const useFetch = ({ url }) => {
    const [response, setResponse] = useState({
      data: undefined,
      isLoading: false,
      error: undefined,
    });

    const fetchTodoList = async (url) => {
      const token = getLocalStorage({ name: TOKEN_NAME });
      try {
        setResponse((prev) => ({ ...prev, isLoading: true }));
        const results = await (
          await fetch(`${BASE_URL}/${url}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token ? token : null}`,
            },
          })
        ).json();
        if (results) setResponse((prev) => ({ ...prev, data: results }));
      } catch (error) {
        setResponse((prev) => ({ ...prev, error }));
        return;
      } finally {
        setResponse((prev) => ({ ...prev, isLoading: false }));
      }
    };

    useEffect(() => {
      fetchTodoList(url);
    }, [url]);

    return {
      data: response.data,
      isLoading: response.isLoading,
      error: response.error,
    };
  };
  export default useFetch;
  ```

  </details>
  <br /><br />

> 기타 함수

  <details>
      <summary>(옵션) formatDateAndDay</summary>

- 투두리스트의 날짜를 표시하기 위해 함수를 만들었습니다.

  <br />

  ```javascript
  const weekday = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const formatDateAndDay = (dayAndDateString) => {
    const today = new Date(Date.now());
    const formattedDate = today.toLocaleDateString("ko", {
      day: "numeric",
      month: "long",
    });
    const formattedDay = weekday[today.getDay()];
    if (dayAndDateString === "date") return formattedDate;
    if (dayAndDateString === "day") return formattedDay;
  };

  export default formatDateAndDay;
  ```

  </details>
