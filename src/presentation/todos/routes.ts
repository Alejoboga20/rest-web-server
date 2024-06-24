import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImplementation } from '../../infrastructure/datasource/todo.datasource.implementation';
import { TodoRepositoryImplementation } from '../../infrastructure/repositories/todo.repository.implementation';

export class TodosRoutes {
	static get routes(): Router {
		const router = Router();

		const dataSource = new TodoDataSourceImplementation();
		const todoRepository = new TodoRepositoryImplementation(dataSource);
		const todosController = new TodosController(todoRepository);

		router.get('/', todosController.getTodos);
		router.get('/:id', todosController.getTodoById);
		router.post('/', todosController.createTodo);
		router.put('/:id', todosController.updateTodo);
		router.delete('/:id', todosController.deleteTodo);

		return router;
	}
}
