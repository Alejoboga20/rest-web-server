import { prisma } from '../../data/postgres';
import {
	CreateTodoDto,
	CustomError,
	TodoDataSource,
	TodoEntity,
	UpdateTodoDto,
} from '../../domain';

export class TodoDataSourceImplementation implements TodoDataSource {
	async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		const todo = await prisma.todo.create({ data: createTodoDto });

		return TodoEntity.fromObject(todo);
	}

	async getAll(): Promise<TodoEntity[]> {
		const todos = await prisma.todo.findMany();
		const todoEntities = todos.map((todo) => TodoEntity.fromObject(todo));

		return todoEntities;
	}

	async findById(id: number): Promise<TodoEntity> {
		const todo = await prisma.todo.findFirst({ where: { id } });

		if (!todo) {
			throw new CustomError(`Todo with id ${id} not found`, 404);
		}

		return TodoEntity.fromObject(todo);
	}

	async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		await this.findById(updateTodoDto.id);

		const updatedTodo = await prisma.todo.update({
			where: { id: updateTodoDto.id },
			data: updateTodoDto.values,
		});

		return TodoEntity.fromObject(updatedTodo);
	}

	async deleteById(id: number): Promise<TodoEntity> {
		await this.findById(id);
		const deletedTodo = await prisma.todo.delete({ where: { id } });

		return TodoEntity.fromObject(deletedTodo);
	}
}
