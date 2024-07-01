import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

const app = testServer.app;

const testData = [{ text: 'Hello world 1' }, { text: 'Hello world 2' }];

describe('Todo Tests', () => {
	beforeAll(async () => {
		await testServer.start();
	});

	afterAll(() => {
		testServer.close();
	});

	test('should return todos api/todos', async () => {
		await prisma.todo.deleteMany();
		await prisma.todo.createMany({ data: testData });

		const { body } = await request(app).get('/api/todos').expect(200);

		expect(body.length).toBe(2);
		expect(body[0].text).toBe('Hello world 1');
		expect(body[1].text).toBe('Hello world 2');
	});

	test('should return a todo by id', async () => {
		await prisma.todo.deleteMany();

		const todo = await prisma.todo.create({ data: testData[0] });
		const todoId = todo.id;

		const { body } = await request(app).get(`/api/todos/${todoId}`).expect(200);

		expect(body.text).toBe(testData[0].text);
		expect(body.id).toBe(todoId);
	});
});
