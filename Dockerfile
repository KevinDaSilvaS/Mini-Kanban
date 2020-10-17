FROM node:alpine

EXPOSE 1747

COPY ./ .

RUN npm i

WORKDIR /src/

CMD node index.js