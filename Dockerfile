FROM dykoffi/node:pm2-light as release

WORKDIR /App
RUN yarn install --prod
RUN yarn global add prisma@latest
COPY build ./

WORKDIR /App
RUN prisma generate

EXPOSE 80

CMD echo "DATABASE_URL=${DATABASE_URL}" > .env \
    && prisma migrate deploy \
    && NODE_ENV=production pm2-runtime index.js --name crystalAPI