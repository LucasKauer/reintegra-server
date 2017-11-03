FROM node:6.11.5

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
