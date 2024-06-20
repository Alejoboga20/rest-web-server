import { Request, Response } from 'express';

export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		res.json([
			{ id: 1, name: 'Do laundry', completed: false },
			{ id: 2, name: 'Buy groceries', completed: false },
		]);
	};
}
