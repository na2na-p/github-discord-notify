import {config as dotenv} from 'dotenv';
dotenv();

import {createServer} from 'http';
import EventSource from 'eventsource';
import {Webhooks, createNodeMiddleware} from '@octokit/webhooks';

import {EmbedBuilder} from '@modules/embedCreate.js';
import {Post} from '@modules/post.js';

export class Server {
	private readonly port: number = (typeof process.env.PORT === 'number' ? parseInt(process.env.PORT) : 3000);
	private webhooks: Webhooks<unknown> = new Webhooks({secret: process.env.SECRET!});

	constructor() {
		this.webhooks.onAny(({id, name, payload}) => {
			// const hooksData = {id, name, payload} as EmitterWebhookEvent<typeof name>;
			console.log('id: ', id);
			const embed = new EmbedBuilder(id, name, payload);
			console.log(embed);
			new Post(embed);
		});

		if (process.env.NODE_ENV !== 'production') {
			const app = new EventSource(process.env.SMEE_PROXY_URL!);
			app.onmessage = (event: any) => {
				const webhookEvent = JSON.parse(event.data);
				this.webhooks
					.verifyAndReceive({
						id: webhookEvent['x-request-id'],
						name: webhookEvent['x-github-event'],
						signature: webhookEvent['x-hub-signature'],
						payload: webhookEvent.body,
					})
					.catch(console.error);
			};
		}
		createServer(createNodeMiddleware(this.webhooks)).listen(this.port);
	};
};

new Server();
