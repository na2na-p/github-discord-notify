import {EmbedBuilder as eb} from 'discord.js';
import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';

export class EmbedBuilder<T extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(_id: string, name: T, payload: any) {
		super();

		this.setColor(0xC239B3);

		console.log(name);
		this.setEmbed(name, payload);

		console.log(name);
		if (name === 'check_run') {
			console.log(name);
		}
		// console.log(payload);

		// this.setTitle(payload);
	}

	private setEmbed(name: EmitterWebhookEventName, payload: any) {
		match(name)
			.with('push', () => {
				console.log('push');
				this.setAuthor({
					name: payload.sender.login,
					iconURL: payload.sender.avatar_url ?
						payload.sender.avatar_url :
						'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
				});
				this.setTitle(`[${payload.repository.full_name}]`);
				this.setDescription(`🆕 Pushed by ${payload.sender.login} with ${payload.commits.length} commits`);
				this.setURL(payload.compare_url);
				payload.commits.forEach((commit: any) => {
					// 先頭7文字:
					this.addFields(commit.id.slice(0, 7), commit.message);
				});
			})
			.with('check_run', () => {
				console.log('check_run');
			});
		// .exhaustive();
	}
}
