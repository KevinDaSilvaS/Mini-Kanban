FROM node:alpine

EXPOSE 5000

COPY . .

RUN npx insomnia-documenter --config kanban.json 

CMD npx serve