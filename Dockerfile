FROM node:alpine

EXPOSE 1747

COPY ./ .

RUN npm i --prod

WORKDIR /src/

CMD node index.js