FROM node:16.14.0-alpine  as buildContainer


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install  ci --only=production

# Bundle app source
COPY ./dist ./dist

EXPOSE 80
CMD [ "node", "./dist/globex-ui/server/main.js" ]

