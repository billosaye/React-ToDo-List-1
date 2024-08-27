import { useState } from "react";
import "./styles.css";

function App() {
    const [newInput, setNewInput] = useState("")
    const [todos, setTodos] = useState([])
    
    function handleInputChange(e) {        
        setNewInput(e.target.value); // Takes the event 'e' from the input field and updates the state 'newInput' with the current value of the input field.
    }
    
    function handleSubmit(e) {        
        e.preventDefault(); // Prevents the default action of form submission, which usually involves refreshing the page.  
        
        if (newInput.trim() !== "") {  // Check if the input is not empty or just spaces
            setTodos(prevTodos => [
                ...prevTodos,  // Spread the existing todos into a new array
                { 
                    id: Date.now(),  // Generate a unique ID for the new todo item
                    text: newInput,  // Set the text of the new todo item to the input value
                    completed: false  // Initialize the 'completed' status as false
                }
            ]);
            setNewInput("");  // Clear the input field after adding the new todo item
        }
        
    }

// This function toggles the 'completed' status of a todo item
function togleTodo(id, completed) {
  setTodos(prevTodos => 
      prevTodos.map(todo => 
          todo.id === id ? { ...todo, completed } : todo
      )
  );
}
// Breakdown of togleTodo:
// 1. It takes 'id' and 'completed' as parameters
// 2. It uses setTodos to update the state
// 3. It maps over the previous todos:
//    - If the todo's id matches the given id, it creates a new object
//      with all properties of the original todo, but updates the 'completed' status
//    - If the id doesn't match, it returns the todo unchanged
// This updates the specific todo while leaving others unchanged


  // This function removes a todo item from the list
  function deleteTodo(id){
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id)
    })
  }
  // Breakdown of deleteTodo:
  // 1. It takes 'id' as a parameter
  // 2. It uses setTodos to update the state
  // 3. It filters the previous todos:
  //    - It keeps only the todos whose id does not match the given id
  // This effectively creates a new array without the todo to be deleted




    
  return (
    <div>
      <h1>TO-DO LIST</h1>

    
      <form onSubmit={handleSubmit}>  
        <label htmlFor="item">New Item</label>
        <input type="text" onChange={handleInputChange} id="item" value={newInput} />
        <button>Add</button>
      </form>
      <ul className="list">
        {todos.length === 0 && "Enter Todos"}

        {todos.map(function(todo) {
          return (
          <li key={todo.id}>
            <label>
            <input type="checkbox" 
            checked = {todo.completed}
            onChange={e => togleTodo(todo.id, e.target.checked)}
            />
            {todo.text}
          </label>
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>      

          </li>
        )
        } )}

       
      </ul>
    </div>
  );
}

export default App;