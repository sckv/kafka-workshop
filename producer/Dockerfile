FROM node:16-alpine
LABEL app=arso-producer

USER node

COPY . .

RUN npm install

CMD ["node", "index.js"]