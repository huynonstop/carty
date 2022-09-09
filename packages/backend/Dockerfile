FROM node:lts-alpine
ARG PORT

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
RUN yarn
COPY . .
RUN npx prisma migrate deploy
RUN yarn build

EXPOSE ${PORT}
CMD ["yarn","start:build"]