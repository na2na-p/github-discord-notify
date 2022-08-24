import express from 'express';
import logger from 'morgan';
import {config as dotenv} from 'dotenv';

import {Server} from './server.js';

// ルーティングを配列の形で列挙
import {Index} from '@routes/index.js';
dotenv();

// ミドルウェアを配列の形で列挙
const middleware: Function[] | string[] = [
	logger('dev'),
	express.json(),
	express.urlencoded({extended: false}),
];
const routes: Function[] | string[] = [
	Index,
];

new Server(middleware, routes);
