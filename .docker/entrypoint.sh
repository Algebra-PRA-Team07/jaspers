#!/bin/sh

sh -c "cd ./backend && npm run start" &
# fuck it, live server
sh -c "cd ./frontend && npm live-server ./build" &

wait -n
exit $?
