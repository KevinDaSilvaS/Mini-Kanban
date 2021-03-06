FROM node:alpine

EXPOSE 1747

COPY ./ .
COPY ./.env ./src

RUN npm i

WORKDIR /src/

CMD node index.js