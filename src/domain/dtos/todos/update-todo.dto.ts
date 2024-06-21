export class UpdateTodoDto {
	private constructor(
		public readonly id: number,
		public readonly text?: string,
		public readonly completedAt?: Date
	) {}

	get values() {
		const returnObj: { [key: string]: any } = {};

		if (this.text) returnObj.text = this.text;
		if (this.completedAt) returnObj.completedAt = this.completedAt;

		return returnObj;
	}

	static udpate(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
		const { id, text, completedAt } = props;
		let newCompletedAt = completedAt ? new Date(completedAt) : undefined;

		if (!id || isNaN(id)) return ['id is required and must be a number'];

		if (completedAt && isNaN(Date.parse(completedAt))) return ['completedAt must be a valid date'];

		return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
	}
}
