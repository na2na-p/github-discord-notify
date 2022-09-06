/* eslint-disable max-len */
import {EmbedBuilder as eb, APIEmbedField} from 'discord.js';
// import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';
import {pushEventEmbedBuilder} from './events/push.js';

type nameType = EmitterWebhookEventName & keyof WebhookEventMap;

export class EmbedBuilder<T extends nameType> {
	// TODO: payloadの型定義見直し
	// WebhookEventMap[T]とする。
	private _id: string;
	private name: T;
	private payload: WebhookEventMap[T];
	public embed = new eb();
	constructor(id: string, name: T, payload: WebhookEventMap[T]) {
		this._id = id;
		this.name = name;
		this.payload = payload;
		this.setEmbed();
	}

	private setEmbed() {
		this.embed.setColor(0xC239B3);
		switch (this.name) {
		case 'push':
			console.log(this.name);
			console.log('match with push');
			const pushEvent = new pushEventEmbedBuilder(this.embed, this.name as 'push', this.payload as WebhookEventMap['push']);
			// console.log('push');
			// console.log(this.name);
			break;
		default:
			this.embed.setDescription('some event happened');
			break;
		}
		console.log(`still not match with ${this.name}`);
	}
}
