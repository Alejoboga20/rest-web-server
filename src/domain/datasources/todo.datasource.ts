import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../dtos';

export abstract class TodoDataSource {
	abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
	abstract getAll(): Promise<TodoEntity[]>;
	abstract findById(id: number): Promise<TodoEntity | undefined>;
	abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract deleteById(id: number): Promise<TodoEntity>;
}
