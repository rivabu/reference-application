/**
 * Created with IntelliJ IDEA.
 * User: av97aq
 * Date: 11/22/13
 * Time: 11:26 AM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var request = require('request');
var app = express();

var creditcardsAll = {
    "allCards": [
        {
            "balance": "1.000,00",
            "accountNumber": "210019082135",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "5248.****.****.7261",
                    "name": "CREDITCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "T J M VAN DEN BRINK",
                    "parentIndex": 0,
                    "cardIndex": 1
                }
            ]},
        {
            "balance": "1.997,00",
            "accountNumber": "210019082077",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "5248.****.****.7405",
                    "name": "CREDITCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "W C S JANSEN",
                    "parentIndex": 0,
                    "cardIndex": 2
                }
            ]},
        {
            "balance": "-1.312,14",
            "accountNumber": "210015709665",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "5248.****.****.3109",
                    "name": "CREDITCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "P LANDEGENT",
                    "parentIndex": 0,
                    "cardIndex": 3
                },
                {
                    "creditcardNumber": "5248.****.****.2901",
                    "name": "CREDITCARD",
                    "type": "SECONDARY",
                    "cardHolderName": "J C WIDJAJA",
                    "parentIndex": 3,
                    "cardIndex": 4
                }
            ]},
        {
            "balance": "-1.000,75",
            "accountNumber": "210015706943",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "5248.****.****.4521",
                    "name": "CREDITCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "IR N BONESCHANSCHER",
                    "parentIndex": 0,
                    "cardIndex": 5
                },
                {
                    "creditcardNumber": "5248.****.****.7366",
                    "name": "CREDITCARD",
                    "type": "SECONDARY",
                    "cardHolderName": "K E VAN WIJK",
                    "parentIndex": 5,
                    "cardIndex": 6
                }
            ]
        }
        ,
        {
            "balance": "2.000,00",
            "accountNumber": "210010954340",
            "productName": "Platinumcard",
            "creditCards": [
                {
                    "creditcardNumber": "5248.****.****.7335",
                    "name": "PLATINUMCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "M C LYNCH",
                    "parentIndex": 0,
                    "cardIndex": 7
                }]
        }
    ]
};

var creditcardsThree = {
 "allCards": [
     {
         "balance": "-341.65",
         "accountNumber": "210010954340",
         "productName": "Platinumcard",
         "creditCards": [
             {
                 "creditcardNumber": "1234********0002",
                 "name": "PLATINUMCARD",
                 "type": "PRIMARY",
                 "cardHolderName": "Naam met 26 kakakters erin",
                 "parentIndex": 0,
                 "cardIndex": "1"
             },
             {
                 "creditcardNumber": "1234********0001",
                 "name": "CREDITCARD",
                 "type": "SECONDARY",
                 "cardHolderName": "NaamMet26LettersAanElckaar",
                 "parentIndex": 1,
                 "creditcardIndex": "2"
             }]
     },
     {
         "balance": "0.00",
         "accountNumber": "210010666340",
         "productName": "Creditcard",
         "creditCards": [
             {
                 "creditcardNumber": "1234********0003",
                 "name": "CREDITCARD",
                 "type": "PRIMARY",
                 "cardHolderName": "Pieter Jansen",
                 "parentIndex": 0,
                 "creditcardIndex": "3"
             }]
    }
    ]};

 var creditcardsThreeOneMain = {
     "allCards": [
         {
             "balance": "1.000,00",
             "accountNumber": "210019082135",
             "productName": "Creditcard",
             "creditCards": [
                 {
                     "creditcardNumber": "1234********0002",
                     "name": "PLATINUMCARD",
                     "type": "PRIMARY",
                     "cardHolderName": "Naam met 26 kakakters erin",
                     "parentIndex": 0,
                     "cardIndex": "1"
                 },
                 {
                     "creditcardNumber": "1234********0001",
                     "name": "CREDITCARD",
                     "type": "SECONDARY",
                     "cardHolderName": "NaamMet26LettersAanElckaar",
                     "parentIndex": 1,
                     "cardIndex": "2"
                 },
                 {
                     "creditcardNumber": "1234********0003",
                     "name": "CREDITCARD",
                     "type": "SECONDARY",
                     "cardHolderName": "Pieter Jansen",
                     "parentIndex": 1,
                     "cardIndex": "3"
                 }]
         }]};

 var creditcardsJustOne = {
     "allCards": [
         {
             "balance": "-462.98",
             "accountNumber": "210018742135",
             "productName": "Platinumcard",
             "creditCards": [
                 {
                     "creditcardNumber": "1234********9666",
                     "name": "PLATINUMCARD",
                     "type": "PRIMARY",
                     "cardHolderName": "Klaas Pietersen",
                     "parentIndex": 0,
                     "cardIndex": "1"
                 }]
         }]};

 var creditcardsJustOneVerifyFalse = {
     "allCards": [
         {
             "balance": "-462.98",
             "accountNumber": "210018742135",
             "productName": "Platinumcard",
             "creditCards": [
                 {
                     "creditcardNumber": "1111********1111",
                     "name": "PLATINUMCARD",
                     "type": "PRIMARY",
                     "cardHolderName": "Klaas Pietersen",
                     "parentIndex": 0,
                     "cardIndex": "1"
                 }]
         }]};

var creditCardsNone = {
        "allCards": []};

var serverError = {"applicationId":"134","errorId":"900","httpStatusCode":520,"timestamp":1394449131955};

// simple logger
app.use(function (req, res, next) {
    next();
    console.log('%s | %s | %s', req.method, res.statusCode, req.url);
});

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/..'));
console.log('Serving static content from' + __dirname + '/..');

app.get('/app/p-manage-creditcards/retrieve/cards', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.id === '0' || req.query.id === undefined) {
        var delay = req.query.delayed || 1;
        delay = parseInt(req.query.id, 10) || delay;
        setTimeout(function () {
            res.send(creditcardsAll);
        }, delay);
    } else if (req.query.id === '1') {
        res.send(creditcardsJustOne);
     } else if (req.query.id === '2') {
        res.send(creditcardsThreeOneMain);
     } else if (req.query.id === '3') {
        res.send(creditcardsThree);
     } else if (req.query.id === '4') {
        res.send(creditCardsNone);
     } else if (req.query.id === '5') {
        res.send(serverError);
     } else if (req.query.id === '6') {
        res.send(creditcardsJustOneVerifyFalse);
     }
});

app.get('/particulier/manage-creditcards/retrieve/cards', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.id === '0' || req.query.id === undefined) {
        var delay = req.query.delayed || 1;
        delay = parseInt(req.query.id, 10) || delay;
        setTimeout(function () {
            res.send(creditcardsAll);
        }, delay);
    } else if (req.query.id === '1') {
        res.send(creditcardsJustOne);
    } else if (req.query.id === '2') {
        res.send(creditcardsThreeOneMain);
    } else if (req.query.id === '3') {
        res.send(creditcardsThree);
    } else if (req.query.id === '4') {
        res.send(creditCardsNone);
    } else if (req.query.id === '5') {
        res.send(serverError);
    } else if (req.query.id === '6') {
        res.send(creditcardsJustOneVerifyFalse);
    }
});


var verification = {"businessCode":"000", "returnCode":"OK", "serviceName":"VerifyCard", "status":"OK", "authorised":true, "successful":true};
var verificationFalse = {"businessCode":"000", "returnCode":"OK", "serviceName":"VerifyCard", "status":"OK", "authorised":false, "successful":true};

app.post('/app/p-manage-creditcards/verify/cards', function(req, res) {
    console.log(req.body.maskedCreditcardNumber);
    res.setHeader('Content-Type', 'application/json');
    if (req.body.maskedCreditcardNumber === '5248.****.****.7261') {
        res.send(verificationFalse);
    } else {
        res.send(verification);
    }
});

app.post('/particulier/manage-creditcards/verify/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(verification);
});

var determineClose = {"businessCode":"000","returnCode":"OK","serviceName":"DetermineClose","status":"OK","possiblyCharged":true,"positiveBalance":false,"successful":true};
app.post('/app/p-manage-creditcards/determineclose/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(determineClose);
});
app.post('/particulier/manage-creditcards/determineclose/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(determineClose);
});

app.get('/particulier/ik-en-ing/api/email', function (req, res) {
    var response = '';
    var newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
    console.log(req.query);
    switch (req.query.email) {
        case 'validationFailed':
            response = 'emailValidationFailed';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'notFound':
            response = 'emailNotFound';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'technicalError':
            response = 'emailTechnicalError';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'responseFailed':
            newurl = 'http://localhost:3000/stubs/data/contact/responseFailed.html';
            request(newurl).pipe(res);
            break;
        default:
            response = 'email';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            var delay = req.query.delayed || 1;
            delay = parseInt(req.query.email, 10) || delay;
            setTimeout(function () {
                request(newurl).pipe(res);
            }, delay);
            break;
    }
});

app.get('/app/gpersona/email', function (req, res) {
    var response = '';
    var newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
    console.log(req.query);
    switch (req.query.email) {
        case 'validationFailed':
            response = 'emailValidationFailed';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'notFound':
            response = 'emailNotFound';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'technicalError':
            response = 'emailTechnicalError';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'responseFailed':
            newurl = 'http://localhost:3000/stubs/data/contact/responseFailed.html';
            request(newurl).pipe(res);
            break;
        default:
            response = 'email';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            var delay = req.query.delayed || 1;
            delay = parseInt(req.query.email, 10) || delay;
            setTimeout(function () {
                request(newurl).pipe(res);
            }, delay);
            break;
    }
});

app.post('/particulier/ik-en-ing/api/email', function (req, res) {
    var response = '';
    var newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';

    switch (req.query.emailpost) {
        case 'validationFailed':
            response = 'emailValidationFailed';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'notFound':
            response = 'emailNotFound';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'technicalError':
            response = 'emailTechnicalError';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'responseFailed':
            newurl = 'http://localhost:3000/stubs/data/contact/responseFailed.html';
            request(newurl).pipe(res);
            break;
        default:
            var delay = req.query.delayed || 1;
            delay = parseInt(req.query.email, 10) || delay;
            var resObj = {"emailAddress": req.body.emailAddress};
            setTimeout(function () {
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(resObj));
                res.end();
            }, delay);
            break;
    }
});

app.get('/app/gepersona/email', function (req, res) {
    var response = '';
    var newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
    console.log(req.query);
    switch (req.query.email) {
        case 'validationFailed':
            response = 'emailValidationFailed';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'notFound':
            response = 'emailNotFound';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'technicalError':
            response = 'emailTechnicalError';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'responseFailed':
            newurl = 'http://localhost:3000/stubs/data/contact/responseFailed.html';
            request(newurl).pipe(res);
            break;
        default:
            response = 'email';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            var delay = req.query.delayed || 1;
            delay = parseInt(req.query.email, 10) || delay;
            setTimeout(function () {
                request(newurl).pipe(res);
            }, delay);
            break;
    }
});

app.post('/app/gpersona/email', function (req, res) {
    var response = '';
    var newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';

    switch (req.query.emailpost) {
        case 'validationFailed':
            response = 'emailValidationFailed';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'notFound':
            response = 'emailNotFound';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'technicalError':
            response = 'emailTechnicalError';
            newurl = 'http://localhost:3000/stubs/data/contact/' + response + '.json';
            request(newurl).pipe(res);
            break;
        case 'responseFailed':
            newurl = 'http://localhost:3000/stubs/data/contact/responseFailed.html';
            request(newurl).pipe(res);
            break;
        default:
            var delay = req.query.delayed || 1;
            delay = parseInt(req.query.email, 10) || delay;
            var resObj = {"emailAddress": req.body.emailAddress};
            setTimeout(function () {
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(resObj));
                res.end();
            }, delay);
            break;
    }
});

var closeCard = {"returnCode":"OK","serviceName":"CloseCard","successful":true};

app.post('/app/p-manage-creditcards/close/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(closeCard);
});

app.post('/particulier/manage-creditcards/close/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(closeCard);
});

app.listen(3000);
console.log('Listening on port 3000');