import {EmbedBuilder as eb} from 'discord.js';

import {EmitterWebhookEventName} from '@octokit/webhooks';

export class EmbedBuilder<E extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(id: string, name: E, payload: any) {
		super();
		console.log(id);
		console.log(name, 'event received');
		console.log(payload);

		this.setTitle('Some Title');
		this.setColor(0xC239B3);
	}
}
