FROM node:carbon AS sydney
WORKDIR /usr/projects/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
USER node
