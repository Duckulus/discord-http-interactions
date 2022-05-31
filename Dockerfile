FROM node:16.13.1

WORKDIR /app/

COPY . .

RUN yarn

CMD ["yarn", "build:start"]