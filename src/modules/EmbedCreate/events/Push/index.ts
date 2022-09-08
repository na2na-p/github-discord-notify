import {EmbedBuilder, APIEmbedField} from 'discord.js';
import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';

import type {nameType} from '../../index.js';

// dayjs
import * as dayjs from 'dayjs';

import {COMMON_VALUES} from '../../constants.js';

export class pushEventEmbedBuilder<T extends nameType> {
	constructor(
		embed: EmbedBuilder,
		_name: T extends 'push' ? T : never,
		payload: T extends 'push' ? WebhookEventMap[T] : never,
	) {
		// console.log(name);
		embed.setAuthor({
			name: payload.sender.login,
			iconURL: payload.sender.avatar_url ?
				payload.sender.avatar_url :
				COMMON_VALUES.embedAuthorIconUrl,
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

		try {
			embed.setFooter({
				text: `📅 ${dayjs.default(payload.head_commit?.timestamp).format('YYYY/MM/DD HH:mm')}`,
			});
		} catch {}
	}
}