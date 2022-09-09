FROM node:lts-alpine as build

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
RUN yarn
COPY . .
RUN yarn build

FROM build as development
EXPOSE 3000
CMD ["yarn","dev"]


FROM node:lts-alpine as production
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
RUN yarn
RUN npx prisma migrate deploy

COPY --from=build /app/dist ./dist
EXPOSE ${PORT}
CMD ["yarn","start:build"]