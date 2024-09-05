FROM node:21 AS base

FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV} 

WORKDIR /usr/src/app 

COPY package.json yarn.lock ./ 

RUN yarn install

COPY . .

RUN yarn prisma:generate

ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["yarn", "start"]
