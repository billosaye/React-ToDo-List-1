import { useState } from "react";
import "./styles.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleInputChange(event) {
    setNewItem(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }

  // Move this function outside of handleSubmit
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={handleInputChange}
          type="text"
          id="item"
        />
        <button>Add</button>
      </form>

      <h1>TO-DO LIST</h1>
      <ul className="list">
        {todos.length === 0 && "No ToDos"} 
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;