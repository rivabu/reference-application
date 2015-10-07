//------------------------------------- insert

db.continents.insert( {_id : 1, name : 'Africa'} );

db.countries.save( {name : 'Panama', area : 75517, population : 3661868, continent : {name : 'Asia'}} );

var egypt = {name : 'Egypt', area : 387048, population : 84550000, continent : {name : 'Africa'}};
db.countries.update({name : 'Egypt'}, 
                    egypt, 
                    {upsert : true});

//------------------------------------- update

// get a document, change it, save it
var panama = db.countries.findOne( {name : 'Panama'} );
panama.continent = {name : 'South America'} 
db.countries.save(panama);

//update a document by setting a property
db.countries.update( {name : 'New Zealand'}, 
                     {$set : {area : 104464 }} );

// increment a value in multiple documents
db.countries.update( {'continent.name' : 'Europe'}, 
                     {$inc : {population : 10000}}, 
                     {mutli : true} );

// rename and remove field
db.countries.update( {}, 
                     {$rename : {population : 'pop'}, $unset : {area : ''}}, 
                     {multi : true} );

// only set field when inserting
db.countries.update( {name : 'Thailand'}, 
                     {$setOnInsert : {insertedAt : new Date()}}, 
                     {upsert : true} );

//------------------------------------- remove

// remove one
db.countries.remove( {name : 'Greece'} );

// remove several
db.countries.remove( {pop : {$gt : 3000000, $lt : 30000000}} );

// remove the first one that matches
db.countries.remove( {'continent.name' : 'Asia'}, 1 );