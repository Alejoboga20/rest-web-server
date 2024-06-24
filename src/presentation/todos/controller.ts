import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosController {
	constructor(private readonly todoRepository: TodoRepository) {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await this.todoRepository.getAll();

		return res.json(todos);
	};

	public getTodoById = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);

		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		try {
			const todo = await this.todoRepository.findById(todoId);
			return res.json(todo);
		} catch (error) {
			res.status(400).json({ error });
		}
	};

	public createTodo = async (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) return res.status(400).json({ error });

		const todo = await this.todoRepository.create(createTodoDto!);

		return res.status(201).json({ message: 'Todo created', todo });
	};

	public updateTodo = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);

		const [error, updateTodoDto] = UpdateTodoDto.udpate({
			...req.body,
			id: todoId,
		});

		if (error) return res.status(400).json({ error });

		try {
			const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
			return res.json({ message: 'Todo updated', todo: updatedTodo });
		} catch (error) {
			return res.status(400).json({ error });
		}
	};

	public deleteTodo = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		try {
			const deleted = await this.todoRepository.deleteById(todoId);
			return res.json({ message: 'Todo deleted', todo: deleted });
		} catch (error) {
			return res.status(400).json({ error });
		}
	};
}
