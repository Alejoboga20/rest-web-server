import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos';

export class TodosController {
	constructor() {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await prisma.todo.findMany();

		return res.json(todos);
	};

	public getTodoById = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		const todo = await prisma.todo.findUnique({ where: { id: todoId } });

		if (!todo) return res.status(404).json({ message: 'Todo not found' });

		return res.json(todo);
	};

	public createTodo = async (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) return res.status(400).json({ error });

		const todo = await prisma.todo.create({
			data: createTodoDto!,
		});

		return res.status(201).json({ message: 'Todo created', todo });
	};

	public updateTodo = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		const { text, completedAt } = req.body;

		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		const todo = await prisma.todo.findUnique({ where: { id: todoId } });

		if (!todo) return res.status(404).json({ message: 'Todo not found' });

		const updatedTodo = await prisma.todo.update({
			where: { id: todoId },
			data: { text, completedAt: completedAt ? new Date(completedAt) : null },
		});

		return res.json({ message: 'Todo updated', todo: updatedTodo });
	};

	public deleteTodo = async (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		const todo = await prisma.todo.findUnique({ where: { id: todoId } });
		if (!todo) return res.status(404).json({ message: 'Todo not found' });

		const deleted = await prisma.todo.delete({ where: { id: todoId } });

		return res.json({ message: 'Todo deleted', todo: deleted });
	};
}
