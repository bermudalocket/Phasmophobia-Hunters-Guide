FROM node:12-alpine

WORKDIR /urs/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
