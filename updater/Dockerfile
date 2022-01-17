FROM node:16-alpine
LABEL app=arso-updater

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3333

CMD ["node", "index.js"]