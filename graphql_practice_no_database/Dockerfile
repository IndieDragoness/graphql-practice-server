FROM node

COPY . /graphql_practice_no_database

WORKDIR /graphql_practice_no_database
RUN npm install --save express express-graphql graphql lodash

EXPOSE 4000

CMD ["node", "/graphql_practice_no_database/server.js"]