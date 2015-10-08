package com.rients.queries.admin;

import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.rients.queries.MongoDb;
import com.rients.queries.testdata.TestData;

public class Admin {
    
	public static void main(String[] args) {
        
        TestData.countriesTestData();
        
        DB db = MongoDb.getWorldDb();

        //------------------------------------------------- show databases

        // not authorized to query the databases
//        System.out.println("databases");
//        for (String dbName : mongoClient.getDatabaseNames()) {
//           System.out.println("  " + dbName);
//        }

        //------------------------------------------------- create index
        
        DBCollection countries = db.getCollection("countries");
        
        // createIndex() Deprecated since version 1.8.
        countries.createIndex(new BasicDBObject("name", 1), new BasicDBObject("unique", true));
        
        //------------------------------------------------- show indexes

        List<DBObject> list = countries.getIndexInfo();

        System.out.println("\nindexes");
        for (DBObject index : list) {
           System.out.println("  " + index);
        }
        
    }

}