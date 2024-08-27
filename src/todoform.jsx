import { useState } from "react";

export function TodoForm(){
    const [newItem, setNewItem] = useState("")




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


      function handleInputChange(event) {
        setNewItem(event.target.value);
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
        </div>
    )
}