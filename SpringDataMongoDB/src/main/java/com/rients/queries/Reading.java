package com.rients.queries;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class Reading {
    
    public static void main(String[] args) {
        
        TestData.countriesTestData();
        
        DB db = MongoDb.getWorldDb();
        DBCollection countries = db.getCollection("countries");
        
        //------------------------------------------------- find one
        
        DBObject firstCountry = countries.findOne();
        System.out.println("first: " + firstCountry.get("name"));
        
        BasicDBObject greeceQuery = new BasicDBObject("name", "Greece");
        DBObject greece = countries.findOne(greeceQuery);
        System.out.println("Area of Greece: " + greece.get("area"));
        
        //------------------------------------------------- find
        
        DBCursor countryCursor = countries.find();
        
        displayDocumentsFromCursor(countryCursor);
        
        //------------------------------------------------- query
        
        BasicDBObject lessThanQuery = new BasicDBObject("area",  new BasicDBObject("$lt", 50000));
        DBCursor lessThanCursor = countries.find(lessThanQuery);

        displayDocumentsFromCursor(lessThanCursor);

        //------------------------------------------------- projection (include)
        
        BasicDBObject projectionQuery = new BasicDBObject("population", new BasicDBObject("$gt", 10000000));
        
        BasicDBObject includeKeys = new BasicDBObject();
        includeKeys.append("name", 1);
        includeKeys.append("area", 1);
        
        DBCursor includeCursor = countries.find(projectionQuery, includeKeys);
        
        displayDocumentsFromCursor(includeCursor);
        
        //------------------------------------------------- projection (exclude)
        
        BasicDBObject excludeContinent = new BasicDBObject();
        excludeContinent.append("continent", 0);
        
        DBCursor excludeCursor = countries.find(projectionQuery, excludeContinent);
        
        displayDocumentsFromCursor(excludeCursor);
        
        //------------------------------------------------- projection (exclude _id)
        
        BasicDBObject includeNameExcludeId = new BasicDBObject();
        includeNameExcludeId.append("_id", 0);
        includeNameExcludeId.append("name", 1);
        includeNameExcludeId.append("population", 1);
        
        DBCursor includeExcludeCursor = countries.find(projectionQuery, includeNameExcludeId);
        
        displayDocumentsFromCursor(includeExcludeCursor);

        //------------------------------------------------- skip & limit
        
        DBCursor offsetLimitCursor = countries.find().skip(3).limit(4);
        
        displayDocumentsFromCursor(offsetLimitCursor);
        
        //------------------------------------------------- sort
        
        BasicDBObject sortByDescendingArea = new BasicDBObject("area", -1);
        DBCursor sortCursor = countries.find().sort(sortByDescendingArea).limit(3);
        
        displayDocumentsFromCursor(sortCursor);
    
        //------------------------------------------------- to array

        List<DBObject> countryList = countries.find().skip(5).limit(3).toArray();
        
        System.out.println("\nfrom array");
        for (DBObject country : countryList) {
            System.out.println("  " + country);
        }
    
        //------------------------------------------------- timestamp from _id

        BasicDBObject doc = (BasicDBObject) countryList.get(0);
        ObjectId objectId = doc.getObjectId("_id");
        
        long millis = objectId.getTime();
        System.out.println("\n'" + doc.get("name") + "' created on " + new Date(millis));
    
    }

    //------------------------------------------------- display results

    private static void displayDocumentsFromCursor(DBCursor countryCursor) {
        System.out.println("\n" + countryCursor);
        try {
            while(countryCursor.hasNext()) {
                System.out.println("  " + countryCursor.next());
            }
        } finally {
            countryCursor.close();
        }
    }

}
