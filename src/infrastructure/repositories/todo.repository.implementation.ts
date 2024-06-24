import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from '../../domain';
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodoRepositoryImplementation implements TodoRepository {
	constructor(private readonly todoDataSource: TodoDataSource) {}

	create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		return this.todoDataSource.create(createTodoDto);
	}
	getAll(): Promise<TodoEntity[]> {
		return this.todoDataSource.getAll();
	}
	findById(id: number): Promise<TodoEntity | undefined> {
		return this.todoDataSource.findById(id);
	}
	updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
		return this.todoDataSource.updateById(updateTodoDto);
	}
	deleteById(id: number): Promise<TodoEntity> {
		return this.todoDataSource.deleteById(id);
	}
}
