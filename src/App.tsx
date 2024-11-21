import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { FileUploader } from '@aws-amplify/ui-react-storage'

import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  //const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }


  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
          onClick={() => deleteTodo(todo.id)} 
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      
  
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
  

    </main>
  );
}

export default App;
