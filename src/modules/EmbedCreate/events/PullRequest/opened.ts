import {EmbedBuilder, APIEmbedField} from 'discord.js';
import {PullRequestOpenedEvent} from '@octokit/webhooks-types';

import type {nameType} from '../../index.js';

// dayjs
import dayjs from 'dayjs';

import {COMMON_VALUES} from '../../constants.js';

export class PullRequestOpenedEventEmbedBuilder<T extends nameType> {
	constructor(
		embed: EmbedBuilder,
		_name: T extends 'pull_request' ? T : never,
		payload: PullRequestOpenedEvent,
	) {
		embed.setAuthor({
			name: payload.sender.login,
			iconURL: payload.sender.avatar_url ?
				payload.sender.avatar_url :
				COMMON_VALUES.embedAuthorIconUrl,
		});
		embed.setTitle(`[${payload.repository.full_name}] / 📦 A new Pull Request Opened`);
		embed.setDescription(payload.pull_request.title);
		embed.setURL(payload.pull_request.html_url);
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
