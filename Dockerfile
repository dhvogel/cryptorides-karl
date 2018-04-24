FROM node:8.11.1-alpine

MAINTAINER Daniel Vogel

COPY . .

CMD ["npm", "start"]
