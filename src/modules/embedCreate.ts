/* eslint-disable max-len */
import {EmbedBuilder as eb} from 'discord.js';
import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';


export class EmbedBuilder<T extends keyof WebhookEventMap> extends eb {
	// TODO: payloadの型定義見直し
	// WebhookEventMap[T]とする。
	private _id: string;
	private name: T;
	private payload: WebhookEventMap[T];
	constructor(id: string, name: T, payload: WebhookEventMap[T]) {
		super();

		this._id = id;
		this.name = name;
		this.payload = payload;
		this.setEmbed();
	}

	private setEmbed() {
		this.setColor(0xC239B3);
		match(this.name)
			.with('push', () => {
				console.log('match with push');
				// console.log('push');
				// console.log(this.name);
				const payload = this.payload as WebhookEventMap['push'];
				this.setAuthor({
					name: payload.sender.login,
					iconURL: payload.sender.avatar_url ?
						payload.sender.avatar_url :
						'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
				});
				this.setTitle(`[${payload.repository.full_name}]`);
				this.setDescription(`🆕 Pushed by ${payload.sender.login} with ${payload.commits.length} commits`);
				this.setURL(payload.compare);
				payload.commits.forEach((commit: any) => {
					// 先頭7文字:
					this.addFields(commit.id.slice(0, 7), commit.message);
				});
			})
			.with('check_run', () => {
				console.log('check_run');
			})
			.with('debobi', () => { // Error Expected

			});
		// .exhaustive();
	}
}
