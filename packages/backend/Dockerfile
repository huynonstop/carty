FROM node:lts-alpine
ARG PORT 
ARG DATABASE_URL

RUN mkdir -p /app
WORKDIR /app

RUN export DATABASE_URL=${DATABASE_URL}

COPY package.json /app 
RUN yarn
COPY . .
RUN npx prisma generate
RUN yarn build

EXPOSE ${PORT}
CMD ["yarn","start:build"]