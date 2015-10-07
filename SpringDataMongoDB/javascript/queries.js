
db.countries.findOne( {area : 26900} );

//----------------------------------------------- not equal to

db.countries.find( {area : {$ne : 26900}} );

//----------------------------------------------- less than

db.countries.find( {area : {$lt : 50000}} );

//----------------------------------------------- between

db.countries.find( {area : {$gte : 10000, $lte : 80000}} );

//----------------------------------------------- and

db.countries.find( {population : {$gt : 10000000}, area : {$lt : 100000}} );

//----------------------------------------------- or

db.countries.find( {$or : [
                            {population : {$gt : 10000000}}, 
                            {area : {$lt : 100000}}
                          ]
                    } );

//----------------------------------------------- and / or

db.countries.find( {$or : [
                           {population : {$gt : 22000000}}, 
                           {area : {$gt : 10000, $lt : 30000}}
                          ]
                    });


db.countries.find( {'continent.name' : 'Europe', 
                        $or : [
                               {population : {$gt : 10000000}}, 
                               {area : {$gt : 10000, $lt : 30000}}
                              ]
                   });

//----------------------------------------------- in list

db.countries.find( {name : {$in : ['Ghana','Gambia','Gabon']}} );

//----------------------------------------------- regular expression

db.countries.find( {name : {$regex : 'G[ae].*'}} );

//----------------------------------------------- subdocument

db.countries.find( {'continent.name' : 'Europe'} );

//----------------------------------------------- array

db.megacities.find( {cities : {name : 'Buenos Aires', population : 14300000, growth : 1 }} );

db.megacities.find( {'cities.growth' : 2} );

db.megacities.find( {'cities.0.growth' : 2} );

/* Returns a document if any city has a growth of 2
 * and any city population is greater than 23000000.
 * These can be different elements in the array.
 */ 
db.megacities.find( {'cities.growth' : 2, 'cities.population' : {$gt : 23000000}} );