#!/bin/bash

echo "STARTING MAVEN BUILD... ==============================================================="
# Run Maven build on backend for deploying to local Tomcat

## without tests:
mvn clean package -Dmaven.test.skip=true

echo "STARTING TOMCAT... ===================================================================="
echo TOMCAT=$HOME/tools/apache-tomcat-7.0.64/
TOMCAT=E:/tools/apache-tomcat-7.0.64/
rm -rf E:/tools/apache-tomcat-7.0.64/webapps/person
$TOMCAT/bin/startup.sh

echo "DONE =================================================================================="
echo ""
echo "#######################################################################################"
echo ""
echo ""
echo "NOTE: To stop Tomcat execute the following command:"
echo "./stop_java_backend.sh"
echo ""
echo "NOTE: To test if the web service is running execute the following command:"
echo "./test_backend.sh"
echo ""
echo "Expected output:"
echo ""
echo "---------------------------------------------------------------------------------------"
echo -e "HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With
Access-Control-Allow-Headers: GET, PUT, OPTIONS, X-XSRF-TOKEN
Content-Type: application/json
Transfer-Encoding: chunked
Date: Tue, 03 Sep 2013 19:05:14 GMT

{\"id\":0,\"name\":\"JonFromREST\",\"country\":\"DoeFromREST\"}"
echo "---------------------------------------------------------------------------------------"
echo ""
echo "#######################################################################################"
echo ""
echo "END ==================================================================================="
