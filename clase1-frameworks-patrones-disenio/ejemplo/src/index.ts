import express from 'express';
import todosRouter from './todo.controller.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use('/todos', todosRouter);

app.listen(port, () => {
    console.log('Running on port ' + port);
});
