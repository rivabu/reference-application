starten node js server (ook watch + jslint):
- grunt
- url: http://localhost:3000/app/index.html

verkeer wordt geproxy-ed naar localhost:8081 (zie server.js)

dit is een tomcat server, deze moet dus ook draaien




installeren packages
--------------------
npm install (vanuit root)

starten server
--------------
node scripts/server.js of

node scripts/server_without_server.js

als je de java-server wil stubben

url: http://localhost:3000/app/


uitvoeren unitests
------------------
cd scripts
unit-test.bat


uitvoeren alle tests (unit, e2e, coverage)
--------------------
grunt test


uitvoeren e2e test 
------------------
node scripts/web-server.js

open ander cmd-window
cd scripts
e2e-test.bat


uitvoeren jslint
----------------
grunt jslint


aanroepen services in locale websphere omgeving
-----------------------------------------------
pas scripts/server.js aan met het juiste poortnummer




