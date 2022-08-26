import {EmbedBuilder as eb} from 'discord.js';

import {EmitterWebhookEventName, EmitterWebhookEvent} from '@octokit/webhooks';

export class EmbedBuilder<T extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(id: string, name: T, payload: any) {
		super();
		console.log(id);
		console.log(name, 'event received');
		if (name === 'check_run') {
			console.log(name);
		}
		console.log(payload.id);

		this.setTitle('Some Title');
		this.setColor(0xC239B3);
	}
}
