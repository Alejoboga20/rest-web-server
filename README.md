# rest-web-server

## Description

This is a simple RESTful web server that can be used to create, read, update, and delete data from a JSON file. The server is built using Node.js and Express.js. The server is also capable of serving static files such as HTML, CSS, and JavaScript files.

## Installation

To use http2 you need to create keys with this command

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

Put the generated keys in `keys` folder.
