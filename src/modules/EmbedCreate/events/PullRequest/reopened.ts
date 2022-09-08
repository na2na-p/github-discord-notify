import {EmbedBuilder, APIEmbedField} from 'discord.js';
import {PullRequestReopenedEvent} from '@octokit/webhooks-types';

import type {nameType} from '../../index.js';

// dayjs
import dayjs from 'dayjs';

import {COMMON_VALUES} from '../../constants.js';

export class PullRequestReopenedEventEmbedBuilder<T extends nameType> {
	constructor(
		embed: EmbedBuilder,
		_name: T extends 'pull_request' ? T : never,
		payload: PullRequestReopenedEvent,
	) {
		embed.setAuthor({
			name: payload.sender.login,
			iconURL: payload.sender.avatar_url ?
				payload.sender.avatar_url :
				COMMON_VALUES.embedAuthorIconUrl,
		});
		embed.setTitle(`[${payload.repository.full_name}]`);
		// Descriptionもリンクを埋め込む
		embed.setDescription(`[📦 A Pull Request Reopened](${payload.pull_request.html_url})`);
		embed.setURL(payload.repository.url);
		const fields: Array<APIEmbedField> = [];
		fields.push({
			name: '📝 Description',
			value: payload.pull_request.body ? payload.pull_request.body : 'No description',
		});
		fields.push({
			name: 'status',
			value: payload.pull_request.state,
		});
		embed.setFields(fields);
		embed.setFooter({
			text:
				`#${payload.pull_request.number} opened at ${dayjs(payload.pull_request.created_at).format('YYYY/MM/DD HH:mm:ss')}`,
		});
	}
}
