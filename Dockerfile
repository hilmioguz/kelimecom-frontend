FROM node:20-alpine

RUN mkdir -p /usr/src/frontend

# Create app directory
WORKDIR /usr/src/frontend

COPY package.json package-lock.json ./

# Use npm ci to avoid yarn.lock parse issues
RUN npm ci --no-audit --no-fund

COPY . .

EXPOSE 5000
CMD [ "yarn", "start" ]