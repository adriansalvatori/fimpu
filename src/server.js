import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from 'http';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { server } = polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
	
	const io = require('socket.io')(server);


	/**
	 * Determinamos una suerte de Estado que irá recolectando información pertinente
	 */

	const state = {
		users:{}, 
		polls:{}, 
		quizes:{}
	} 

	

	io.on('connection', (socket) => {

		/** Eventos de medición del usuario */

		socket.on('new-user', user => {
			state.users[socket.id] = user
			socket.broadcast.emit('user-connected', user)
			console.log(state.users)
		})

		socket.on('disconnect', () => {
			socket.broadcast.emit('user-disconnected', state.users[socket.id])
			delete state.users[socket.id]
			console.log(state.users)
		})


		/**
		 * Evento de Ayuda
		 */

		socket.on('ayuda', (user) => {
			socket.broadcast.emit('ayuda', user)
			console.log(state.users[socket.id])
		})

		/** 
		 * Eventos de Mensajes 
		 * */

		socket.on('message', (res) => {
			socket.broadcast.emit('message', res)
		})

		socket.on('message-approved', (res) => {
			socket.broadcast.emit('message-approved', res)
		})

		/** 
		 * Evento de Preguntas 
		 * */
		socket.on('question', (res) => {
			socket.broadcast.emit('question', res)
		})

		/**
		 *  Evento de Streamline 
		 * */
		socket.on('streamline', (res) => {
			socket.broadcast.emit('streamline', res)
		})

		socket.on('streamline-traducido', (res) => {
			socket.broadcast.emit('streamline-traducido', res)
		})

		/**
		 *  Evento de Opciones de Cambio de Sala
		 * */
		socket.on('room-change', (res) => {
			socket.broadcast.emit('room-change', res)
		})

		/**
		 *  Evento de Opciones de Encuesta
		 * */
		socket.on('poll', (res) => {
			state.polls[res.title] = res
			socket.broadcast.emit('poll-running', state.polls[res.title])
			console.log(res)
		})
		socket.on('poll-vote', (res) => {
			state.polls[res.title].data[res.index]++ 
			socket.emit('poll-update-chart', state.polls[res.title])
			socket.broadcast.emit('poll-update-chart', state.polls[res.title])
		})
		socket.on('stop-poll', (room) => {
			socket.emit('stop-poll', room)
			socket.broadcast.emit('stop-poll', room)
		})
	})