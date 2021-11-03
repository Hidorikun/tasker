FROM node:latest

RUN mkdir -p /usr/src/tasker-web

WORKDIR /usr/src/tasker-web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
