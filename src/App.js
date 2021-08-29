import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // both useEffects are used for refreshing page and not losing data
  useEffect(() => {
    const temp = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(temp)

    if(loadedTodos){
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const tempJson = JSON.stringify(todos)
    localStorage.setItem('todos', tempJson)
  }, [todos])

  function addTodo(e) {
    e.preventDefault();

    const newTodo = {
      //miliseconds from 1970 till now, it means it will always be UNIQUE
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  // CHECKBOX completed property
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text} </div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />

          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>Submit Edits</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
