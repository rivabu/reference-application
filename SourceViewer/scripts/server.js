
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var app = express();
var apiServer = 'http://127.0.0.1:8081';

var tree = { "tree" : [    { id : 1212, type: 'root', name: 'Rients Test' }, 
 				{ id : 37980, type: 'dir', name: 'notes', status: 'open' },
 				{ id : 37981, type: 'node', ext: 'js', name: 'data.js' },
 				{ id : 37981, type: 'node', ext: 'txt', name: 'file.txt' },
 				{ id : 37981, type: 'node', ext: 'rd', name: 'readme.rd' },
 				{ id : 37982, type: 'node', ext: 'png', name: 'sports-snippet.png' },
 				{ id : 37983, type: 'node', ext: 'png', name: 'sports-v1.0.png' },
 				{ id : 37990, type: 'dir', name: 'notes', status: 'open' },
 				{ id : 37981, type: 'node', ext: 'js', name: 'data2.js' },
 				{ type: 'enddir' },
 				{ id : 37970, type: 'dir', name: 'notes', status: 'open' },
 				{ id : 37971, type: 'node', ext: 'js', name: 'data2.js' },
 				{ type: 'enddir' },
 				{ type: 'enddir' },
  					{ id : 37984, type: 'node', ext: 'xml', name: 'pom.xml' },
  					{ id : 37984, type: 'node', ext: 'rd', name: 'readme.rd' },
 				{ type: 'endroot' }
 			]};
//var treeSmall = { "tree" : [    { id : 1212, type: 'root', name: 'Rients Test2' },
//             					{ id : 37984, type: 'node', ext: 'xml', name: 'pom.xml' },
//             					{ id : 37984, type: 'node', ext: 'rd', name: 'readme.rd' },
//            				{ type: 'endroot' }
//            			]};

var treeSmall = {
		   "id": "1",
		   "elements":    [
		            {
		         "id": 1212,
		         "type": "root",
		         "name": "Rients Test3"
		      },
		            {
		         "id": 1212,
		         "type": "node",
		         "extension": "xml",
		         "name": "pom.xml",
		         "fileId": "dfksfldfg"
		      },
		            {
		         "id": 1212,
		         "type": "node",
		         "extension": "rd",
		         "name": "readme.rd",
		         "fileId": "5yjjyojyoi"
		      },
		            {
		         "id": 1212,
		         "type": "endroot"
		      }
		   ]
		};

var projecten = [{"id":1,"name":"Project 1","description":"My first project"}];
// simple logger
app.use(function(req, res, next){
    next();
    console.log('%s | %s | %s', req.method, res.statusCode, req.url);
});

app.use(express.json());
//app.use(express.urlencoded());

app.use(express.static(__dirname + '/..'));
console.log('Serving static content from' + __dirname + '/..');



//app.get('/api/sourcetree', function (req, res) {
//    res.setHeader('Content-Type', 'application/json');
//    console.log('id = ' + req.query.id);
//    if (req.query.id === '0' || req.query.id === undefined) {
//        var delay = req.query.delayed || 1;
//        delay = parseInt(req.query.id, 10) || delay;
//        setTimeout(function () {
//            res.send(tree);
//        }, delay);
//    } else if (req.query.id === '1') {
//        res.send(tree);
//    } else if (req.query.id === '2') {
//        res.send(treeSmall);
//    } 
//});

//get tree by id
app.get('/api/sourcetree/:id', function(req, res) {
    var newurl = apiServer + '/sourceviewer-rest/tree/'+req.params.id;
  	request(newurl).pipe(res)
});

//get all projects
app.get('/project/list', function(req, res) {
    var newurl = apiServer + '/sourceviewer-rest/project/list';
  	request(newurl).pipe(res)
//	res.send(projecten);
});


//get user by id
app.get('/person/user/:id', function(req, res) {
    var newurl = apiServer + '/person/user/'+req.params.id;
  	request(newurl).pipe(res)
});

// add user
app.post('/person/user', function(req, res) {
    forwardPostPutDelete(req, res, 'POST', '/person/user');

});
// update user
app.put('/person/user', function(req, res) {
    forwardPostPutDelete(req, res, 'PUT', '/person/user');

});

// delete user
app.delete('/person/user/:id', function(req, res) {
    forwardPostPutDelete(req, res, 'DELETE', '/person/user/'+req.params.id);

});


function forwardPostPutDelete(req, res, method, path) {
	var data = JSON.stringify(req.body);
    var options = {
        host: '127.0.0.1',
        port: 8081,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    var request = http.request(options, function(response) {
		console.log(response.statusCode);
        response.setEncoding('utf8');
        var responseString = '';

        response.on('data', function (chunk) {
			
            responseString += chunk;
        });
        response.on('end', function(){
            res.writeHead(response.statusCode, {'Content-Type':'application/json'});
            res.end(responseString);
			console.log(responseString);
        });
		

    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    request.write(data);
    request.end();
}


app.listen(3000);
console.log('Listening on port 3000');