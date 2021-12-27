FROM node

COPY . /graphql_practice_json_server

WORKDIR /graphql_practice_json_server
RUN npm install --save express express-graphql graphql lodash

EXPOSE 4000

CMD ["node", "/graphql_practice_json_server/server.js"]