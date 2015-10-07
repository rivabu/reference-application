package com.rients.queries;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

public class Aggregation {
    
    public static void main(String[] args) {
        
        TestData.countriesTestData();
        
        DB db = MongoDb.getWorldDb();
        DBCollection countries = db.getCollection("countries");
        
        //------------------------------------------------- count
        
        System.out.println("\nNumber of countries: " + countries.count());

        System.out.println("\nNumber of large countries: " + countries.count(new BasicDBObject("area", new BasicDBObject("$gt", 130000))));

        //------------------------------------------------- distinct

        System.out.println("\nContinents in use: " + countries.distinct("continent.name"));
        
        //------------------------------------------------- aggregation framework
        /*
         * db.countries.aggregate ( {$match: { 'continent.name' : { $in: ['Africa', 'Europe', 'Asia'] }}}, 
                {$project : {'continent.name' : 1, 'area' : 1, '_id' : 0}},
                {$group : {'_id' : '$continent.name', 'average' : { '$avg' : '$area'}}} );
        */
        
        List<String> continentList = Arrays.asList(new String[]{"Africa", "Europe", "Asia"});
        DBObject match = new BasicDBObject("$match", new BasicDBObject("continent.name", new BasicDBObject("$in", continentList)));

        DBObject projectFields = new BasicDBObject("continent.name", 1);
        projectFields.put("area", 1);
        projectFields.put("_id", 0);
        DBObject project = new BasicDBObject("$project", projectFields );

        DBObject groupFields = new BasicDBObject( "_id", "$continent.name");
        groupFields.put("average", new BasicDBObject( "$avg", "$area"));
        DBObject group = new BasicDBObject("$group", groupFields);

        @SuppressWarnings("deprecation")
		AggregationOutput output = countries.aggregate( match, project, group );
        
        System.out.println("\n" + output);
        
        Iterator<DBObject> iter = output.results().iterator();
        while (iter.hasNext()) {
        	System.out.println(iter.next());
        }
    }

}
