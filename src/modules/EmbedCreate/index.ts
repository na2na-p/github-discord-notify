/* eslint-disable max-len */
import {EmbedBuilder as eb} from 'discord.js';
// import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';
import {
	PullRequestEvent,
	PullRequestOpenedEvent,
	PullRequestReopenedEvent,
	PullRequestClosedEvent,
} from '@octokit/webhooks-types';

import {pushEventEmbedBuilder} from './events/Push/index.js';
import {
	PullRequestOpenedEventEmbedBuilder,
	PullRequestReopenedEventEmbedBuilder,
} from './events/PullRequest/index.js';
import {PullRequestClosedEventEmbedBuilder} from './events/PullRequest/closed.js';

export type nameType = EmitterWebhookEventName & keyof WebhookEventMap;

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
			new pushEventEmbedBuilder(this.embed, this.name as 'push', this.payload as WebhookEventMap['push']);
			break;
		case 'pull_request':
			console.log('pull_request');
			console.log(this.payload);
			switch ((this.payload as PullRequestEvent).action) {
			case 'opened':
				new PullRequestOpenedEventEmbedBuilder(this.embed, this.name as 'pull_request', this.payload as PullRequestOpenedEvent);
				break;
			case 'reopened':
				new PullRequestReopenedEventEmbedBuilder(this.embed, this.name as 'pull_request', this.payload as PullRequestReopenedEvent);
				break;
			case 'closed':
				new PullRequestClosedEventEmbedBuilder(this.embed, this.name as 'pull_request', this.payload as PullRequestClosedEvent);
				break;
			default:
				this.embed.setDescription('some event happened');
				break;
			}
			break;
		default:
			this.embed.setDescription('some event happened');
			break;
		}
		console.log(`still not match with ${this.name}`);
	}
}
