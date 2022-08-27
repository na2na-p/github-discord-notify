import {EmbedBuilder as eb} from 'discord.js';
import {match} from 'ts-pattern';

import {EmitterWebhookEvent, EmitterWebhookEventName} from '@octokit/webhooks';

export class EmbedBuilder<T extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(id: string, name: T, payload: any) {
		super();

		match(name)
			.with('push', () => {
				// TODO: Eliminate any
				const pl = payload as EmitterWebhookEvent<'push'> & {sender: any, commits: any[]};
				this.setAuthor({
					name: pl.sender.login,
					iconURL: pl.sender.avatar_url ?
						pl.sender.avatar_url :
						'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
				});
				this.setTitle(`🆕 Pushed by ${pl.sender.login} with ${pl.commits.length} commits`);
				this.setDescription(payload.head_commit.message);
				this.setURL(payload.compare_url);
				pl.commits.forEach((commit) => {
					// 先頭7文字
					this.addFields(commit.id.slice(0, 7), commit.message);
				});
			});

		console.log(name);
		if (name === 'check_run') {
			console.log(name);
		}
		// console.log(payload);

		// this.setTitle(payload);
		this.setColor(0xC239B3);
	}
}
