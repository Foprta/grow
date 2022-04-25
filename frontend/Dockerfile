FROM node:16-alpine

RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf 

COPY package.json /app/package.json

COPY . /app

WORKDIR /app

CMD npm i --verbose && npm run start -- --host
