import { readFileSync } from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
	console.log(req.url);

	// res.writeHead(200, { 'Content-Type': 'text/html' });
	// res.write(`<h1>Hello URL: ${req.url}</h1>`);
	// res.end();
	// const data = { name: 'John Doe', age: 25, city: 'New York' };
	// res.writeHead(200, { 'Content-Type': 'application/json' });
	// res.write(JSON.stringify(data));
	// res.end();
	if (req.url === '/') {
		const htmlFile = readFileSync('./public/index.html', 'utf-8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(htmlFile);
		res.end();
	}
});

server.listen(3000, () => console.log('server running on port 3000'));
