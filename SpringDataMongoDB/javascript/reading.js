//------------------------------------- findOne

// get the first document and print it as json
var continent = db.continents.findOne();
printjson(continent);

//------------------------------------- find

// convert the results to an array and return the 4th element
db.continents.find().toArray()[3];
db.continents.find()[3];

// display all documents from cursor
var continents = db.continents.find();
while ( continents.hasNext() ) printjson( continents.next() );

var ctryCursor = db.countries.find();
ctryCursor.forEach(printjson);

// a batch of 20 is returned if not assigned to variable
db.countries.find();

// get the next batch
it

// change the batch size
DBQuery.shellBatchSize = 10

//------------------------------------- queries

// return documents where area > 120000
db.countries.find( {area : {$gt : 120000} } );

//------------------------------------- skip & limit

// ignore the first 2 then return the next 3
db.continents.find().skip(2).limit(3);

//------------------------------------- sort

// 1 = ascending, -1 = descending
db.continents.find().sort( {name : -1} );

//------------------------------------- projection

// return the country name and the nested city name and population fields 
db.megacities.find( {}, {_id : 0, name : 1, 'cities.name' : 1, 'cities.population' : 1} );

// get first 2 elements in the nested array 
db.medals.find( {}, {_id : 0, name : 1, medals : { $slice : 2} } );

// return the first matching array value
db.medals.find( {medals : {$gt : 200}}, {_id : 0, name : 1, 'medals.$' : 1} );

/* Return countries which have at least one city with a growth rate of 2%.
 * All the cities for that country are returned. */ 
db.megacities.find( {'cities.growth' : 2}, {_id : 0, name : 1, cities : 1} );

/* Return countries which have at least one city with a growth rate of 2%.
 * Only those cities with growth rate of 2% are returned. */
db.megacities.find( {'cities.growth' : 2}, {_id : 0, name : 1, cities : {$elemMatch: { growth: 2 }}} )

//------------------------------------- combination

// query, projection, sort and limit
db.countries.find( {area : {$gt : 120000}}, {name : 1, population : 1, _id : 0} ).sort({population : -1}).limit(3);