#! /bin/sh
# PID=`ps -eaf | grep sonos-http-api | grep -v grep | awk '{print $2}'`
# if [[ "" !=  "$PID" ]]; then
#   echo "killing $PID"
#   kill -9 $PID
# fi

set -e

NODE_ENV=production node ./index.js
