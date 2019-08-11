FROM node:10-alpine

WORKDIR /usr/src/index

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]