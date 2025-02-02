import { Router } from 'express';
import TodoService from './todo.service.js';

const todoService = new TodoService();
const router = Router();

router.get('/', (_, res) => {
    const todos = todoService.getTodos();
    res.json(todos);
});

router.post('/', (req, res) => {
    todoService.createTodo(req.body.title);
    res.send('Created');
});

router.delete('/:id', (req, res) => {
    todoService.deleteTodo(req.params.id);
    res.send('Deleted');
});

export default router;
