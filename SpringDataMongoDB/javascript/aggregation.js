//------------------------------------- count

db.countries.find().count();

db.countries.find( {area : {$gt : 130000}}).count();


//------------------------------------- distinct

db.countries.distinct( 'continent.name' );


//------------------------------------------------- aggregation framework

db.countries.aggregate ( {$match: { 'continent.name' : { $in: ['Africa', 'Europe', 'Asia'] }}}, 
                         {$project : {'continent.name' : 1, 'area' : 1, '_id' : 0}},
                         {$group : {'_id' : '$continent.name', 'average' : { '$avg' : '$area'}}} );