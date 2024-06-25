import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';
import { UpdateTodoDto } from '../../dtos';

export interface UpdateTodoUseCase {
	execute: (updateTodoDto: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		const updatedTodo = await this.todoRepository.updateById(updateTodoDto);
		return updatedTodo;
	}
}
