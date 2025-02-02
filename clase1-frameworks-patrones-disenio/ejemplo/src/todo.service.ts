import Todo from './todo.model.js';

const todo = new Todo();

export default class TodoService {
    getTodos() {
        const todos = todo.all();
        return todos;
    }

    createTodo(title: string) {
        todo.create(title);
    }

    deleteTodo(id: string) {
        todo.delete(Number(id));
    }
}
