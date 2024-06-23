import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';

export class TodoDataSourceImplementation implements TodoDataSource {
	async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		throw new Error('Method not implemented.');
	}

	async getAll(): Promise<TodoEntity[]> {
		const todos = await prisma.todo.findMany();
		const todoEntities = todos.map((todo) => TodoEntity.fromObject(todo));

		return todoEntities;
	}

	findById(id: number): Promise<TodoEntity | undefined> {
		throw new Error('Method not implemented.');
	}
	updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
		throw new Error('Method not implemented.');
	}
	deleteById(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
