import {EmbedBuilder as eb} from 'discord.js';

// import {EmitterWebhookEventName} from '@octokit/webhooks';
import type {WebhookEventName} from '@octokit/webhooks-types';

// やりたい
// EventPayloadMapに含まれるプロパティのうち、キー名がEの値になっている型を取得したい

export class EmbedBuilder<E extends WebhookEventName> extends eb {
	// TODO: Eliminate any
	constructor(id: string, name: E, payload: any) {
		super();
		console.log(id);
		console.log(name, 'event received');
		console.log(payload);

		if (name === 'push') {
			this.setTitle('Push event');
			console.log(name);
			console.log(payload);
		}

		this.setAuthor({
			name: payload.sender.login,
			iconURL: payload.sender.avatar_url ? payload.sender.avatar_url : payload.sender.gravatar_url,
		});
		this.setTitle('Some Title');
		this.setColor(0xC239B3);
	}
}
