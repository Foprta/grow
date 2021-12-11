FROM node:16-alpine

RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf 

COPY . /app

WORKDIR /app

CMD npm ci --verbose && npm run start
