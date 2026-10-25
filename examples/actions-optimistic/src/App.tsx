import { createTodo } from './todoApi';
import { TodoList } from './TodoList';

export const App = () => (
  <main>
    <h1>Todos</h1>
    <TodoList createTodo={createTodo} />
  </main>
);
