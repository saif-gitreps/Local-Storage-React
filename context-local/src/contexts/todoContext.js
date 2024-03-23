import { createContext, useContext } from "react";

export const TodoContext = createContext({
   todos: [
      {
         id: 1,
         todo: "Learn React",
         completed: false,
      },
   ],
   add: (todo) => {},
   deleteTodo: (id) => {},
   update: (id, todo) => {},
   toggle: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

export default function useTodo() {
   return useContext(TodoContext);
}
