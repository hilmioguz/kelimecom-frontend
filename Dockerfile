FROM node:20-alpine

RUN mkdir -p /usr/src/frontend

# Create app directory
WORKDIR /usr/src/frontend

COPY package.json yarn.lock ./

RUN corepack enable

RUN yarn install --frozen-lockfile || yarn install

COPY . .

EXPOSE 5000
CMD [ "yarn", "start" ]