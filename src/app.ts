import http from 'http';

const server = http.createServer((req, res) => {
	console.log(req.url);

	res.write('Hello World');
	res.end();
});

server.listen(3000, () => console.log('server running on port 3000'));
