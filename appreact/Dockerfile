FROM node:alpine
ENV CHOKIDAR_USEPOLLING true

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]