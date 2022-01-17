FROM node:16-alpine
LABEL app=arso-consumer

USER node

COPY . .

RUN npm install

CMD ["node", "index.js"]