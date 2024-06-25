import { TodoEntity } from '../../entities/todo.entity';
import { CreateTodoDto } from '../../dtos/todos/create-todo.dto';
import { TodoRepository } from '../../repositories/todo.repository';

export interface CreateTodoUseCase {
	execute: (createTodoDto: CreateTodoDto) => Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		const todo = await this.todoRepository.create(createTodoDto);
		return todo;
	}
}
