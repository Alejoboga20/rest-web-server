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
});
