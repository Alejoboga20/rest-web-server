import request from 'supertest';
import { testServer } from '../../test-server';

const app = testServer.app;

describe('Todo Tests', () => {
	beforeAll(async () => {
		await testServer.start();
	});

	afterAll(() => {
		testServer.close();
	});

	test('should return todos api/todos', async () => {
		const response = await request(app).get('/api/todos').expect(200);
		console.log(response.body);
	});
});
