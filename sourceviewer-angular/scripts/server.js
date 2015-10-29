
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var app = express();
var port = 8081;
var host = '127.0.0.1';
var apiServer = 'http://' + host + ':' + port;


// simple logger
app.use(function(req, res, next){
    next();
    console.log('%s | %s | %s', req.method, res.statusCode, req.url);
});

app.use(express.json());

app.use(express.static(__dirname + '/..'));
console.log('Serving static content from' + __dirname + '/..');



//get tree by id
app.get('/tree/:id', function(req, res) {
    var newurl = apiServer + '/tree/'+req.params.id;
  	request(newurl).pipe(res)
});

//get file by id
app.get('/file/:id', function(req, res) {
    var newurl = apiServer + '/file/'+req.params.id;
  	request(newurl).pipe(res)
});

//get all projects
app.get('/project/list', function(req, res) {
    var newurl = apiServer + '/project/list';
  	request(newurl).pipe(res)
//	res.send(projecten);
});
//delete project
app.delete('/project/:id', function(req, res) {
    forwardPostPutDelete(req, res, 'DELETE', '/project/'+req.params.id);
});
//put project
app.put('/project', function(req, res) {
    forwardPostPutDelete(req, res, 'PUT', '/project');
});


function forwardPostPutDelete(req, res, method, path) {
	var data = JSON.stringify(req.body);
    var options = {
        host: host,
        port: port,
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


app.listen(3001);
console.log('Listening on port 3001');