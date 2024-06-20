import express from 'express';
import path from 'path';

interface Options {
	port: number;
	publicPath?: string;
}

export class Server {
	private app = express();

	private readonly port: number;
	private readonly publicPath: string;

	constructor(options: Options) {
		const { port, publicPath = 'public' } = options;

		this.port = port;
		this.publicPath = publicPath;
	}

	async start() {
		// Middlewares
		this.app.use(express.static(this.publicPath));

		// Routes
		this.app.get('/api/todos', (req, res) => {
			res.json([
				{ id: 1, text: 'Buy milk', done: false, createdAt: new Date() },
				{ id: 2, text: 'Buy bread', done: true, createdAt: new Date() },
				{ id: 3, text: 'Buy meat', done: false, createdAt: new Date() },
			]);
		});

		// Spa router
		this.app.get('*', (req, res) => {
			const indexPath = path.join(__dirname, '..', '..', this.publicPath, 'index.html');
			res.sendFile(indexPath);
			return;
		});

		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}
