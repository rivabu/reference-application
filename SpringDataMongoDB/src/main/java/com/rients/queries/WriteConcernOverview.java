package com.rients.queries;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.WriteResult;

public class WriteConcernOverview {
    
    public static void main(String[] args) {
        
        TestData.countriesTestData();
        
        DB db = MongoDb.getWorldDb();
        db.setWriteConcern(WriteConcern.ACKNOWLEDGED);
        
        DBCollection countries = db.getCollection("countries");
        countries.setWriteConcern(WriteConcern.JOURNALED);

        countries.createIndex(new BasicDBObject("name", 1), new BasicDBObject("unique", true));

        //------------------------------------------------- Exception
        
        BasicDBObject anotherJapan = new BasicDBObject("name", "Japan")
                                                .append("area", 145925)
                                                .append("population", 126659683)
                                                .append("continent", new BasicDBObject("name", "Asia"));
        try {
            countries.insert(anotherJapan, WriteConcern.FSYNCED);
        } catch (MongoException e) {
            e.printStackTrace();
        }

        //------------------------------------------------- WriteResult
        
		WriteResult result = countries.insert(anotherJapan, WriteConcern.UNACKNOWLEDGED);
        
        System.out.println("Error from result: " + result.getError());
        System.out.println("Same error from DB: " + db.getLastError().getString("err"));
    }
}
