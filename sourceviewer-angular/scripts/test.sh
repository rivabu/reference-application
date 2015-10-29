#!/bin/bash

BASE_DIR=`dirname $0`

if [ -r $BASE_DIR/../coverage ];then
	rm -fr $BASE_DIR/../coverage
fi

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/../config/karma.conf.js $*
