FROM node

COPY . /graphql_practice_json_server

WORKDIR /graphql_practice_json_server
RUN npm install --save express express-graphql graphql lodash json-server

EXPOSE 4000 3000

RUN chmod +x "./Entrypoint.sh"
CMD ["./Entrypoint.sh"]