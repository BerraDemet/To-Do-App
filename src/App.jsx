import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTodos([]); // Tüm görevleri temizle
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="main">
          <ul className="todo-list">
            {filteredTodos.map((todo, index) => (
              <li key={index} className={todo.completed ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />
                  <label>{todo.text}</label>
                  <button
                    className="destroy"
                    onClick={() => removeTodo(index)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.length}</strong> items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === "all" ? "selected" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={filter === "active" ? "selected" : ""}
                onClick={() => setFilter("active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={filter === "completed" ? "selected" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearAll}>
            Clear All
          </button>
        </footer>
      </section>
    </>
  );
}

export default App;
