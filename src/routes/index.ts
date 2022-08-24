import {Controller, Get} from 'routing-controllers';

/**
 * ここにGithubのWebhookのあれこれが届く
 */
@Controller()
export class Index {
  @Get('/')
	public index(): string {
		return 'Hello World!';
	}
}
