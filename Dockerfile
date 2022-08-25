FROM node:18-bullseye AS builder

WORKDIR /app

COPY . ./

RUN yarn install \
		&& yarn build

FROM node:18-bullseye-slim AS runner

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
	&& apt-get update && apt-get install --no-install-recommends -y tini \
	&& apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/library-scripts

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["yarn", "start"]
