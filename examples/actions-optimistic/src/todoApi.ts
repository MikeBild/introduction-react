export type Todo = { id: string; title: string; isPending?: boolean };
export type CreateTodo = (title: string) => Promise<Todo>;

// Fake server: slow, and it refuses titles containing "fail".
export const createTodo: CreateTodo = (title) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        title.includes('fail')
          ? reject(new Error(`Could not save "${title}"`))
          : resolve({ id: crypto.randomUUID(), title }),
      1000
    )
  );
