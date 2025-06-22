#!/bin/sh

sh -c "cd ./backend && PORT=8080 npm run start" &
# fuck it, live server
sh -c "nginx" &

wait -n
exit $?
