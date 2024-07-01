import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

const app = testServer.app;

const testData = [{ text: 'Hello world 1' }, { text: 'Hello world 2' }];

describe('Todo Tests', () => {
	beforeAll(async () => {
		await testServer.start();
	});

	beforeEach(async () => {
		await prisma.todo.deleteMany();
	});

	afterAll(() => {
		testServer.close();
	});

	test('should return todos api/todos', async () => {
		await prisma.todo.createMany({ data: testData });

		const { body } = await request(app).get('/api/todos').expect(200);

		expect(body.length).toBe(2);
		expect(body[0].text).toBe('Hello world 1');
		expect(body[1].text).toBe('Hello world 2');
	});

	test('should return a todo by id api/todos/:todoId', async () => {
		const todo = await prisma.todo.create({ data: testData[0] });

		const { body } = await request(app).get(`/api/todos/${todo.id}`).expect(200);

		expect(body).toEqual({ id: todo.id, text: todo.text });
	});

	test('should return 404 - not found api/todos/:todoId', async () => {
		const todoId = 0;
		const response = await request(app).get(`/api/todos/${todoId}`).expect(400);

		expect(response.body).toEqual({ error: `Error: Todo with id ${todoId} not found` });
	});

	test('should create a todo', async () => {
		const todo = { text: 'Hello world' };

		const { body } = await request(app).post('/api/todos').send(todo).expect(201);

		expect(body).toEqual({
			text: todo.text,
			id: expect.any(Number),
		});
	});

	test('should return an error if text is not provided', async () => {
		const todo = { text: '' };

		const { body } = await request(app).post('/api/todos').send(todo).expect(400);

		expect(body).toEqual({ error: 'text is required' });
	});
});
