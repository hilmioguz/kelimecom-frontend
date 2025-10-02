FROM node:16.14.2-alpine

RUN mkdir -p /usr/src/frontend

# Create app directory
WORKDIR /usr/src/frontend

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000
CMD [ "yarn", "start" ]