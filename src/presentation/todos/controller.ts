import { Request, Response } from 'express';

import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from '../../domain';

export class TodosController {
	constructor(private readonly todoRepository: TodoRepository) {}

	private handleError = (res: Response, error: unknown) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ error: `${error.message}` });
		}

		console.log({ error });
		return res.status(500).json({ error: 'Internal server error' });
	};

	public getTodos = (_: Request, res: Response) => {
		new GetTodos(this.todoRepository)
			.execute()
			.then((todos) => res.json(todos))
			.catch((error) => this.handleError(res, error));
	};

	public getTodoById = (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);

		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		new GetTodo(this.todoRepository)
			.execute(todoId)
			.then((todo) => res.json(todo))
			.catch((error) => this.handleError(res, error));
	};

	public createTodo = (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) return res.status(400).json({ error });

		new CreateTodo(this.todoRepository)
			.execute(createTodoDto!)
			.then((todo) => res.status(201).json(todo))
			.catch((error) => this.handleError(res, error));
	};

	public updateTodo = (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);

		const [error, updateTodoDto] = UpdateTodoDto.udpate({
			...req.body,
			id: todoId,
		});

		if (error) return res.status(400).json({ error });

		new UpdateTodo(this.todoRepository)
			.execute(updateTodoDto!)
			.then((todo) => res.json(todo))
			.catch((error) => this.handleError(res, error));
	};

	public deleteTodo = (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		new DeleteTodo(this.todoRepository)
			.execute(todoId)
			.then((deletedTodo) => res.json(deletedTodo))
			.catch((error) => this.handleError(res, error));
	};
}
