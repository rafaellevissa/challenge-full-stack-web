FROM node:13.12

COPY . /app
WORKDIR /app
RUN npm install && npm run build
ENTRYPOINT npm run prod
ENV PORTDOCKER=84
EXPOSE 84

