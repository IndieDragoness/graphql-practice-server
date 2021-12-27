FROM node

COPY . /graphiql

WORKDIR /graphiql
RUN npm install --save express express-graphql graphql lodash

EXPOSE 4000

CMD ["node", "/graphiql/users/server.js"]