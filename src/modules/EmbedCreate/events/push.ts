import {EmbedBuilder, APIEmbedField} from 'discord.js';
import {EmitterWebhookEventName} from '@octokit/webhooks';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';

export class pushEventEmbedBuilder<T extends EmitterWebhookEventName> {
	constructor(
		embed: EmbedBuilder,
		name: T extends 'push' ? T : never,
		payload: T extends 'push' ? WebhookEventMap[T] : never,
	) {
		embed.setAuthor({
			name: payload.sender.login,
			iconURL: payload.sender.avatar_url ?
				payload.sender.avatar_url :
				'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
		});
		embed.setTitle(`[${payload.repository.full_name}]`);
		embed.setDescription(`🆕 Pushed by ${payload.sender.login} with ${payload.commits.length} commits`);
		embed.setURL(payload.compare);
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
		embed.addFields(fields);

		embed.setFooter({
			text: `📅 ${payload.repository.updated_at}`,
		});
	}
}