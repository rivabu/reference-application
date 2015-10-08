package com.rients.queries;

import java.util.Set;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.rients.queries.testdata.TestData;

public class Collections {

    public static void main(String[] args) throws Exception {
        
        TestData.countriesTestData();
        
        DB db = MongoDb.getWorldDb();
        
        //------------------------------------------------- list of collections
        
        Set<String> colls = db.getCollectionNames();
        
        System.out.println("\ncollections");
        for (String s : colls) {
            System.out.println(" " + s);
        }
        
        //------------------------------------------------- get collection
        
        DBCollection countries = db.getCollection("countries");
        
        System.out.println("\nnumber of countries: " + countries.count());

        //------------------------------------------------- first document
        
        DBObject country = countries.findOne();
        
        System.out.println("\nfirst document\n  " + country);
        
        //------------------------------------------------- all documents
        
        System.out.println("\nall documents");

        DBCursor countryCursor = countries.find();
        try {
           while(countryCursor.hasNext()) {
               System.out.println("  " + countryCursor.next());
           }
        } finally {
           countryCursor.close();
        }
        
        //------------------------------------------------- count

        System.out.println("\nnumber of countries:  " + countries.count());
        
        //------------------------------------------------- DBObject
        
        DBCollection continents = db.getCollection("continents");
        continents.setObjectClass(ContinentMap.class);
        
        continents.insert(new ContinentMap(10, "Another Continent"));
        
        ContinentMap another = (ContinentMap) continents.findOne(new BasicDBObject("_id", 10));
        
        System.out.println(another);
    }

}