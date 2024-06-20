import { Request, Response } from 'express';

const todos = [
	{ id: 1, name: 'Do laundry', completed: false, createdAt: new Date() },
	{ id: 2, name: 'Buy groceries', completed: true, createdAt: new Date() },
	{ id: 3, name: 'Clean bathroom', completed: false, createdAt: new Date() },
];

export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		res.json(todos);
	};

	public getTodoById = (req: Request, res: Response) => {
		const todoId = parseInt(req.params.id);
		if (isNaN(todoId)) return res.status(400).json({ message: 'Invalid ID supplied' });

		const todo = todos.find((todo) => todo.id === todoId);
		todo ? res.json(todo) : res.status(404).json({ message: 'Todo not found' });
	};

	public createTodo = (req: Request, res: Response) => {
		const { name } = req.body;

		if (!name) return res.status(400).json({ message: 'Name is required' });

		const newTodo = {
			name: name,
			id: todos.length + 1,
			completed: false,
			createdAt: new Date(),
		};

		todos.push(newTodo);

		return res.status(201).json({ message: 'Todo created', newTodo });
	};
}
