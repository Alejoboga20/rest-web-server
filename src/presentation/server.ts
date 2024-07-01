import express, { Router } from 'express';
import path from 'path';

interface Options {
	port: number;
	publicPath?: string;
	routes: Router;
}

export class Server {
	public readonly app = express();

	private serverListener?: any;

	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: Options) {
		const { routes, port, publicPath = 'public' } = options;

		this.routes = routes;
		this.port = port;
		this.publicPath = publicPath;
	}

	async start() {
		// Middlewares
		this.app.use(express.json()); // handle json requests
		this.app.use(express.urlencoded({ extended: true })); // handle form data
		this.app.use(express.static(this.publicPath));

		// Routes
		this.app.use(this.routes);
		// Spa router
		this.app.get('*', (req, res) => {
			const indexPath = path.join(__dirname, '..', '..', this.publicPath, 'index.html');
			res.sendFile(indexPath);
			return;
		});

		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}

	public close() {
		this.serverListener?.close();
	}
}
