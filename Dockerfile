FROM node:alpine

EXPOSE 1747

COPY ./ .
COPY ./.env ./src

RUN npm i --prod

WORKDIR /src/

CMD node index.js