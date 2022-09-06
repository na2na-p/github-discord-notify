/* eslint-disable max-len */
import {EmbedBuilder as eb, APIEmbedField} from 'discord.js';
// import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';

type nameType = EmitterWebhookEventName & keyof WebhookEventMap;

export class EmbedBuilder<T extends nameType> extends eb {
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
		switch (this.name) {
		case 'push':
			console.log(this.name);
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
			const fields: Array<APIEmbedField> = (() => {
				// fieldsの最大値は25
				const max = 25;
				const commits = payload.commits;
				const fields: Array<APIEmbedField> = [];
				[...Array(Math.min(commits.length, max))].forEach((_, i) => {
					const commit = commits[i];
					if (commit) {
						// iが4以上のときは3つ目に"and more {} commits"を追加
						if (i === max - 1 && commits.length > 4) {
							fields.push({
								name: 'And more',
								value: `${commits.length - i} commits`,
								inline: false,
							});
							// foreachループから抜ける
							return;
						} else {
							fields.push({
								name: commit.message,
								value: `[\`${commit.id.slice(0, 7)}\`](${commit.url})`,
							});
						}
					}
				});
				return fields;
			})();
			this.addFields(fields);

			this.setFooter({
				text: `📅 ${payload.repository.updated_at}`,
				iconURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
			});
			break;
		default:
			this.setDescription('some event happened');
			break;
		}
		console.log(`still not match with ${this.name}`);
	}
}
