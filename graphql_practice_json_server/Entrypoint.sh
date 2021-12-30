#!/bin/bash
echo "Starting GraphiQL"
nohup node server.js > /dev/stdout &
PID1=$!

echo "Starting json-server"
nohup npm run json:server > /dev/stdout &
PID2=$!

tail --pid=$PID1 -f /dev/null
echo "GraphiQL has stopped"
tail --pid=$PID2 -f /dev/null
echo "json-server has stopped"