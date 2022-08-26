import {EmbedBuilder, WebhookClient} from 'discord.js';

import {config as dotenv} from 'dotenv';
dotenv();

const id = process.env.DISCORD_WEBHOOK_URL!.split('/').at(-2) as string;
const token = process.env.DISCORD_WEBHOOK_URL!.split('/').at(-1) as string;

const webhookClient = new WebhookClient({id, token});

const embed = new EmbedBuilder()
	.setTitle('Some Title')
	.setColor(0xC239B3);

webhookClient.send({
	content: 'Webhook test',
	username: process.env.DISCORD_BOTNAME ? process.env.DISCORD_BOTNAME : 'Github',
	avatarURL: process.env.DISCORD_AVATAR_URL ?
		process.env.DISCORD_AVATAR_URL : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
	embeds: [embed],
});
