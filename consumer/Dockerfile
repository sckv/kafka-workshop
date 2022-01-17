FROM node:16-alpine
LABEL app=arso-consumer

WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "index.js"]