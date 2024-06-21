export class CreateTodoDto {
	private constructor(public readonly text: string) {}

	static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
		const { text } = props;

		if (!text) return ['text is required'];
		if (text instanceof String && text.length < 1)
			return ['text must be at least 1 character long'];

		return [undefined, new CreateTodoDto(text)];
	}
}
