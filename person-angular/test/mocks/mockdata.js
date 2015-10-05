'use strict';
/* jshint quotmark: false, unused: false */
var MockData = {
    emailadres: {
        "message": "test@ing.nl",
        "partyId": "140932100"
    },
    emailerror: {
        "applicationId": "134",
        "errorId": "002",
        "httpStatusCode": 520,
        "timestamp": 1387488118533
    }

};

var gecalError = {
    "applicationId": "134",
    "errorId": "900",
    "httpStatusCode": 520,
    "timestamp": 1390000000000
};

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
            ]
        },
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
            ]
        },
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
            ]
        },
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
        },
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
                }
            ]
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
                    "creditcardNumber": "1234.****.****.0002",
                    "name": "PLATINUMCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "Naam met 26 kakakters erin",
                    "parentIndex": "0",
                    "cardIndex": "1"
                },
                {
                    "creditcardNumber": "1234.****.****.0001",
                    "name": "CREDITCARD",
                    "type": "SECONDARY",
                    "cardHolderName": "NaamMet26LettersAanElckaar",
                    "parentIndex": "1",
                    "creditcardIndex": "2"
                }
            ]
        },
        {
            "balance": "0.00",
            "accountNumber": "210010666340",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "1234.****.****.0003",
                    "name": "CREDITCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "Pieter Jansen",
                    "parentIndex": "0",
                    "creditcardIndex": "3"
                }
            ]
        }
    ]
};

var creditcardsThreeOneMain = {
    "allCards": [
        {
            "balance": "1.000,00",
            "accountNumber": "210019082135",
            "productName": "Creditcard",
            "creditCards": [
                {
                    "creditcardNumber": "1234.****.****.0001",
                    "name": "PLATINUMCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "Naam met 26 kakakters erin",
                    "parentIndex": "0",
                    "creditcardIndex": "1"
                },
                {
                    "creditcardNumber": "1234.****.****.0002",
                    "name": "CREDITCARD",
                    "type": "SECONDARY",
                    "cardHolderName": "NaamMet26LettersAanElckaar",
                    "parentIndex": "1",
                    "creditcardIndex": "2"
                },
                {
                    "creditcardNumber": "1234.****.****.0003",
                    "name": "PLATINUMCARD",
                    "type": "SECONDARY",
                    "cardHolderName": "Pieter Jansen",
                    "parentIndex": "1",
                    "creditcardIndex": "3"
                }
            ]
        }
    ]
};

var creditcardsJustOne = {
    "allCards": [
        {
            "balance": "-462.98",
            "accountNumber": "210018742135",
            "productName": "Platinumcard",
            "creditCards": [
                {
                    "creditcardNumber": "1234.****.****.9666",
                    "name": "PLATINUMCARD",
                    "type": "PRIMARY",
                    "cardHolderName": "Klaas Pietersen",
                    "parentIndex": "0",
                    "cardIndex": "1"
                }
            ]
        }
    ]
};

var creditcardsNone = {
    "allCards": []
};

var verificationOK = {
    "businessCode": "000",
    "returnCode": "OK",
    "serviceName": "VerifyCard",
    "status": "OK",
    "authorised": true,
    "successful": true
};

var verificationNOK = {
    "businessCode": "000",
    "returnCode": "OK",
    "serviceName": "VerifyCard",
    "status": "OK",
    "authorised": false,
    "successful": true
};

var verificationError = {
    "applicationId": "134",
    "errorId": "900",
    "httpStatusCode": 520,
    "timestamp": 1400000000000
};

var determineClosePositiveBalance = {
    "businessCode": "000",
    "returnCode": "OK",
    "serviceName": "DetermineClose",
    "status": "OK",
    "possiblyCharged": false,
    "positiveBalance": true,
    "successful": true
};

var determineCloseNegativeBalance = {
    "businessCode": "000",
    "returnCode": "OK",
    "serviceName": "DetermineClose",
    "status": "OK",
    "possiblyCharged": false,
    "positiveBalance": false,
    "successful": true
};

var determineClosePossiblyCharged = {
    "businessCode": "000",
    "returnCode": "OK",
    "serviceName": "DetermineClose",
    "status": "OK",
    "possiblyCharged": true,
    "positiveBalance": true,
    "successful": true
};

var determineCloseError = {
    "applicationId": "134",
    "errorId": "900",
    "httpStatusCode": 520,
    "timestamp": 1400000000000
};

var closeError = {
    "applicationId": "134",
    "errorId": "900",
    "httpStatusCode": "520",
    "timestamp": 1400000000000
};

var closeOK = {
    "returnCode": "OK",
    "serviceName": "CloseCard",
    "successful": true
};

var emailFromService = {
    "emailAddress": "testmail@ing.nl",
    "allowCommercialOffers": true
};

