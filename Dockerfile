FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json /app/


RUN yarn

COPY . /app

ENV PORT=5000

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 80

CMD [ "yarn", "run", "start" ]