import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { server } = express() // You can also use Express
.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
	)
	.listen(PORT, err => {
		
		if (err) console.log('error', err);
	});
	
	const io = require('socket.io')(server);

	io.on('connection', (socket) => {
		socket.on('Message', function(msg){
			io.emit("Message", msg);
		});
	});

