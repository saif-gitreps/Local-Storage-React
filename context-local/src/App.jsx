import "./App.css";
import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";

function App() {
   const [todos, setTodos] = useState([]);

   // the totoProvider value expects an object of all the values and methods.
   const providerProps = {
      todos,
      add: (todo) => {
         // when you adda new value to the state, the entire state is replaced with the new value.
         // so to retain the old todos, we make a callback which returns all the old todos and then add the new todo.
         // now if youare confused then see it this way:
         // [{1} , {2}]. <- our old todo array, now to change this state and add a new value
         // we do this [{1},  {2} , {3} ]. its like sending {1,2,3} as a whole value to a c++ array.
         // remember the setState function is asynchronous and does not update the state immediately.
         // so if you want to use the updated state immediately after updating it, then use the callback function. in the callback, the old todos are passed in as a parameter.
         setTodos((oldTodos) => [...oldTodos, { id: Date.now(), ...todo }]);
      },
      delete: (id) => {
         // we will use filter because filter returns a new array with the filtered values.
         setTodos((oldTodos) => oldTodos.filter((item) => item.id !== id));
      },
      update: (id, todo) => {
         // we will use map because map returns a new array with the updated values.
         // this whole process is creating a new array, it is going through
         // all the todos and checking if id matches, if no, then for the new array set the prev value for that unmatched todo.
         // else set the new value for that id.
         setTodos((oldTodos) => oldTodos.map((item) => (item.id === id ? todo : item)));
      },
      toggle: (id) => {
         setTodos((oldTodos) =>
            oldTodos.map((item) =>
               // haha got this right, so with spread we will keep the default data
               // just invert the completed props
               item.id === id ? { ...item, completed: !item.completed } : item
            )
         );
      },
   };

   // when the page reloads we need to get all the todos from the local storage.
   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("allTodos"));

      if (todos && todos.length) {
         setTodos(todos);
      }
   }, []);

   // when the todos change, we need to update the local storage.
   useEffect(() => {
      localStorage.setItem("allTodos", JSON.stringify(todos));
   }, [todos]);

   return (
      <TodoProvider value={providerProps}>
         <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
               <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                  Manage Your Todos
               </h1>
               <div className="mb-4">{/* Todo form goes here */}</div>
               <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
               </div>
            </div>
         </div>
      </TodoProvider>
   );
}

export default App;
