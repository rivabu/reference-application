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

handige urls voor lokaal ontwikkelen (server_without_server.js gebruiken)
------------------------------------

1 card: 127.0.0.1:3000/app/index.html?id=1

1 card + 2 subs: 127.0.0.1:3000/app/index.html?id=2

3 cards: 127.0.0.1:3000/app/index.html?id=3

7 cards: 127.0.0.1:3000/app/index.html?id=0

no cards: 127.0.0.1:3000/app/index.html?id=4

server error: 127.0.0.1:3000/app/index.html?id=5

geen hoofdkaart houder: 127.0.0.1:3000/app/index.html?id=6


websphere tests
-------------------------------------
retrieve cards json: 127.0.0.1:8081/app/p-manage-creditcards/retrieve/cards

verify card: 127.0.0.1:8081/app/p-manage-creditcards/verify/cards

