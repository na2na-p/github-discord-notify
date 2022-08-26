import {EmbedBuilder as eb} from 'discord.js';

import {EmitterWebhookEventName, EmitterWebhookEvent} from '@octokit/webhooks';

export class EmbedBuilder<T extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(hooksData: EmitterWebhookEvent<T>) {
		super();
		console.log(hooksData.id);
		console.log(hooksData.name);
		console.log(hooksData.payload);

		this.setTitle('Some Title');
		this.setColor(0xC239B3);
	}
}
