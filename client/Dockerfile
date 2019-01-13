FROM node:11.2

RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm i --silent

CMD ["npm", "start"]