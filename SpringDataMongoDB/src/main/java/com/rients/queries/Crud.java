package com.rients.queries;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class Crud {

public static void main(String[] args) throws UnknownHostException {
    
    TestData.countriesTestData();

    //------------------------------------------------- set up
    
    DB db = MongoDb.getWorldDb();
    
    DBCollection countries = db.getCollection("countries");

    //------------------------------------------------- create
    
    BasicDBObject iceland = new BasicDBObject("name", "Iceland")
                                      .append("area", 39770)
                                      .append("population", 321857)
                                      .append("continent", new BasicDBObject("name", "Europe"));
    countries.insert(iceland);

    //------------------------------------------------- read
    
    DBObject firstCountry = countries.findOne();
    System.out.println("First country name: " + firstCountry.get("name"));
    
    BasicDBObject greeceQuery = new BasicDBObject("name", "Greece");
    DBObject greece = countries.findOne(greeceQuery);
    System.out.println("Area of Greece: " + greece.get("area"));
    
    BasicDBObject europeQuery = new BasicDBObject("continent.name", "Europe");
    DBCursor countryCursor = countries.find(europeQuery);
    System.out.println("Countries in Europe");
    try {
       while(countryCursor.hasNext()) {
           System.out.println("  " + countryCursor.next());
       }
    } finally {
       countryCursor.close();
    }
    
    //------------------------------------------------- update
    
    BasicDBObject georgiaQuery = new BasicDBObject("name", "Georgia");

    BasicDBObject georgiaUpdate = new BasicDBObject();
    georgiaUpdate.put("$set", new BasicDBObject("population", 4555911));

    countries.update(georgiaQuery, georgiaUpdate);
    
    System.out.println("Population of Georgia: " + countries.findOne(georgiaQuery).get("population"));
    
    //------------------------------------------------- delete
    
    BasicDBObject serbia = new BasicDBObject("name", "Serbia");
    countries.remove(serbia);
    
    System.out.println("Serbia exists: " + (countries.findOne(serbia) != null));
    
    BasicDBObject island = new BasicDBObject("name", "Iceland");
    System.out.println("Island exists: " + (countries.findOne(island) != null));
}

}