import {WebhookEventMap} from '@octokit/webhooks-types/schema.js';
// import {EmitterWebhookEventName} from '@octokit/webhooks';
export type payload<T extends keyof WebhookEventMap> = WebhookEventMap[T];
