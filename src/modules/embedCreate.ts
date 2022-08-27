import {EmbedBuilder as eb} from 'discord.js';
// import {match} from 'ts-pattern';

import {EmitterWebhookEventName} from '@octokit/webhooks';

export class EmbedBuilder<T extends EmitterWebhookEventName> extends eb {
	// TODO: payloadの型定義見直し
	constructor(id: string, name: T, payload: any) {
		super();
		this.setAuthor({
			name: 'GitHub',
			iconURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
		});
		console.log(id);
		console.log(name, 'event received');
		if (name === 'check_run') {
			console.log(name);
		}
		console.log(payload);

		// this.setTitle(payload);
		this.setColor(0xC239B3);
	}
}
