import express from 'express';
import {useExpressServer} from 'routing-controllers';

export class Server {
	private readonly app: express.Application = express();
	private readonly port: number = (typeof process.env.PORT === 'number' ? parseInt(process.env.PORT) : 3000);

	constructor(middleware: Function[] | string[], routes: Function[] | string[]) {
		// TODO: ルーティング追加
		useExpressServer(this.app, {
			controllers: routes,
			middlewares: middleware,
		});

		// 起動
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	};
};
